from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from core.models import User


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=["PATIENT", "DOCTOR"])
    consent_given = serializers.BooleanField()

    def create(self, validated_data):
        user = User(
            email=validated_data["email"],
            password_hash=make_password(validated_data["password"]),
            role=validated_data["role"],
            consent_given=validated_data["consent_given"]
        )
        user.save()
        return user
