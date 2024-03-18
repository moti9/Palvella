from django.urls import path
from .views import HomeView, BusinessRegistrationView, BusinessListView, BusinessDetailsView, ShopProductListView, RestaurantProductListView, ShopProductDetailView, RestaurantProductDetailView

app_name = "merchants"

urlpatterns = [
    # path("", HomeView.as_view(), name="home"),
    path('register/', BusinessRegistrationView.as_view(), name='register-business'),
    path('businesses/', BusinessListView.as_view(), name='business-list'),
    path('business/<uuid:pk>/', BusinessDetailsView.as_view(), name='business-details'),
    path('products/shop/', ShopProductListView.as_view(), name='shop-product-list'),
    path('products/restaurant/', RestaurantProductListView.as_view(), name='restaurant-product-list'),
    path('shop-product/<uuid:pk>/', ShopProductDetailView.as_view(), name='shop-product-detail'),
    path('restaurant-product/<uuid:pk>/', RestaurantProductDetailView.as_view(), name='restaurant-product-detail'),
    # path('businesses/', BusinessSearchView.as_view(), name='businesses_list'),
]
