from django.db import models

# Create your models here.
from mongoengine import (
    Document, ReferenceField, DateTimeField, StringField
)
from datetime import datetime
from core.models import User
from doctors.models import AvailableSlot


class Appointment(Document):
    patient = ReferenceField(User, required=True)
    doctor = ReferenceField(User, required=True)
    slot = ReferenceField(AvailableSlot, required=True)
    status = StringField(
        choices=["BOOKED", "CANCELLED", "COMPLETED"],
        default="BOOKED"
    )
    notes = StringField()
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "appointments"}
