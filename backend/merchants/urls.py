from django.urls import path
from .views import ( HomeView, BusinessRegistrationView, BusinessSignupView, BusinessLoginView, BusinessInfoView, BusinessDetailsView, 
        ShopProductListView, RestaurantProductListView, ShopProductDetailView, RestaurantProductDetailView, BusinessAddressView, 
        BusinessLogoView, BusinessImageView, BusinessDocumentView, BusinessOwnerDocumentView, GenerateShopProductContentView, 
        GenerateRestaurantProductContentView, GenerateBusinessContentView, ShopProductView, RestaurantProductView, AllergenListView,
        CuisineListView, ProductCategoryListView, ProductCategoryDetailView, CuisineDetailView, ProductOwnerListView, TopProductsListView,
        ProductCategoryInfoView, ProductListView, ProductInfoView
    )

from accounts.views import UserLogoutView, UserChangePasswordView

app_name = "merchants"

urlpatterns = [
    # path("", HomeView.as_view(), name="home"),
    path("signup/", BusinessSignupView.as_view(), name="business-account-signup"),
    path("login/", BusinessLoginView.as_view(), name="business-login"),
    path("logout/", UserLogoutView.as_view(), name="business-logout"),
    path("change-password/", UserChangePasswordView.as_view(), name="business-change-password"),
    # endpoints for merchants request
    path('register/', BusinessRegistrationView.as_view(), name='register-business'),
    path('business-address/', BusinessAddressView.as_view(), name='business-address'),
    path('business-logo/', BusinessLogoView.as_view(), name='business-logo'),
    path('business-image/', BusinessImageView.as_view(), name='business-image'),
    path('business-document/', BusinessDocumentView.as_view(), name='business-document'),
    path('owner-document/', BusinessOwnerDocumentView.as_view(), name='business-owner-document'),
    path('create-shop-product/',ShopProductView.as_view(), name='create-shop-product'),
    path('create-restaurant-product/',RestaurantProductView.as_view(), name='create-restaurant-product'),
    path('get-products/',ProductOwnerListView.as_view(), name='get-products'),
    path('categories/', ProductCategoryListView.as_view(), name='category-list'),
    path('category-detail/', ProductCategoryDetailView.as_view(), name='category-detail-list'),
    path('category-info/', ProductCategoryInfoView.as_view(), name='category-info'),
    path('cuisines/', CuisineListView.as_view(), name='cuisine-list'),
    path('cuisine-detail/', CuisineDetailView.as_view(), name='cuisine-detail-list'),
    path('allergens/', AllergenListView.as_view(), name='allergen-list'),
    path("top-products/", TopProductsListView.as_view(), name="top-products"),
    # endpoints for handle merchnats details
    path('businesses/', BusinessInfoView.as_view(), name='business-info'),
    path('business/<uuid:pk>/', BusinessDetailsView.as_view(), name='business-details'),
    path('products/', ProductInfoView.as_view(), name='product-info'),
    path('products/shop/', ShopProductListView.as_view(), name='shop-product-list'),
    path('products/restaurant/', RestaurantProductListView.as_view(), name='restaurant-product-list'),
    path('shop-product/<uuid:pk>/', ShopProductDetailView.as_view(), name='shop-product-detail'),
    path('restaurant-product/<uuid:pk>/', RestaurantProductDetailView.as_view(), name='restaurant-product-detail'),
    # path('businesses/', BusinessSearchView.as_view(), name='businesses_list'),
    # content generation endpoints
    path('business-content/', GenerateBusinessContentView.as_view(), name='business-content'),
    path('shop-content/', GenerateShopProductContentView.as_view(), name='shop-content'),
    path('restaurant-content/', GenerateRestaurantProductContentView.as_view(), name='restaurant-content'),
]
