from django.urls import path
from .views import (HomeView, PlaceOrderView)

app_name="users"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("place-order/", PlaceOrderView.as_view(), name="place-order"),
]
