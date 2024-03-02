from django.db import models
from django.contrib.auth.models import User
import uuid
from PIL import Image
from django.core.validators import FileExtensionValidator, MaxValueValidator
from django.core.exceptions import ValidationError
# from django.contrib.gis.geos import Point
# from django.contrib.gis.db import models as gis_models
# Create your models here.


def validate_image_dimensions(image):
    img = Image.open(image)
    width, height = img.size
    if width < 100 or height < 100:
        raise ValidationError("Image dimensions must be at least 100x100 pixels.")
    

class PostalCode(models.Model):
    postal_code = models.CharField(max_length=6, default="")

    def __str__(self):
        return self.postal_code
    

class Business(models.Model):
    class BusinessCategory(models.TextChoices):
        SHOP = "shop", "Shop"
        RESTAURANT = "restaurant", "Restaurant"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    name = models.CharField(max_length=255, default="")
    category = models.CharField(max_length=50, choices=BusinessCategory.choices, default=BusinessCategory.SHOP)
    contact_number = models.CharField(max_length=15, default="")
    email = models.EmailField(max_length=100, default="")
    description = models.TextField(max_length=1000, default="")
    service_available_at = models.ManyToManyField(PostalCode)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # location = gis_models.PointField(geography=True, default=Point(0.0, 0.0))


    def __str__(self) -> str:
        return f"{self.owner}-{self.name}-{self.category}"


class BusinessAddress(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, default=None)
    address_line1 = models.CharField(max_length=255, default="")
    address_line2 = models.CharField(max_length=255, default="", null=True, blank=True)
    city = models.CharField(max_length=50, default="")
    state = models.CharField(max_length=50, default="")
    postal_code = models.CharField(max_length=20, default="")
    country = models.CharField(max_length=50, default="")

    def __str__(self):
        return f"{self.business.name} - {self.city}, {self.country}-{self.postal_code}"


class BusinessImage(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, default=None)
    image = models.ImageField(upload_to="business_images/", validators=[FileExtensionValidator(['jpg', 'jpeg', 'png']),MaxValueValidator(1 * 1024* 1024), validate_image_dimensions])
    
    def __str__(self):
        return f"{self.business.name} Image"


class BusinessDocument(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, default=None)
    document = models.FileField(upload_to="business_documents/", validators=[FileExtensionValidator(['pdf', 'doc', 'docx']), MaxValueValidator(2 * 1024 * 1024)])  # 10MB limit
    
    def __str__(self):
        return f"{self.business.name} Document"


class OwnerDocument(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    document = models.FileField(upload_to="owner_documents/", validators=[FileExtensionValidator(['pdf', 'doc', 'docx']), MaxValueValidator(2 * 1024 * 1024)])  # 10MB limit
    
    def __str__(self):
        return f"{self.owner.username} Document"


class Allergen(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    unit = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Cuisine(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        verbose_name = "Cuisine"
        verbose_name_plural = "Cuisines"

    def __str__(self):
        return self.name


class ProductVariation(models.Model):
    class SizeUnit(models.TextChoices):
        ML = 'ml', 'Milliliter'
        KG = 'kg', 'Kilogram'
        LARGE = 'large', 'Large'
        MEDIUM = 'medium', 'Medium'
        SMALL = 'small', 'Small'
        HALF = 'half', 'Half'
        OTHER = 'other', 'Other'

    # product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, null=True, blank=True)
    size_unit = models.CharField(max_length=20, choices=SizeUnit.choices, default=SizeUnit.ML)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')

    class Meta:
        verbose_name = "Product variation"
        verbose_name_plural = "Product variations"
        # unique_together = ['product', 'size', 'size_unit']

class Product(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="")
    product_code = models.CharField(max_length=25, default="", blank=True, null=True)
    product_variant = models.ForeignKey(ProductVariation, on_delete=models.CASCADE)
    description = models.TextField(default="")
    meta_data = models.TextField(default="", null=True, blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # class Meta:
    #     abstract = True


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, default=None)
    image = models.ImageField(upload_to="product_images/", validators=[FileExtensionValidator(['jpg', 'jpeg', 'png']),MaxValueValidator(2 * 1024* 1024), validate_image_dimensions])
    
    def __str__(self):
        return f"{self.product.name} Image"


class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class ShopProduct(Product):
    brand = models.CharField(max_length=100, default="")
    class Meta:
        verbose_name = "Shop Product"
        verbose_name_plural = "Shop Products"

    def __str__(self):
        return self.name


class RestaurantProduct(Product):
    cuisines = models.ManyToManyField(Cuisine)
    ingredients = models.ManyToManyField(Ingredient)
    allergens = models.ManyToManyField(Allergen)
    preparation_time = models.CharField(max_length=50, default="", blank=True, null=True)
    available_from = models.TimeField(null=True, blank=True)
    available_until = models.TimeField(null=True, blank=True)
    class Meta:
        verbose_name = "Restaurant Product"
        verbose_name_plural = "Restaurant Products"

    def __str__(self):
        return self.name
    
    
class Review(models.Model):
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])  # Rating out of 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     abstract = True


class BusinessReview(Review):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.business.name} Review"
    

class ProductReview(Review):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Product Review"
        verbose_name_plural = "Product Reviews"

    def __str__(self):
        return f"Review for {self.product.name}"
