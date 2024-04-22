from django.contrib import admin
from .models import User
from rest_framework_simplejwt import token_blacklist
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "contact_number", "role", "is_staff")
    list_filter = ("role", "is_staff", "is_superuser")
    search_fields = ("username", "email", "contact_number")


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):
    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)