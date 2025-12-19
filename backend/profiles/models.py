from django.db import models

# Create your models here.
from mongoengine import (
    Document, StringField, DateField,
    ReferenceField, EmbeddedDocument, EmbeddedDocumentField,
    ListField
)
from core.models import User


class HealthInfo(EmbeddedDocument):
    allergies = ListField(StringField())
    current_medications = ListField(StringField())
    blood_type = StringField()


class Profile(Document):
    user = ReferenceField(User, required=True, unique=True)
    name = StringField()
    date_of_birth = DateField()
    gender = StringField()
    phone = StringField()
    address = StringField()
    profile_picture_url = StringField()
    health_info = EmbeddedDocumentField(HealthInfo)

    meta = {"collection": "profiles"}
