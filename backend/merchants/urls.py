from django.urls import path
from .views import HomeView, BusinessSearchAPIView

app_name = "merchants"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path('businesses/', BusinessSearchAPIView.as_view(), name='businesses_list'),
]
