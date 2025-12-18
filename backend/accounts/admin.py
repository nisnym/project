from django.contrib import admin
from .models import User, AuthProvider, OTP

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "phone", "is_active", "is_email_verified", "is_phone_verified")
    search_fields = ("username", "email", "phone")
    ordering = ("-date_joined",)

@admin.register(AuthProvider)
class AuthProviderAdmin(admin.ModelAdmin):
    list_display = ("user", "provider", "provider_user_id")

admin.site.register(OTP)