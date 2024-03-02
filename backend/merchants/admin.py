from django.contrib import admin
from .models import (Business, BusinessAddress, BusinessImage, BusinessDocument, OwnerDocument, Allergen,
                     Ingredient, Cuisine, ProductVariation, ProductImage, Category, ShopProduct,
                     RestaurantProduct, BusinessReview, ProductReview, PostalCode)


@admin.register(PostalCode)
class PostalCodeAdmin(admin.ModelAdmin):
    pass

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'category', 'contact_number', 'email')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'owner__username', 'contact_number')


@admin.register(BusinessAddress)
class BusinessAddressAdmin(admin.ModelAdmin):
    list_display = ('business', 'address_line1', 'city', 'state', 'postal_code', 'country')
    list_filter = ('city', 'state', 'country')
    search_fields = ('business__name', 'address_line1', 'city', 'state', 'postal_code', 'country')


@admin.register(BusinessImage)
class BusinessImageAdmin(admin.ModelAdmin):
    list_display = ('business', 'image')
    search_fields = ('business__name',)


@admin.register(BusinessDocument)
class BusinessDocumentAdmin(admin.ModelAdmin):
    list_display = ('business', 'document')
    search_fields = ('business__name',)


@admin.register(OwnerDocument)
class OwnerDocumentAdmin(admin.ModelAdmin):
    list_display = ('owner', 'document')
    search_fields = ('owner__username',)


@admin.register(Allergen)
class AllergenAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'unit')
    search_fields = ('name',)


@admin.register(Cuisine)
class CuisineAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(ProductVariation)
class ProductVariationAdmin(admin.ModelAdmin):
    list_display = ('size', 'size_unit', 'price', 'currency')
    list_filter = ('size_unit', 'price')
    search_fields = ('size',)


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'image')
    search_fields = ('product__name',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(ShopProduct)
class ShopProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'business', 'brand', 'is_available')
    list_filter = ('is_available', 'business')
    search_fields = ('name', 'business__name', 'brand')


@admin.register(RestaurantProduct)
class RestaurantProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'business', 'preparation_time', 'is_available')
    list_filter = ('is_available', 'business', 'cuisines')
    search_fields = ('name', 'business__name', 'cuisines__name')


@admin.register(BusinessReview)
class BusinessReviewAdmin(admin.ModelAdmin):
    list_display = ('business', 'user', 'rating', 'created_at')
    list_filter = ('business', 'rating', 'created_at')
    search_fields = ('business__name', 'user__username')


@admin.register(ProductReview)
class ShopProductReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'created_at')
    list_filter = ('product', 'rating', 'created_at')
    search_fields = ('product__name', 'user__username')

