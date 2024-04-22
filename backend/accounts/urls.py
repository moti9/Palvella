from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView, TokenRefreshView
from .views import UserSignupView, UserLoginView, UserLogoutView, UserChangePasswordView, HomeView

app_name = "accounts"

urlpatterns = [
    # path("",HomeView.as_view(), name="home"),
    path("signup/",UserSignupView.as_view(), name="user-signup"),
    path("login/", UserLoginView.as_view(), name="user-login"),
    path("logout/", UserLogoutView.as_view(), name="user-logout"),
    path("change-password/", UserChangePasswordView.as_view(), name="user-change-password"),
    path("token/login/", TokenObtainPairView.as_view(), name="token-login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token-verify"),
]