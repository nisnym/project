from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


def verify_google_token(token: str):
    # print("BACKEND CLIENT ID:", settings.GOOGLE_CLIENT_ID)
    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )
        # print("GOOGLE TOKEN PAYLOAD:", idinfo)
    except Exception as e:
        print("GOOGLE VERIFY EXCEPTION TYPE:", type(e))
        print("GOOGLE VERIFY EXCEPTION:", str(e))
        raise AuthenticationFailed("Invalid Google token")

    if not idinfo.get("email_verified"):
        raise AuthenticationFailed("Google email not verified")

    return {
        "provider_user_id": idinfo["sub"],
        "email": idinfo["email"],
        "name": idinfo.get("name"),
    }
