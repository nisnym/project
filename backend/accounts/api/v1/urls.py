from django.urls import path
from accounts.api.v1.views import (
    RegisterView, VerifyOTPView, LoginView,
    ResendOTPView,
    ForgotPasswordView,
    ResetPasswordView,
    LogoutView,
    GoogleAuthView,
    FacebookAuthView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("verify-otp/", VerifyOTPView.as_view()),
    path("login/", LoginView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("resend-otp/", ResendOTPView.as_view()),
    path("forgot-password/", ForgotPasswordView.as_view()),
    path("reset-password/", ResetPasswordView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("auth/google/", GoogleAuthView.as_view()),
    path("auth/facebook/", FacebookAuthView.as_view()),
]

