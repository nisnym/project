import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, password=None, **extra_fields):
        if not extra_fields.get("email") and not extra_fields.get("phone"):
            raise ValueError("User must have either email or phone")

        user = self.model(**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, password=None, **extra_fields):
        if not extra_fields.get("email"):
            raise ValueError("Superuser must have an email address")
        
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(password=password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    email = models.EmailField(unique=True, null=True, blank=True)
    phone = models.CharField(max_length=16, unique=True, null=True, blank=True)

    username = models.CharField(max_length=30, unique=True)

    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

class AuthProvider(models.Model):
    PROVIDER_CHOICES = (
        ("password", "Password"),
        ("google", "Google"),
        ("facebook", "Facebook"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="providers")
    provider = models.CharField(max_length=20, choices=PROVIDER_CHOICES)
    provider_user_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("provider", "provider_user_id")

    def __str__(self):
        return f"{self.user.username} - {self.provider}"

class OTP(models.Model):
    PURPOSE_CHOICES = (
        ("registration", "Registration"),
        ("login", "Login"),
        ("reset_password", "Reset Password"),
    )
    CHANNEL_CHOICES = (
        ("email", "Email"), 
        ("phone", "Phone")
    )

    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="otps"
    )
    purpose = models.CharField(max_length=20, choices=PURPOSE_CHOICES)
    code = models.CharField(max_length=6)
    channel = models.CharField(max_length=10, choices=CHANNEL_CHOICES)
    is_used = models.BooleanField(default=False)
    attempts = models.PositiveIntegerField(default=0)
    resend_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        indexes = [
            models.Index(fields=["user", "purpose","channel", "-created_at"]),
        ]
        ordering = ["-created_at"]

    def is_expired(self):
        return timezone.now() > self.expires_at

    def __str__(self):
            return f"{self.user.username} - {self.code} - {self.channel}"