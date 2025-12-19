from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PatientSerializer

class PatientCreateView(APIView):
    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            patient = serializer.save()
            return Response(
                {
                    "message": "Patient created successfully",
                    "patient_id": str(patient.id),
                    "user_id": str(patient.user.id)
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
