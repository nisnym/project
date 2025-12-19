from django.urls import path
from .views import DoctorSearchView, DoctorCreateView, AvailableSlotCreateView

urlpatterns = [
    path("create/", DoctorCreateView.as_view(), name="doctor-create"),
    path("slots/create/", AvailableSlotCreateView.as_view(), name="slot-create"),
    path("search/", DoctorSearchView.as_view(), name="doctor-search"),
]
