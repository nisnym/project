from rest_framework import serializers
from accounts.models import User
from accounts.api.v1.utils import generate_unique_username
from django.contrib.auth import authenticate
from .services.validate_identifier import (
    parse_identifier_for_registration
)

class RegisterSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    region = serializers.CharField(allow_blank=True)
    password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, attrs):
        identifier_type, identifier_value = parse_identifier_for_registration(
            attrs["identifier"], attrs["region"]
        )

        existing_user = User.objects.filter(
            **{identifier_type: identifier_value}
        ).first()

        self._identifier_type = identifier_type
        self._identifier_value = identifier_value
        self._existing_user = existing_user

        return attrs
    
    def create(self, validated_data):
        # CASE: User already exists
        if self._existing_user:
            return self._existing_user

        # CASE: New user
        username = generate_unique_username(
            email=self._identifier_value if self._identifier_type == "email" else None,
            phone=self._identifier_value if self._identifier_type == "phone" else None,
        )

        user = User.objects.create_user(
            username=username,
            password=validated_data["password"],
            **{self._identifier_type: self._identifier_value},
            is_active=False,
        )

        return user

class OTPVerifySerializer(serializers.Serializer):
    identifier = serializers.CharField()
    region = serializers.CharField(allow_blank=True)
    otp = serializers.CharField()

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    region = serializers.CharField(allow_blank=True)
    password = serializers.CharField(write_only=True)

class ResendOTPSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    region = serializers.CharField(allow_blank=True)
    purpose = serializers.ChoiceField(
        choices=["registration", "reset_password"]
    )

class ForgotPasswordSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    region = serializers.CharField(allow_blank=True)

class ResetPasswordSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    region = serializers.CharField(allow_blank=True)
    otp = serializers.CharField()
    new_password = serializers.CharField(min_length=8)

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

class GoogleAuthSerializer(serializers.Serializer):
    token = serializers.CharField()

class FacebookAuthSerializer(serializers.Serializer):
    token = serializers.CharField()
