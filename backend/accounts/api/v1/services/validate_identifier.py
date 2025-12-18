import re
from rest_framework.exceptions import ValidationError
import phonenumbers

EMAIL_REGEX = re.compile(r"^[^@]+@[^@]+\.[^@]+$")
USERNAME_REGEX = re.compile(r"^[a-z0-9_]{3,30}$")
PHONE_REGEX = re.compile(r"^[0-9]{8,15}$")


def normalize_phone_number(raw_phone: str, region="IN"):
    """
    Convert phone number to E.164 format.
    """

    try:
        parsed = phonenumbers.parse(raw_phone, region)
    except phonenumbers.NumberParseException:
        raise ValidationError("Invalid phone number format")

    if not phonenumbers.is_valid_number(parsed):
        raise ValidationError("Invalid phone number")

    return phonenumbers.format_number(
        parsed,
        phonenumbers.PhoneNumberFormat.E164
    )

def parse_identifier_for_login(identifier: str, region: str):
    """
    Parse and validate login identifier.
    Returns: (identifier_type, normalized_value)
    """

    if not identifier or not isinstance(identifier, str):
        raise ValidationError("Invalid identifier")

    identifier = identifier.strip()

    # EMAIL
    if "@" in identifier:
        if not EMAIL_REGEX.match(identifier):
            raise ValidationError("Invalid email format")
        return "email", identifier.lower()

    # PHONE
    if identifier.isdigit():
        if region == "":
            region = "IN"
        identifier = normalize_phone_number(identifier, region)
        return "phone", identifier

    # USERNAME
    identifier = identifier.lower()

    if not USERNAME_REGEX.match(identifier):
        raise ValidationError(
            "Invalid username. Use 3–30 characters: letters, numbers, underscore."
        )

    return "username", identifier

def parse_identifier_for_registration(identifier: str, region: str):
    """
    Registration allows ONLY email or phone.
    Username signup is not allowed.
    """

    if not identifier or not isinstance(identifier, str):
        raise ValidationError("Invalid Email or Phone Number")

    identifier = identifier.strip()

    if "@" in identifier:
        if not EMAIL_REGEX.match(identifier):
            raise ValidationError("Invalid email format")
        return "email", identifier.lower()

    if identifier.isdigit():
        if region == "":
            region = "IN"
        identifier = normalize_phone_number(identifier, region)
        return "phone", identifier

    raise ValidationError("Registration requires email or phone number")

def validate_username(username: str):
    if not USERNAME_REGEX.match(username):
        raise ValidationError(
            "Invalid username. Use 3–30 characters: letters, numbers, underscore."
        )
    return username.lower()
