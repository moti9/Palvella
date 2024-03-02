from rest_framework import serializers
from .models import (Business, BusinessAddress, BusinessImage, BusinessDocument)
from django.contrib.auth.models import User

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = "__all__"


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


class BusinessSerializer(serializers.ModelSerializer):
    addresses = BusinessAddressSerializer(many=True)
    images = BusinessImageSerializer(many=True)
    documents = BusinessDocumentSerializer(many=True)

    class Meta:
        model = Business
        fields = '__all__'

    def create(self, validated_data):
        addresses_data = validated_data.pop('addresses')
        images_data = validated_data.pop('images')
        documents_data = validated_data.pop('documents')

        business = Business.objects.create(**validated_data)

        for address_data in addresses_data:
            BusinessAddress.objects.create(business=business, **address_data)

        for image_data in images_data:
            BusinessImage.objects.create(business=business, **image_data)

        for document_data in documents_data:
            BusinessDocument.objects.create(business=business, **document_data)

        return business
