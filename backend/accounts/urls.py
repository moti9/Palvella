from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView, TokenRefreshView
from .views import UserSignupView, UserLoginView, UserLogoutView, UserChangePasswordView, HomeView
app_name = "auth"

urlpatterns = [
    # path("",HomeView.as_view(), name="home"),
    path("signup/",UserSignupView.as_view(), name="user_signup"),
    path("login/", UserLoginView.as_view(), name="user_login"),
    path("logout/", UserLogoutView.as_view(), name="user_logout"),
    path("change-password/", UserChangePasswordView.as_view(), name="user_change_password"),
    path("token/login/", TokenObtainPairView.as_view(), name="token_login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]