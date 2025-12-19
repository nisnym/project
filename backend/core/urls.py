from django.urls import path
from .views import ActivityView
from core.api.v1.views import RegisterView

urlpatterns = [
    path("activity/", ActivityView.as_view()),
    path("register/", RegisterView.as_view()),
]
