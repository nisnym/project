from rest_framework import serializers
from doctors.models import DoctorInfo
from core.models import User

class DoctorInfoSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    specialization = serializers.CharField()
    license_number = serializers.CharField()
    hospital_name = serializers.CharField()

    def validate_user_id(self, value):
        try:
            user = User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist")

        if user.role != "DOCTOR":
            raise serializers.ValidationError("User role is not DOCTOR")

        # Prevent duplicate doctor profile
        if DoctorInfo.objects(user=user).first():
            raise serializers.ValidationError("Doctor profile already exists")

        return value

    def create(self, validated_data):
        user = User.objects.get(id=validated_data["user_id"])

        doctor = DoctorInfo(
            user=user,
            specialization=validated_data["specialization"],
            license_number=validated_data["license_number"],
            hospital_name=validated_data["hospital_name"]
        )
        doctor.save()
        return doctor


from rest_framework import serializers
from core.models import User
from doctors.models import AvailableSlot


class AvailableSlotSerializer(serializers.Serializer):
    doctor_id = serializers.CharField()
    day = serializers.CharField()
    start_time = serializers.CharField()
    end_time = serializers.CharField()
    max_patients = serializers.IntegerField(required=False)

    def validate_doctor_id(self, value):
        try:
            user = User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("Doctor user does not exist")

        if user.role != "DOCTOR":
            raise serializers.ValidationError("User is not a doctor")

        return value

    def create(self, validated_data):
        doctor = User.objects.get(id=validated_data["doctor_id"])

        slot = AvailableSlot(
            doctor=doctor,
            day=validated_data["day"],
            start_time=validated_data["start_time"],
            end_time=validated_data["end_time"],
            max_patients=validated_data.get("max_patients", 1)
        )
        slot.save()
        return slot
