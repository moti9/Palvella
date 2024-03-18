from rest_framework import serializers
from .models import (Business, BusinessAddress, BusinessImage, BusinessDocument, OwnerDocument, ProductImage, ShopProduct, RestaurantProduct, Cuisine, Allergen, ProductVariation, Ingredient)
from django.contrib.auth.models import User
from django.db import transaction


class BusinessAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessAddress
        fields = '__all__'


class BusinessImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessImage
        fields = '__all__'


class BusinessDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDocument
        fields = '__all__'


class BusinessOwnerDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDocument
        fields = '__all__'


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = "__all__"


class BusinessListSerializer(serializers.ModelSerializer):
    thumbnail = BusinessImageSerializer(source="businessimage_set.first", read_only=True)

    class Meta:
        model = Business
        # fields = "__all__"
        fields = ('id', 'name', 'category', 'contact_number', 'alt_contact_number', 'email', 'alt_email', 'gstin', 'description', 'service_available_at', 'created_at', 'updated_at', 'thumbnail')


class BusinessDetailSerializer(serializers.ModelSerializer):
    images = BusinessImageSerializer(source="businessimage_set", many=True, read_only=True)

    class Meta:
        model = Business
        # fields = "__all__"
        fields = ('id', 'name', 'category', 'contact_number', 'alt_contact_number', 'email', 'alt_email', 'gstin', 'description', 'service_available_at', 'created_at', 'updated_at', 'images')


'''
Need to make changes in this for handling multiple postal_code, images and another required fields
'''

class BusinessRegisterSerializer(serializers.Serializer):
    business = BusinessSerializer()
    address = BusinessAddressSerializer()
    images = BusinessImageSerializer()
    business_document = BusinessDocumentSerializer()
    owner_document = BusinessOwnerDocumentSerializer()
    # service_available_at = serializers.ListField(child=serializers.CharField(), required=False)

    def create(self, validated_data):
        try:
            with transaction.atomic():
                business_data = validated_data.pop('business')
                address_data = validated_data.pop('address', None)
                image_data = validated_data.pop('images', None)
                business_document_data = validated_data.pop('business_document', None)
                owner_document_data = validated_data.pop('owner_document', None)
                service_available_at = business_data.pop('service_available_at', None)

                business = Business.objects.create(**business_data)

                if address_data:
                    BusinessAddress.objects.create(business=business, **address_data)

                if image_data:
                    BusinessImage.objects.create(business=business, **image_data)

                if business_document_data:
                    BusinessDocument.objects.create(business=business, **business_document_data)

                if owner_document_data:
                    OwnerDocument.objects.create(business=business, **owner_document_data)

                if service_available_at:
                    business.service_available_at.set(service_available_at)

                return business
        except Exception as e:
            raise serializers.ValidationError(str(e))
        

'''
for product details
'''

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = "__all__"


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class AllergenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergen
        fields = "__all__"


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"

# for listing only
class ShopProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopProduct
        fields = "__all__"


# for listing only
class RestaurantProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantProduct
        fields = "__all__"

# for detailed info
class ShopProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(source='productimage_set', many=True)
    product_variant = ProductVariantSerializer(many=True)

    class Meta:
        model = ShopProduct
        # fields = "__all__"
        fields = ('id', 'business', 'name', 'product_code', 'product_variant', 'description', 'meta_data', 'is_available', 'brand', 'images')


# for detailed info
class RestaurantProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    cuisines = CuisineSerializer(many=True)
    ingredients = IngredientSerializer(many=True)
    allergens = AllergenSerializer(many=True)
    product_variant = ProductVariantSerializer(many=True)
    images = ProductImageSerializer(source='productimage_set', many=True)


    class Meta:
        model = RestaurantProduct
        # fields = "__all__"
        fields = ('id', 'business',  'name', 'product_code', 'product_variant', 'description', 'meta_data', 'is_available', 'cuisines', 'ingredients', 'allergens', 'preparation_time', 'available_from', 'available_until', 'images')