from django.contrib import admin
from .models import (UserProfile, UserAddress, Order, OrderItem)
# Register your models here.


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'mob_number', 'mob_is_verified')
    search_fields = ('user__username', 'mob_number')
    list_filter = ('mob_is_verified',)

@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'address_line1', 'city', 'state', 'postal_code', 'country')
    search_fields = ('user__username', 'address_line1', 'city', 'state', 'postal_code', 'country')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'business', 'total_price')
    list_filter = ('user', 'business')
    search_fields = ('id', 'user__username', 'business__name')


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity')
    list_filter = ('order__user', 'product')
    search_fields = ('order__id', 'product__name')