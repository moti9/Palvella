from django.db import models
from accounts.models import User
from merchants.models import Business, Product, ProductVariation
import uuid
# Create your models here.


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_imgage = models.ImageField(default="", null=True, blank=True, upload_to="user_profile/")
    mob_number = models.CharField(max_length=15, default="", null=False, blank=False)
    mob_is_verified = models.BooleanField(default=False, null=False, blank=False)

    def __str__(self) -> str:
        return f"{self.user.username}-{self.mob_number}"


class UserAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=255, default="", null=False, blank=False)
    address_line2 = models.CharField(max_length=255, default="", blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user}-{self.postal_code}-{self.country}"

    

class Order(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id}"
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_variant = models.ForeignKey(ProductVariation, on_delete=models.CASCADE, verbose_name='Product Variant')
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Order {self.order.id} - {self.product.name}"