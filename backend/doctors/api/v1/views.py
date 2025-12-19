from rest_framework.views import APIView
from rest_framework.response import Response
from doctors.models import DoctorInfo, AvailableSlot
from rest_framework import status

from .serializers import DoctorInfoSerializer
from .serializers import AvailableSlotSerializer

class DoctorCreateView(APIView):
    """
    Create doctor profile mapped to an existing User.
    """

    def post(self, request):
        serializer = DoctorInfoSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            return Response(
                {
                    "message": "Doctor profile created successfully",
                    "doctor_id": str(doctor.id)
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorSearchView(APIView):
    def get(self, request):
        specialization = request.query_params.get("specialization")
        date = request.query_params.get("date")

        doctors = DoctorInfo.objects(specialization=specialization)
        response = []

        for doctor in doctors:
            slots = AvailableSlot.objects(
                doctor=doctor.user,
                date=date,
                is_active=True
            )
            if slots:
                response.append({
                    "doctor_id": str(doctor.user.id),
                    "specialization": doctor.specialization,
                    "hospital": doctor.hospital_name,
                    "slots": [
                        {
                            "slot_id": str(slot.id),
                            "start": slot.start_time,
                            "end": slot.end_time
                        } for slot in slots
                    ]
                })

        return Response(response)

class AvailableSlotCreateView(APIView):

    def post(self, request):
        serializer = AvailableSlotSerializer(data=request.data)
        if serializer.is_valid():
            slot = serializer.save()
            return Response(
                {
                    "message": "Available slot created successfully",
                    "slot_id": str(slot.id),
                    "doctor_id": str(slot.doctor.id)
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
