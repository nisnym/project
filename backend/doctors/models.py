from django.db import models

# Create your models here.
from mongoengine import (
    Document, StringField, ReferenceField,
    IntField, DateField, BooleanField
)
from core.models import User


class DoctorInfo(Document):
    user = ReferenceField(User, required=True, unique=True)
    specialization = StringField(required=True)
    license_number = StringField(required=True)
    hospital_name = StringField()
    max_patients_per_slot = IntField(default=1)

    meta = {"collection": "doctor_info"}

class AvailableSlot(Document):
    doctor = ReferenceField(User, required=True)
    day = StringField(required=True)          # e.g. "2025-02-10" or "Monday"
    start_time = StringField(required=True)   # "10:00"
    end_time = StringField(required=True)     # "10:30"
    max_patients = IntField(default=1)

    meta = {
        "collection": "available_slots",
        "indexes": [
            ("doctor", "day"),
        ]
    }
