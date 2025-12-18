import random
from django.utils import timezone
from datetime import timedelta
from accounts.models import OTP

OTP_EXPIRY_MINUTES = 5
MAX_ATTEMPTS = 5
MAX_RESENDS = 3


def generate_otp():
    return f"{random.randint(100000, 999999)}"

def send_otp(user, purpose, channel):
    otp = OTP.objects.filter(
        user=user,
        purpose=purpose,
        channel=channel,
        is_used=False,
        expires_at__gt=timezone.now()
    ).first()

    if not otp:
        otp = OTP.objects.create(
            user=user,
            purpose=purpose,
            channel=channel,
            code=generate_otp(),
            expires_at=timezone.now() + timedelta(minutes=OTP_EXPIRY_MINUTES),
        )
        return otp, None

    if otp.resend_count >= MAX_RESENDS:
        return None, "Resend limit exceeded"

    otp.resend_count += 1
    otp.save()

    return otp, None