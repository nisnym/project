from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from accounts.api.v1.serializers import (
    RegisterSerializer, 
    OTPVerifySerializer, 
    LoginSerializer,
    ResendOTPSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    LogoutSerializer,
    GoogleAuthSerializer,
    FacebookAuthSerializer
)
from accounts.models import User, OTP, AuthProvider
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.api.v1.utils import generate_unique_username, mask_email, mask_phone
from accounts.api.v1.services.otp_services import send_otp
from accounts.api.v1.services.google_oauth import verify_google_token
from accounts.api.v1.services.facebook_oauth import verify_facebook_token
from .services.validate_identifier import (
    parse_identifier_for_registration,
    parse_identifier_for_login
)

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        identifier_type = serializer._identifier_type
        identifier_value = serializer._identifier_value

        # CASE: User already active
        if user.is_active:
            return Response(
                {
                    "message": "Account already exists. Please log in."
                },
                status=status.HTTP_200_OK,
            )

        # CASE: User inactive → resend OTP
        otp, msg = send_otp(
            user=user,
            purpose="registration",
            channel=identifier_type,
        )

        if not otp:
            return Response({
                "message": msg,
            }, 
            status=status.HTTP_200_OK,)

        if identifier_type == "email":
            print(f"Send OTP {otp.code} to email: {identifier_value}")
        else:
            print(f"Send OTP {otp.code} to phone: {identifier_value}")

        return Response(
            {
                "message": "OTP sent for verification",
                "username": user.username,
                "sent_to": {
                    "identifier_type": identifier_type,
                    "identifier_value": identifier_value,
                },
            },
            status=status.HTTP_200_OK,
        )

class VerifyOTPView(APIView):
    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        identifier_type, identifier_value = parse_identifier_for_registration(
            serializer.validated_data["identifier"],
            serializer.validated_data["region"]
        )

        user = User.objects.filter(
            **{identifier_type: identifier_value}
        ).first()

        if not user:
            raise ValidationError("Invalid user")

        channel = identifier_type
        otp = OTP.objects.filter(
            user=user,
            purpose="registration",
            channel=channel,
            is_used=False
        ).first()

        print(otp)
        if not otp or otp.is_expired():
            raise ValidationError("OTP expired or invalid")

        if otp.code != serializer.validated_data["otp"]:
            # Block brute force 
            otp.attempts += 1
            otp.save()
            raise ValidationError("Invalid OTP")

        # SUCCESS
        otp.is_used = True
        otp.save()

        if user.email:
            user.is_email_verified = True
        if user.phone:
            user.is_phone_verified = True

        user.is_active = True
        user.save()

        return Response({"message": "Account verified successfully"})
    
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        identifier_type, identifier_value = parse_identifier_for_login(
            serializer.validated_data["identifier"],
            serializer.validated_data["region"]
        )
        password = serializer.validated_data["password"]

        user = User.objects.filter(**{identifier_type: identifier_value}).first()
        
        if user and not user.is_active:
            otp, msg = send_otp(
                user=user,
                purpose="registration",
                channel=identifier_type,
            )
            if identifier_type == "username":
                identifier_value = mask_email(user.email) if user.email else mask_phone(user.phone)
            
            return Response({
                "message": f"Account not verified! Otp sent to {identifier_value}"
            })
            # raise ValidationError("Account not verified!")
        
        if not user or not user.check_password(password):
            raise ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })

class ResendOTPView(APIView):
    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        identifier_type, identifier_value = parse_identifier_for_login(
            serializer.validated_data["identifier"],
            serializer.validated_data["region"]
        )
        if serializer.validated_data["purpose"] == "registration":
            user = User.objects.filter(**{identifier_type: identifier_value}).first()
        elif serializer.validated_data["purpose"] == "reset_password":
            user = User.objects.filter(
                **{
                    identifier_type: identifier_value,
                    "is_active": True
                }
            ).first()

        if not user:
            return Response(
                {"message": "If account exists, OTP has been sent"},
                status=200
            )

        otp, error = send_otp(user, serializer.validated_data["purpose"], identifier_type)
        if error:
            raise ValidationError(error)

        print("Resent OTP:", otp.code)
        return Response({"message": "OTP resent successfully"})

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        identifier_type, identifier_value = parse_identifier_for_login(
            serializer.validated_data["identifier"],
            serializer.validated_data["region"]
        )
        
        user = User.objects.filter(
            **{
                identifier_type: identifier_value,
                "is_active": True
            }).first()

        if user:
            otp, msg = send_otp(user, "reset_password", identifier_type)
            if not otp:
                raise ValidationError(msg)
            print("Reset OTP:", otp.code)

        return Response({
            "message": f"If account exists, OTP has been sent to your {identifier_type}"
        })

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        identifier_type, identifier_value = parse_identifier_for_login(
            serializer.validated_data["identifier"],
            serializer.validated_data["region"]
        )
        user = User.objects.filter(
            **{
                identifier_type: identifier_value, 
                "is_active": True
            }).first()

        if not user:
            return Response({
            "message": f"If account exists, OTP has been sent to your {identifier_type}"
        })

        otp = OTP.objects.filter(
            user=user,
            purpose="reset_password",
            is_used=False
        ).first()

        if not otp or otp.is_expired():
            raise ValidationError("OTP expired or invalid")

        if otp.code != serializer.validated_data["otp"]:
            # Block brute force
            # TODO
            otp.attempts += 1
            otp.save()
            raise ValidationError("Invalid OTP")

        # SUCCESS
        otp.is_used = True
        otp.save()

        user.set_password(serializer.validated_data["new_password"])
        user.save()

        return Response({"message": "Password reset successful"})

class LogoutView(APIView):
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token = RefreshToken(serializer.validated_data["refresh"])
        token.blacklist()

        return Response({"message": "Logged out successfully"})

class GoogleAuthView(APIView):
    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        google_data = verify_google_token(serializer.validated_data["token"])
        email = google_data["email"]
        # print(f"Google data: {google_data}")
        # print(f"Email: {email}")
        provider_user_id = google_data["provider_user_id"]

        # 1️⃣ Check if provider already linked
        provider = AuthProvider.objects.filter(
            provider="google",
            provider_user_id=provider_user_id
        ).first()

        if provider:
            user = provider.user

        else:
            # 2️⃣ Check if user exists by email
            user = User.objects.filter(email=email).first()

            if user:
                # 🚨 IMPORTANT: ensure email is verified
                if not user.is_email_verified:
                    raise AuthenticationFailed(
                        "Email exists but not verified. Please verify first."
                    )
            else:
                # 3️⃣ Create new user
                username = generate_unique_username(email=email)

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    is_active=True,
                    is_email_verified=True,
                )

            # 4️⃣ Link provider
            AuthProvider.objects.create(
                user=user,
                provider="google",
                provider_user_id=provider_user_id
            )

        # 5️⃣ Issue JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username
        })

class FacebookAuthView(APIView):
    def post(self, request):
        serializer = FacebookAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        fb_data = verify_facebook_token(serializer.validated_data["token"])
        email = fb_data["email"]
        provider_user_id = fb_data["provider_user_id"]

        provider = AuthProvider.objects.filter(
            provider="facebook",
            provider_user_id=provider_user_id
        ).first()

        if provider:
            user = provider.user
        else:
            user = User.objects.filter(email=email).first()

            if user:
                if not user.is_email_verified:
                    raise AuthenticationFailed(
                        "Email exists but not verified"
                    )
            else:
                username = generate_unique_username(email=email)

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    is_active=True,
                    is_email_verified=True,
                )

            AuthProvider.objects.create(
                user=user,
                provider="facebook",
                provider_user_id=provider_user_id
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username
        })
