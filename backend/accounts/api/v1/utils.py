import re
import random
from django.contrib.auth import get_user_model
import random

User = get_user_model()

USERNAME_REGEX = re.compile(r'[^a-zA-Z0-9_]')

def normalize_username(value: str) -> str:
    value = value.lower()
    value = value.replace(".", "_").replace("-", "_")
    value = USERNAME_REGEX.sub("", value)
    return value[:30]


def generate_unique_username(email=None, phone=None) -> str:
    if email:
        base = email.split("@")[0]
    elif phone:
        base = f"user_{phone[-4:]}"
    else:
        base = "user"

    base = normalize_username(base)
    username = base

    while User.objects.filter(username=username).exists():
        suffix = random.randint(10, 9999)
        username = f"{base}_{suffix}"[:30]

    return username

def mask_phone(phone_number):
    """Masks all but the last four digits of a phone number."""
    if len(phone_number) >= 4:
        # Mask all characters except the last 4
        masked_part = '*' * (len(phone_number) - 4)
        visible_part = phone_number[-4:]
        return masked_part + visible_part
    else:
        return phone_number # Or handle shorter numbers as needed

def mask_email(email_address):
    """Masks the username part of an email address."""
    if '@' in email_address:
        username, domain = email_address.split('@')
        # Mask the username but keep the first and last char visible
        masked_username = username[0] + '*' * (len(username) - 2) + username[-1]
        return f"{masked_username}@{domain}"
    else:
        return email_address

# Usage:
# phone = "1234567890"
# email = "testuser@example.com"

# print(f"Masked phone: {mask_phone(phone)}")
# print(f"Masked email: {mask_email(email)}")


