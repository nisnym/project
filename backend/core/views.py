from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from core.services import log_activity, get_user_activity

class ActivityView(APIView):

    def post(self, request):
        log_activity(
            user_id=1,
            action=request.data.get("action"),
            metadata=request.data.get("metadata")
        )
        return Response({"status": "activity logged"})

    def get(self, request):
        data = get_user_activity(user_id=1)
        return Response(data)
