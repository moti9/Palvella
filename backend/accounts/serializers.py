from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserSignupSerializer(serializers.ModelSerializer):
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
            password = validated_data.pop("password")
            confirm_password = validated_data.pop("confirm_password")
            if password != confirm_password:
                raise serializers.ValidationError("password and confirm password should be same")
            user = User.objects.create(**validated_data)
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=50, required=True)
    password = serializers.CharField(max_length=128, write_only=True, required=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)

        if user and user.is_active and user.role == "user":
            data['user'] = user
        else:
            raise serializers.ValidationError('Unable to log in with provided credentials')

        return data
    
    # def validate(self, data):
    #     username = data.get('username')
    #     password = data.get('password')

    #     if username and password:
    #         user = authenticate(username=username, password=password)
    #         if user:
    #             if user.is_active:
    #                 data['user'] = user
    #             else:
    #                 raise serializers.ValidationError("User account is disabled.")
    #         else:
    #             raise serializers.ValidationError("Invalid username or password.")
    #     else:
    #         raise serializers.ValidationError("Must include 'username' and 'password'.")

    #     return data
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {
                'write_only': True,
            },
        }


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)