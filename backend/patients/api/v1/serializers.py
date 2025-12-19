from rest_framework import serializers
from core.models import User
from patients.models import Patient


class PatientSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    emergency_contact = serializers.CharField(required=False, allow_blank=True)

    def validate_user_id(self, value):
        try:
            user = User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist")

        if user.role != "PATIENT":
            raise serializers.ValidationError("User role is not PATIENT")

        # Prevent duplicate patient entry
        if Patient.objects(user=user).first():
            raise serializers.ValidationError("Patient already exists")

        return value

    def create(self, validated_data):
        user = User.objects.get(id=validated_data["user_id"])

        patient = Patient(
            user=user,
            emergency_contact=validated_data.get("emergency_contact", "")
        )
        patient.save()

        return patient
