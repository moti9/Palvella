# auth_backends.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from merchants.models import Business

class UserJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        return User.objects.get(pk=validated_token['user_id'])

class BusinessJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        return Business.objects.get(pk=validated_token['business_id'])
