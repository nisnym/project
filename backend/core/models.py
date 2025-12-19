from django.db import models

from mongoengine import (
    Document, StringField, BooleanField,
    DateTimeField, ReferenceField
)
from datetime import datetime

class User(Document):
    email = StringField(required=True, unique=True)
    password_hash = StringField(required=True)
    role = StringField(required=True, choices=["PATIENT", "DOCTOR"])
    consent_given = BooleanField(default=False)
    is_active = BooleanField(default=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "users"}


class AuditLog(Document):
    user = ReferenceField(User, required=True)
    action = StringField(required=True)
    resource = StringField(required=True)
    resource_id = StringField()
    ip_address = StringField()
    timestamp = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "audit_logs"}
