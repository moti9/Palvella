from rest_framework import serializers
from merchants.models import (Business, BusinessAddress, BusinessLogo, BusinessImage, BusinessDocument, OwnerDocument, ProductImage, ShopProduct, 
        RestaurantProduct, Cuisine, Allergen, ProductVariation, PostalCode, ProductCategory, ProductBrand, Product
    )
from accounts.models import User
from django.db import transaction
from django.contrib.auth import authenticate
from .appservice import validate_pin_code
import json
'''
Authentication serializers
'''

class BusinessSignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=50, required=True)
    last_name = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(max_length=50,required=True)
    contact_number = serializers.CharField(max_length=15,required=True)
    password = serializers.CharField(
        max_length=128,
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )
    confirm_password = serializers.CharField(
        max_length=128,
        write_only=True,
        required=True,
        style={'input_type': 'password'},
    )

    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "contact_number", "password", "confirm_password"]
        extra_kwargs={
            "password": {
                "write_only": True,
            },
            "confirm_password": {
                "write_only": True,
            },
        }


    def create(self, validated_data):
        try:
            password = validated_data.get("password")
            confirm_password = validated_data.pop("confirm_password")
            if password != confirm_password:
                raise serializers.ValidationError("password and confirm password should be same")
            user = User.objects.create(**validated_data, role=User.UserRole.BUSINESS)
            # user.set_password(password)
            # user.save()
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))

'''
Business account login
'''

class BusinessLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50, required=True)
    password = serializers.CharField(max_length=128, write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)

        if user and user.is_active and user.role == User.UserRole.BUSINESS:
            data['user'] = user
        else:
            raise serializers.ValidationError('Unable to log in with provided credentials')

        return data

'''
Business Serializers - for CRUD
'''

class BusinessAddressDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAddress
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True,
            },
            'business': {
                'read_only': True,
            },
            'is_trashed': {
                'write_only': True,
            },
        }

'''
Business logo
'''

class BusinessLogoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessLogo
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True,
            },
            'business': {
                'read_only': True,
            },
            'is_trashed': {
                'write_only': True,
            },
        }

class BusinessLogoInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessLogo
        fields = ["logo"]


'''
Business image
'''

class BusinessImageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessImage
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True,
            },
            'business': {
                'read_only': True,
            },
            'is_trashed': {
                'write_only': True,
            },
        }

'''
Business account documents
'''

class BusinessDocumentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDocument
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True,
            },
            'business': {
                'read_only': True,
            },
            'is_trashed': {
                'write_only': True,
            },
        }

'''
Business owner docs
'''

class BusinessOwnerDocumentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerDocument
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True,
            },
            'business': {
                'read_only': True,
            },
            'is_trashed': {
                'write_only': True,
            },
        }
        

class PostalCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostalCode
        fields = ['postal_code']

'''
Business Serializers - for creating/update only
'''

class BusinessRegisterSerializer(serializers.ModelSerializer):
    service_available_at = PostalCodeSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = ['id', 'user', 'alt_contact_number', 'alt_email', 'name', 'gstin', 'category', 'description', 'service_available_at', 'created_at', 'updated_at']
        extra_kwargs = {
            'created_at': {
                'read_only': True,
            },
            'updated_at': {
                'read_only': True,
            },
        }
    def create(self, validated_data):
        try:        
            with transaction.atomic():
                pin_codes = self.initial_data['service_available_at']

                if len(pin_codes) == 0:
                    raise serializers.ValidationError("postal codes could not be blank")
                
                gstin = validated_data['gstin']
                if len(gstin) != 15:
                    raise serializers.ValidationError("please enter valid 15 digit gstin.")

                services_at = []
                for pin_code in pin_codes:
                    if validate_pin_code(pin_code):
                        postal_code, _ = PostalCode.objects.get_or_create(postal_code=pin_code)
                        services_at.append(postal_code)
                    else:
                        raise serializers.ValidationError("please enter valid pin codes.")

                business = Business.objects.create(**validated_data)
                business.service_available_at.set(services_at)
                return business
        except Exception as e:
            raise serializers.ValidationError(str(e))
        

    def update(self, instance, validated_data):
        try:
            with transaction.atomic():
                pin_codes = self.initial_data.get('service_available_at', [])

                if len(pin_codes) == 0:
                    raise serializers.ValidationError("Postal codes cannot be blank")
                
                gstin = validated_data.get('gstin')
                if gstin and len(gstin) != 15:
                    raise serializers.ValidationError("Please enter a valid 15 digit GSTIN.")

                services_at = []
                for pin_code in pin_codes:
                    if validate_pin_code(pin_code):
                        postal_code, _ = PostalCode.objects.get_or_create(postal_code=pin_code)
                        services_at.append(postal_code)
                    else:
                        raise serializers.ValidationError("Please enter valid pin codes.")

                instance.alt_contact_number = validated_data.get('alt_contact_number', instance.alt_contact_number)
                instance.alt_email = validated_data.get('alt_email', instance.alt_email)
                instance.name = validated_data.get('name', instance.name)
                instance.gstin = validated_data.get('gstin', instance.gstin)
                instance.category = validated_data.get('category', instance.category)
                instance.description = validated_data.get('description', instance.description)

                instance.service_available_at.set(services_at)
                instance.save()

                return instance
        except Exception as e:
            raise serializers.ValidationError(str(e))


'''
Business Serializers - for listing only
'''       

class BusinessInfoSerializer(serializers.ModelSerializer):
    logo = BusinessLogoInfoSerializer(source="businesslogo_set.first", read_only=True)

    class Meta:
        model = Business
        # fields = "__all__"
        fields = ('id', 'name', 'category', 'logo')


class BusinessListSerializer(serializers.ModelSerializer):
    thumbnail = BusinessImageDetailSerializer(source="businessimage_set.first", read_only=True)

    class Meta:
        model = Business
        # fields = "__all__"
        fields = ('id', 'name', 'category', 'alt_contact_number', 'alt_email', 'gstin', 'description', 'service_available_at', 'created_at', 'updated_at', 'thumbnail')


class BusinessDetailSerializer(serializers.ModelSerializer):
    images = BusinessImageDetailSerializer(source="businessimage_set", many=True, read_only=True)

    class Meta:
        model = Business
        # fields = "__all__"
        fields = ('id', 'name', 'category', 'alt_contact_number', 'alt_email', 'gstin', 'description', 'service_available_at', 'created_at', 'updated_at', 'images')


'''
Business Product Serializers - for CRUD
'''
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "business", "product", "image"]
        extra_kwargs = {
            "business": {
                'read_only': True,
            },
            "product": {
                'read_only': True,
            },
        }

class ProductCategoryListSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = ProductCategory
        fields = ["id", "name", "display_name"]


class ProductBrandListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBrand
        fields = ["name"]


class CuisineListSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = Cuisine
        fields = ["id", "name", "display_name"]


class AllergenListSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = Allergen
        fields = ["id", "name", "display_name"]
  

'''
for product details
'''

class ProductCategoryDetailSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = ProductCategory
        fields = "__all__"


class ProductCategoryInfoSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = ProductCategory
        fields = ["id", "name", "display_name", "image"]


class ProductVariantDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = "__all__"


class ProductImageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"

class CuisineDetailSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = Cuisine
        fields = "__all__"

class AllergenDetailSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='get_name_display', read_only=True)
    class Meta:
        model = Allergen
        fields = "__all__"

'''
Shop Product Serializers - for creating/update only
'''

class ShopProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopProduct
        fields = ["id", "business", "name", "product_code", "categories", "brands", "description", "meta_data", "product_variant", "is_available"]
        extra_kwargs = {
            'business': {
                'read_only': True,
            },
            'categories': {
                'read_only': True,
            },
            'brands': {
                'read_only': True,
            },
            'product_variant': {
                'read_only': True,
            },
        }

    def create(self, validated_data):
        try:
            categories = self.initial_data.getlist('categories', [])
            brands = self.initial_data.getlist('brands', [])
            product_variations = self.initial_data.getlist('product_variation', [])

            len_cat = len(categories)
            len_bd = len(brands)
            len_pv = len(product_variations)

            if len_cat == 0 or len_cat > 6 or len_bd == 0 or len_bd > 6:
                raise serializers.ValidationError("Please provide categories and brands and at max 6 each.")

            if len_pv == 0 or len_pv > 10:
                raise serializers.ValidationError("Please provide product variations and at max 10.")
            
            category_set = [ProductCategory.objects.get(name=category) for category in categories]
            brand_set = [ProductBrand.objects.get_or_create(name=brand)[0] for brand in brands]

            pv_set = []
            for product_variation in product_variations:
                variation_dict = json.loads(product_variation)
                variation, _ = ProductVariation.objects.get_or_create(**variation_dict)
                pv_set.append(variation)

            with transaction.atomic():
                product = ShopProduct.objects.create(**validated_data)
                product.categories.set(category_set)
                product.brands.set(brand_set)
                product.product_variant.set(pv_set)

                return product

        except Exception as e:
            raise serializers.ValidationError(str(e))
        

    def update(self, instance, validated_data):
        try:
            with transaction.atomic():
                categories = validated_data.pop('categories', [])
                brands = validated_data.pop('brand', [])
                product_variations = validated_data.pop('product_variant', [])
                images = validated_data.pop('images', [])

                category_set = [ProductCategory.objects.get(name=category) for category in categories]
                brand_set = [ProductBrand.objects.get_or_create(name=brands)[0] for brand in brands]
                pv_set = [ProductVariation.objects.create(**product_variation) for product_variation in product_variations]

                instance.name = validated_data.get('name', instance.name)
                instance.product_code = validated_data.get('product_code', instance.product_code)
                instance.description = validated_data.get('description', instance.description)
                instance.meta_data = validated_data.get('meta_data', instance.meta_data)
                instance.is_available = validated_data.get('is_available', instance.is_available)

                instance.categories.set(category_set)
                instance.brands.set(brand_set)
                instance.product_variant.set(pv_set)

                if images:
                    instance.images.all().delete()
                    for image_data in images:
                        ProductImage.objects.create(product=instance, **image_data)

                instance.save()

                return instance

        except Exception as e:
            raise serializers.ValidationError(str(e))


'''
Restaurant Product Serializers - for creating/update only
'''

class RestaurantProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantProduct
        fields = ["id", "business", "name", "product_code", "categories", "cuisines", "allergens", "description", "meta_data", "product_variant", "preparation_time", "available_from", "available_until", "is_available"]
        extra_kwargs = {
            'business': {
                'read_only': True,
            },
            'categories': {
                'read_only': True,
            },
            'cuisines': {
                'read_only': True,
            },
            'allergens': {
                'read_only': True,
            },
            'product_variant': {
                'read_only': True,
            },
        }

    def create(self, validated_data):
        try:

            categories = self.initial_data.getlist('categories', [])
            cuisines = self.initial_data.getlist('cuisines', [])
            allergens = self.initial_data.getlist('allergens', [])
            product_variations = self.initial_data.getlist('product_variation', [])

            len_cat = len(categories)
            len_cuis = len(cuisines)
            len_agen = len(allergens)
            len_pv = len(product_variations)

            if len_cat == 0 or len_cat > 6 or len_cuis == 0 or len_cuis > 6 or len_agen == 0 or len_agen > 6:
                raise serializers.ValidationError("Please provide categories, cuisines, and allergens and at max 6 each.")

            if len_pv == 0 or len_pv > 10:
                raise serializers.ValidationError("Please provide product variations and at max 10.")


            category_set = [ProductCategory.objects.get(name=category) for category in categories]
            cuisine_set = [Cuisine.objects.get(name=cuisine) for cuisine in cuisines]
            allergen_set = [Allergen.objects.get(name=allergen) for allergen in allergens]

            pv_set = []
            for product_variation in product_variations:
                variation_dict = json.loads(product_variation)
                variation, _ = ProductVariation.objects.get_or_create(**variation_dict)
                pv_set.append(variation)
            

            with transaction.atomic():
                product = RestaurantProduct.objects.create(**validated_data)
                product.categories.set(category_set)
                product.cuisines.set(cuisine_set)
                product.allergens.set(allergen_set)
                product.product_variant.set(pv_set)
                return product

        except (ProductCategory.DoesNotExist, Cuisine.DoesNotExist, Allergen.DoesNotExist, ProductVariation.DoesNotExist) as e:
            raise serializers.ValidationError(str(e))
        except Exception as e:
            raise serializers.ValidationError(str(e))


    def update(self, instance, validated_data):
        try:
            with transaction.atomic():
                categories = validated_data.pop('categories', [])
                cuisines = validated_data.pop('cuisines', [])
                allergens = validated_data.pop('allergens', [])
                product_variations = validated_data.pop('product_variant', [])
                images = validated_data.pop('images', [])

                category_set = [ProductCategory.objects.get(name=category) for category in categories]
                cuisine_set = [Cuisine.objects.get(name=cuisine) for cuisine in cuisines]
                allergen_set = [Allergen.objects.get(name=allergen) for allergen in allergens]
                pv_set = [ProductVariation.objects.create(**product_variation) for product_variation in product_variations]

                instance.name = validated_data.get('name', instance.name)
                instance.product_code = validated_data.get('product_code', instance.product_code)
                instance.description = validated_data.get('description', instance.description)
                instance.meta_data = validated_data.get('meta_data', instance.meta_data)
                instance.preparation_time = validated_data.get('preparation_time', instance.preparation_time)
                instance.available_from = validated_data.get('available_from', instance.available_from)
                instance.available_until = validated_data.get('available_until', instance.available_until)
                instance.is_available = validated_data.get('is_available', instance.is_available)

                instance.categories.set(category_set)
                instance.cuisines.set(cuisine_set)
                instance.allergens.set(allergen_set)
                instance.product_variant.set(pv_set)

                if images:
                    instance.images.all().delete()
                    for image_data in images:
                        ProductImage.objects.create(product=instance, **image_data)

                instance.save()

                return instance

        except (ProductCategory.DoesNotExist, Cuisine.DoesNotExist, Allergen.DoesNotExist) as e:
            raise serializers.ValidationError(str(e))

'''
Business Product Serializers - for listing only
'''      

# for listing only
class ProductInfoSerializer(serializers.ModelSerializer):
    # images = ProductImageDetailSerializer(source='productimage_set', many=True)
    thumbnail = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ('id', 'name', 'is_available', 'thumbnail')
    
    def get_thumbnail(self, obj):
        first_image = obj.productimage_set.first()
        if first_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(first_image.image.url)
        return None

# for listing only
class ProductListSerializer(serializers.ModelSerializer):
    # images = ProductImageDetailSerializer(source='productimage_set', many=True)
    thumbnail = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ('id', 'business', 'name', 'product_code', 'is_available', 'thumbnail')
    
    def get_thumbnail(self, obj):
        first_image = obj.productimage_set.first()
        if first_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(first_image.image.url)
        return None
    

class ShopProductListSerializer(serializers.ModelSerializer):
    # images = ProductImageDetailSerializer(source='productimage_set', many=True)
    thumbnail = serializers.SerializerMethodField()
    class Meta:
        model = ShopProduct
        fields = ('id', 'business', 'name', 'product_code', 'is_available', 'thumbnail')
    
    def get_thumbnail(self, obj):
        first_image = obj.productimage_set.first()
        if first_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(first_image.image.url)
        return None
    
    
# for listing only
class RestaurantProductListSerializer(serializers.ModelSerializer):
    # cuisines = CuisineListSerializer(many=True)
    # allergens = AllergenListSerializer(many=True)
    # product_variant = ProductVariantDetailSerializer(many=True)
    # images = ProductImageDetailSerializer(source='productimage_set', many=True)
    thumbnail = serializers.SerializerMethodField()
    class Meta:
        model = RestaurantProduct
        fields = ('id', 'business',  'name', 'product_code', 'is_available', 'thumbnail')
        # fields = "__all__"

    def get_thumbnail(self, obj):
        first_image = obj.productimage_set.first()
        if first_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(first_image.image.url)
        return None

# for detailed info
class ShopProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageDetailSerializer(source='productimage_set')
    product_variant = ProductVariantDetailSerializer(many=True)

    class Meta:
        model = ShopProduct
        # fields = "__all__"
        fields = ('id', 'business', 'name', 'product_code', 'product_variant', 'description', 'meta_data', 'is_available', 'brand', 'images')


# for detailed info
class RestaurantProductDetailSerializer(serializers.ModelSerializer):
    # images = ProductImageDetailSerializer(many=True, read_only=True)
    cuisines = CuisineDetailSerializer(many=True)
    allergens = AllergenDetailSerializer(many=True)
    product_variant = ProductVariantDetailSerializer(many=True)
    images = ProductImageDetailSerializer(source='productimage_set')


    class Meta:
        model = RestaurantProduct
        # fields = "__all__"
        fields = ('id', 'business',  'name', 'product_code', 'product_variant', 'description', 'meta_data', 'is_available', 'cuisines', 'allergens', 'preparation_time', 'available_from', 'available_until', 'images')


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'image')

    def get_image(self, obj):
        # Get the first image of the product
        product_image = ProductImage.objects.filter(product=obj, is_trashed=False).first()
        if product_image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(product_image.image.url)
        return None



'''
Serialzers for generating contents-start
'''

class ProductContentSerializer(serializers.Serializer):
    CONTENT_CHOICE = (
        ("description", "Description"),
        ("meta_data_or_more_info", "Meta data"),
    )

    name = serializers.CharField(max_length=255, required=True)
    product_code = serializers.CharField(max_length=25, required=True)
    categories = serializers.ListField(child=serializers.CharField(), required=True)
    content_type = serializers.ChoiceField(choices=CONTENT_CHOICE)


class ShopProductContentSerializer(ProductContentSerializer):
    brands = serializers.ListField(child=serializers.CharField(), required=True)

    def validate(self, validated_data):
        try:
            name = validated_data.pop('name')
            product_code = validated_data.pop('product_code')
            categories_all = validated_data.pop('categories')
            content_type = validated_data.pop('content_type')
            brand_all = validated_data.pop('brands')
            if len(brand_all) == 0 or len(categories_all) == 0:
                raise ValueError("Please provide the brand name")
            brand = ", ".join(brand_all)
            prompt = f"Generate a {content_type} in human tone(in text format without any styling like markdown styles etc and with multiple appropriate paragraphs) for the shop product: {name} with product code: {product_code} for brands: {brand}."
            return prompt
        except Exception as e:
            raise serializers.ValidationError(str(e))
        

class RestaurantProductContentSerializer(ProductContentSerializer):
    cuisines = serializers.ListField(child=serializers.CharField(), required=True)
    allergens = serializers.ListField(child=serializers.CharField(), required=True)

    def validate(self, validated_data):
        try:
            name = validated_data.pop('name')
            product_code = validated_data.pop('product_code')
            categories_all = validated_data.pop('categories')
            content_type = validated_data.pop('content_type')
            cuisines_all = validated_data.pop('cuisines')
            allergens_all = validated_data.pop('allergens')
            if len(categories_all) == 0 or len(cuisines_all) == 0 or len(allergens_all) == 0:
                raise ValueError("Please provide accurate data")
            cuisines = ", ".join(cuisines_all)
            allergens = ", ".join(allergens_all)
            prompt = f"Generate a {content_type} in human tone(in text format without any styling like markdown styles(like * or anything else) etc and with multiple appropriate paragraphs) for the restaurant product: {name} with product code: {product_code} for cuisines: {cuisines} and allergens: {allergens}.:"
            return prompt
        except Exception as e:
            raise serializers.ValidationError(str(e))
        

class BusinessContentSerializer(serializers.Serializer):
    BUSINESS_CATEGORY = (
        ("shop", "Shop"),
        ("restaurant", "Restaurant"),
    )
    name = serializers.CharField(max_length=255, required=True)
    category = serializers.ChoiceField(choices=BUSINESS_CATEGORY)
    gstin = serializers.CharField(max_length=50, required=True)
    service_available_at = serializers.ListField(child=serializers.CharField(), required=True)

    def validate(self, validated_data):
        try:
            name = validated_data.pop('name')
            category = validated_data.pop('category')
            gstin = validated_data.pop('gstin')
            service_available_at_all = validated_data.pop('service_available_at')
            if len(service_available_at_all) == 0:
                raise ValueError("Please provide accurate data")
            service_available_at = ", ".join(service_available_at_all)
            prompt = f"Generate a detailed description(in text format without any styling like markdown styles(like * or anything else) etc and with multiple appropriate paragraphs) for the {category} '{name}' with GSTIN: {gstin} in human tone where the '{name}' provide services at the following postals like {service_available_at}. Description:"

            return prompt
        except Exception as e:
            raise serializers.ValidationError(str(e))
        
'''
Serialzers for generating contents-end
'''    