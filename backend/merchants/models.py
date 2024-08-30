from django.db import models
from accounts.models import User
import uuid
from PIL import Image
from django.core.validators import FileExtensionValidator, MaxValueValidator
from django.core.exceptions import ValidationError
# from django.contrib.gis.geos import Point
# from django.contrib.gis.db import models as gis_models
# Create your models here.
from django.utils import timezone


def validate_image_dimensions(image):
    img = Image.open(image)
    width, height = img.size
    if width < 100 or height < 100:
        raise ValidationError("Image dimensions must be at least 100x100 pixels.")

'''
Related to business
'''    

class PostalCode(models.Model):
    postal_code = models.CharField(max_length=6, default="")

    def __str__(self):
        return self.postal_code
     

class Business(models.Model):
    class BusinessCategory(models.TextChoices):
        SHOP = "shop", "Shop"
        RESTAURANT = "restaurant", "Restaurant"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    alt_contact_number = models.CharField(max_length=15, default="")
    alt_email = models.EmailField(max_length=100, default="")
    name = models.CharField(max_length=255, default="")
    gstin = models.CharField(max_length=15, default="")
    category = models.CharField(max_length=25, choices=BusinessCategory.choices, default=BusinessCategory.SHOP)
    description = models.TextField(max_length=5000, default="")
    service_available_at = models.ManyToManyField(PostalCode)
    is_trashed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    # location = gis_models.PointField(geography=True, default=Point(0.0, 0.0))

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()


    def __str__(self) -> str:
        return f"{self.user}-{self.name}-{self.category}"


class BusinessAddress(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=255, default="")
    address_line2 = models.CharField(max_length=255, default="", null=True, blank=True)
    city = models.CharField(max_length=50, default="")
    state = models.CharField(max_length=50, default="")
    postal_code = models.CharField(max_length=20, default="")
    country = models.CharField(max_length=50, default="")
    is_trashed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()

    def __str__(self):
        return f"{self.business.name} - {self.city}, {self.country}-{self.postal_code}"


class BusinessLogo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    logo = models.ImageField(upload_to="business_logo/", validators=[FileExtensionValidator(['jpg', 'jpeg', 'png']), validate_image_dimensions])
    is_trashed = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()

    def __str__(self):
        return f"{self.business.name} Logo"


class BusinessImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="business_images/", validators=[FileExtensionValidator(['jpg', 'jpeg', 'png']), validate_image_dimensions])
    is_trashed = models.BooleanField(default=False)    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()

    def __str__(self):
        return f"{self.business.name} Image"


class BusinessDocument(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    document = models.FileField(upload_to="business_documents/", validators=[FileExtensionValidator(['pdf', 'doc', 'docx'])])  # 2MB limit
    is_trashed = models.BooleanField(default=False)    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()

    def __str__(self):
        return f"{self.business.name} Document"


class OwnerDocument(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    document = models.FileField(upload_to="owner_documents/", validators=[FileExtensionValidator(['pdf', 'doc', 'docx'])])  # 2MB limit
    is_trashed = models.BooleanField(default=False)    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()

    def __str__(self):
        return f"{self.user.username} Document"
    

'''
Related to Business Products
'''

class ProductCategory(models.Model):
    class Category(models.TextChoices):
        CLOTHING = "clothing", "Clothing"
        FRUITVEG = "fruit_vegetable", "Fruit & Vegetable"
        DAIRY = "dairy", "Dairy"
        GADGETS = "gadgets", "Gadgets"
        GARAGE = "garage", "Garage"
        RESTAURANT = "restaurant", "Restaurant"
        SWEETBAKERY = "sweet_bakery", "Sweet & Bakery"
        MEDICAL = "medical", "Medical Store"
        GROCERY = "grocery", "Grocery Store"
        BEAUTY = "beauty", "Beauty Products"
        ELECTRONICS = "electronics", "Electronics"
        BOOKS = "books", "Books"
        TOYS = "toys", "Toys"
        SPORTS = "sports", "Sports & Outdoors"
        PET_SUPPLIES = "pet_supplies", "Pet Supplies"
        HOME_DECORATION = "home_decoration", "Home Decoration"
        AUTOMOTIVE = "automotive", "Automotive"
        JEWELLRY = "jewellery", "Jewellery"
        HEALTH_FITNESS = "health_fitness", "Health & Fitness"
        MUSIC = "music", "Music"
        VIDEO_GAMES = "video_games", "Video Games"
        FURNITURE = "furniture", "Furniture"
        OFFICE_SUPPLIES = "office_supplies", "Office Supplies"
        DESSERTS = "desserts", "Desserts"
        SNACKS = "snacks", "Snacks"
        SPICES = "spices", "Spices"
        READYTOEAT = "ready_to_eat", "Ready To Eat"
        VEGETERIAN = "vegeterian", "Vegeterian"
        NONVEGETERIAN = "non_vegeterian", "Non Vegeterian"
        OTHER = "other", "Other"
        # NA = "na", "Not Available"

    name = models.CharField(max_length=20, choices=Category.choices, default=Category.OTHER)
    description = models.TextField(max_length=2000, default="")
    image = models.ImageField(upload_to="pc_images/",default=None)

    def __str__(self):
        return self.name


class ProductBrand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=2000, default="")
    image = models.ImageField(upload_to="pb_images/",default=None)

    def __str__(self):
        return self.name


class ProductVariation(models.Model):
    class SizeUnit(models.TextChoices):
        ML = "ml", "Milliliter"
        KG = "kg", "Kilogram"
        LARGE = "large", "Large"
        MEDIUM = "medium", "Medium"
        SMALL = "small", "Small"
        HALF = "half", "Half"
        FULL = "full", "Full"
        OTHER = "other", "Other"
        QUANTITY = "quantity", "Quantity"
        NA = "na", "Not Available"

    class Currency(models.TextChoices):
        INR = "INR", "Rupees"
        USD = "USD", "US Dollar",
        EUR = "EUR", "Euro"
    
    size = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, null=True, blank=True)
    size_unit = models.CharField(max_length=20, choices=SizeUnit.choices, default=SizeUnit.OTHER)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=Currency.choices, default=Currency.INR)

    def __str__(self) -> str:
        return f"{self.size_unit}-{self.size}-{self.price}"
    

class Product(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="")
    product_code = models.CharField(max_length=25, default="", blank=True, null=True)
    categories = models.ManyToManyField(ProductCategory)
    description = models.TextField(default="", max_length=4000)
    meta_data = models.TextField(default="", max_length=3000,null=True, blank=True)
    product_variant = models.ManyToManyField(ProductVariation)
    is_available = models.BooleanField(default=True)
    is_trashed = models.BooleanField(default=False)    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()

    def __str__(self):
        return f"{self.name}-{self.business.name}"


class ProductImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="product_images/", default="default.png", validators=[FileExtensionValidator(['jpg', 'jpeg', 'png']), validate_image_dimensions])
    is_trashed = models.BooleanField(default=False)    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()
    
    def __str__(self):
        return f"{self.product.name} Image"


class ShopProduct(Product):
    brands = models.ManyToManyField(ProductBrand)

    def __str__(self):
        return self.name
    

class Cuisine(models.Model):
    class CuisineType(models.TextChoices):
        INDIAN = "indian", "Indian"
        CHINESE = "chinese", "Chinese"
        ITALIAN = "italian", "Italian"
        MEXICAN = "mexican", "Mexican"
        JAPANESE = "japanese", "Japanese"
        AMERICAN = "american", "American"
        THAI = "thai", "Thai"
        FRENCH = "french", "French"
        SPANISH = "spanish", "Spanish"
        GREEK = "greek", "Greek"
        KOREAN = "korean", "Korean"
        VIETNAMESE = "vietnamese", "Vietnamese"
        GERMAN = "german", "German"
        BRAZILIAN = "brazilian", "Brazilian"
        LEVANTINE = "levantine", "Levantine"
        CARIBBEAN = "caribbean", "Caribbean"
        MOROCCAN = "moroccan", "Moroccan"
        AUSTRALIAN = "australian", "Australian"
        ARGENTINIAN = "argentinian", "Argentinian"
        ETHIOPIAN = "ethiopian", "Ethiopian"
        TURKISH = "turkish", "Turkish"
        RUSSIAN = "russian", "Russian"
        IRANIAN = "iranian", "Iranian"
        LEBANESE = "lebanese", "Lebanese"
        PAKISTANI = "pakistani", "Pakistani"
        BANGLADESHI = "bangladeshi", "Bangladeshi"
        SRI_LANKAN = "sri_lankan", "Sri Lankan"
        NEPALESE = "nepalese", "Nepalese"
        AFGHAN = "afghan", "Afghan"
        VARIOUS = "various", "Various"
        INTERNATIONAL = "international", "International"
        OTHER = "other", "Other"
        NA = "na", "Not Available"
        # Add more cuisines here...

    name = models.CharField(max_length=50, choices=CuisineType.choices, default=CuisineType.OTHER)
    description = models.TextField(max_length=4000, default="")
    image = models.ImageField(upload_to="cuisine_images/",default=None)

    def __str__(self):
        return self.name


class Allergen(models.Model):
    class AllergenType(models.TextChoices):
        GLUTEN = "gluten", "Gluten"
        DAIRY = "dairy", "Dairy"
        EGGS = "eggs", "Eggs"
        SOY = "soy", "Soy"
        PEANUTS = "peanuts", "Peanuts"
        TREE_NUTS = "tree_nuts", "Tree Nuts"
        FISH = "fish", "Fish"
        SHELLFISH = "shellfish", "Shellfish"
        SESAME = "sesame", "Sesame"
        MUSTARD = "mustard", "Mustard"
        CELERY = "celery", "Celery"
        LUPIN = "lupin", "Lupin"
        MOLLUSCS = "molluscs", "Molluscs"
        SULFITES = "sulfites", "Sulfites"
        MEAT = "meat", "Meat"
        POULTRY = "poultry", "Poultry"
        WHEAT = "wheat", "Wheat"
        CORN = "corn", "Corn"
        YEAST = "yeast", "Yeast"
        LACTOSE = "lactose", "Lactose"
        ONIONS = "onions", "Onions"
        GARLIC = "garlic", "Garlic"
        TOMATOES = "tomatoes", "Tomatoes"
        CITRUS_FRUITS = "citrus_fruits", "Citrus Fruits"
        CHOCOLATE = "chocolate", "Chocolate"
        COFFEE = "coffee", "Coffee"
        TEA = "tea", "Tea"
        ALCOHOL = "alcohol", "Alcohol"
        OTHER = "other", "Other"
        NA = "na", "Not Available"

    name = models.CharField(max_length=50, choices=AllergenType.choices, default=AllergenType.OTHER)
    description = models.TextField(max_length=4000, default="")
    image = models.ImageField(upload_to="allergen_images/",default=None)

    def __str__(self):
        return self.name


class RestaurantProduct(Product):
    cuisines = models.ManyToManyField(Cuisine)
    allergens = models.ManyToManyField(Allergen)
    preparation_time = models.DecimalField(max_digits=5, default=0.0, decimal_places=2, blank=True, null=True)
    available_from = models.TimeField(null=True, blank=True)
    available_until = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])  # Rating out of 5
    comment = models.TextField(max_length=4000, default="")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)


class BusinessReview(Review):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.business.name} Review"
    

class ProductReview(Review):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"Review for {self.product.name}"


class ReviewImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="review_images/", validators=[FileExtensionValidator(['jpg', 'jpeg', 'png']), validate_image_dimensions])
    is_trashed = models.BooleanField(default=False)    
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def trash(self):
        self.is_trashed = True
        self.save()

    def restore(self):
        self.is_trashed = False
        self.save()

    def __str__(self):
        return f"{self.image} Image"