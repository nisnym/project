from django.db import models

# Create your models here.
from mongoengine import Document, ReferenceField, StringField
from core.models import User


class Patient(Document):
    user = ReferenceField(User, required=True, unique=True)
    emergency_contact = StringField()

    meta = {"collection": "patients"}
