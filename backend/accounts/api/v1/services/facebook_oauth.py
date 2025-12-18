import requests
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

def verify_facebook_token(access_token: str):
    url = "https://graph.facebook.com/me"
    params = {
        "fields": "id,email",
        "access_token": access_token
    }

    response = requests.get(url, params=params)
    data = response.json()

    if "error" in data:
        raise AuthenticationFailed("Invalid Facebook token")

    if not data.get("email"):
        raise AuthenticationFailed("Facebook email permission not granted")

    return {
        "provider_user_id": data["id"],
        "email": data["email"],
    }
