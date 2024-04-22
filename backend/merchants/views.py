# Import from rest_framework
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser
# Import from rest_framework_simplejwt
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
# Import from others
# from django.shortcuts import render
from .models import (Business, BusinessAddress, BusinessLogo, BusinessImage, BusinessDocument, OwnerDocument, ShopProduct, RestaurantProduct, Allergen,
        Cuisine, ProductCategory
    )
from .serializers import (BusinessRegisterSerializer, BusinessSignupSerializer, BusinessListSerializer, BusinessDetailSerializer, ShopProductDetailSerializer, 
        RestaurantProductDetailSerializer, ShopProductListSerializer, RestaurantProductListSerializer, BusinessLoginSerializer, BusinessAddressDetailSerializer, 
        BusinessLogoDetailSerializer, BusinessImageDetailSerializer, BusinessDocumentDetailSerializer, BusinessOwnerDocumentDetailSerializer, ShopProductContentSerializer, 
        RestaurantProductContentSerializer, BusinessContentSerializer, CuisineListSerializer, AllergenListSerializer, ProductCategoryListSerializer, ShopProductSerializer,
        RestaurantProductSerializer, ProductCategoryDetailSerializer, CuisineDetailSerializer, AllergenDetailSerializer, ProductImageSerializer
    )
# Custom import
import google.generativeai as genai
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import transaction
# from django.shortcuts import get_object_or_404
# import uuid
# Create your views here.

'''
Home
'''

class HomeView(APIView):
    def get(self, request):
        return Response({"message": "welcome to merchants views"}, status=status.HTTP_200_OK)

'''
Business account signup
'''

class BusinessSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "account created successfully."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer(self, *args, **kwargs):
        return BusinessSignupSerializer(*args, **kwargs)

'''
Business account login
'''


class BusinessLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            serializer = BusinessLoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']

            OutstandingToken.objects.filter(user=user).delete()

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            response_data = {
                'refresh_token': str(refresh),
                'access_token': str(access_token),
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': str(user.role)
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer(self, *args, **kwargs):
        return BusinessLoginSerializer(*args, **kwargs)

'''
Business registration
'''

class BusinessRegistrationView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            business = Business.objects.get(user=request.user)
            return Response(BusinessRegisterSerializer(business).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            business = Business.objects.get(user=request.user)
            return Response(BusinessRegisterSerializer(business).data, status=status.HTTP_200_OK)
        except Business.DoesNotExist:
                serializer = BusinessRegisterSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def get_serializer(self, *args, **kwargs):
        return BusinessRegisterSerializer(*args, **kwargs)

'''
Business address
'''

class BusinessAddressView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            addresses = BusinessAddress.objects.filter(user=request.user, is_trashed=False).order_by("-created_at")
            serializer = BusinessAddressDetailSerializer(addresses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            serializer = BusinessAddressDetailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            business = Business.objects.get(user=request.user)
            serializer.save(user=request.user, business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            address = BusinessAddress.objects.get(user=request.user, pk=pk)
            serializer = BusinessAddressDetailSerializer(address, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "address updated successfully"}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            address = BusinessAddress.objects.get(user=request.user, pk=pk)
            address.trash()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

'''
Business logo
'''


class BusinessLogoView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            logos = BusinessLogo.objects.filter(user=request.user, is_trashed=False).first()
            serializer = BusinessLogoDetailSerializer(logos)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            serializer = BusinessLogoDetailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            business = Business.objects.get(user=request.user)
            serializer.save(user=request.user, business=business)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            logo = BusinessLogo.objects.get(user=request.user, pk=pk)
            logo.trash()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

'''
Business images
'''

class BusinessImageView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [FormParser, MultiPartParser]
    max_image_upload_limit = 6

    def get(self, request):
        try:
            images = BusinessImage.objects.filter(user=request.user, is_trashed=False).order_by("-created_at")
            serializer = BusinessImageDetailSerializer(images, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def post(self, request):
        try:
            if 'image' not in request.data:
                raise ValidationError("No images provided for upload.")

            images = request.data.getlist('image')

            if len(images) > self.max_image_upload_limit:
                raise ValidationError(f"Exceeded maximum limit of {self.max_image_upload_limit} images per upload.")

            business = Business.objects.get(user=request.user)
            uploaded_images = []

            for image in images:
                serializer = BusinessImageDetailSerializer(data={'image': image})
                serializer.is_valid(raise_exception=True)
                serializer.save(user=request.user, business=business)
                uploaded_images.append(serializer.data)

            return Response({"message": "Images uploaded successfully", "data": uploaded_images}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "An error occurred while processing your request.", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            image = BusinessImage.objects.get(user=request.user, pk=pk)
            image.trash()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

'''
Business verification documents
'''

class BusinessDocumentView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            documents = BusinessDocument.objects.filter(user=request.user, is_trashed=False).order_by("-created_at")
            serializer = BusinessDocumentDetailSerializer(documents, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            serializer = BusinessDocumentDetailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            business = Business.objects.get(user=request.user)
            serializer.save(user=request.user, business=business)
            return Response({"message": "document uploaded successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            document = BusinessDocument.objects.get(user=request.user, pk=pk)
            document.trash()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

'''
Business owner identity documents
'''

class BusinessOwnerDocumentView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            documents = OwnerDocument.objects.filter(user=request.user, is_trashed=False).order_by("-created_at")
            serializer = BusinessOwnerDocumentDetailSerializer(documents, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request):
        try:
            serializer = BusinessOwnerDocumentDetailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            business = Business.objects.get(user=request.user)
            serializer.save(user=request.user, business=business)
            return Response({"message": "document uploaded successfully"},status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            document = OwnerDocument.objects.get(user=request.user, pk=pk)
            document.trash()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

'''
Business list and retrieve
'''

class BusinessListView(generics.ListAPIView):
    serializer_class = BusinessListSerializer

    def get_queryset(self):
        queryset = Business.objects.all()
        queryset = self.filter_queryset(queryset)
        queryset = self.order_queryset(queryset)
        return queryset

    def filter_queryset(self, queryset):
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset

    def order_queryset(self, queryset):
        order_by = self.request.query_params.get('order_by', 'created_at')
        return queryset.order_by(order_by)


class BusinessDetailsView(generics.RetrieveAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessDetailSerializer


# for listing
class ShopProductListView(generics.ListAPIView):
    queryset = ShopProduct.objects.all()
    serializer_class = ShopProductListSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset.order_by('created_at')
    

# for listing
class RestaurantProductListView(generics.ListAPIView):
    queryset = RestaurantProduct.objects.all()
    serializer_class = RestaurantProductListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset.order_by('created_at')


# for detailed info
class ShopProductDetailView(generics.RetrieveAPIView):
    queryset = ShopProduct.objects.all()
    serializer_class = ShopProductDetailSerializer

# for detailed info
class RestaurantProductDetailView(generics.RetrieveAPIView):
    queryset = RestaurantProduct.objects.all()
    serializer_class = RestaurantProductDetailSerializer


'''
Get list of cuisines and allergens
'''    

class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategoryListSerializer


class CuisineListView(generics.ListAPIView):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineListSerializer


class AllergenListView(generics.ListAPIView):
    queryset = Allergen.objects.all()
    serializer_class = AllergenListSerializer


class ProductCategoryDetailView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategoryDetailSerializer


class CuisineDetailView(generics.ListAPIView):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineDetailSerializer


# class AllergenDetailView(generics.ListAPIView):
#     queryset = Allergen.objects.all()
#     serializer_class = AllergenDetailSerializer


'''
Shop products
'''

class ShopProductView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    max_image_upload_limit = 6


    def post(self, request):
        try:
            print(request.data)
            business = Business.objects.get(user=request.user)
            if business.category != Business.BusinessCategory.SHOP:
                raise ValidationError("Please add shop product only")
            
            if 'images' not in request.data:
                raise ValidationError("No images provided for upload.")

            images = request.data.pop('images', [])

            if len(images) == 0 or len(images) > self.max_image_upload_limit:
                raise ValidationError(f"Exceeded maximum limit of {self.max_image_upload_limit} images per upload.")

            with transaction.atomic():
                # Serialize and save the product
                product_serializer = ShopProductSerializer(data=request.data)
                product_serializer.is_valid(raise_exception=True)
                product = product_serializer.save(business=business)

                # Serialize and save each image associated with the product
                for image in images:
                    image_serializer = ProductImageSerializer(data={'image': image})
                    image_serializer.is_valid(raise_exception=True)
                    image_serializer.save(business=business, product=product)

            serializer = ShopProductSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(business=business)
            return Response({"message": "product created successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            print(e)
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"message": "An error occurred while processing your request.", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    def get_serializer(self):
        return ShopProductSerializer()

'''
Restaurant product
'''

class RestaurantProductView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = [FormParser, MultiPartParser]
    max_image_upload_limit = 6


    def post(self, request):
        try:
            business = Business.objects.get(user=request.user)
            if business.category != Business.BusinessCategory.RESTAURANT:
                raise ValidationError("Please add restaurant product only")
            
            if 'images' not in request.data:
                raise ValidationError("No images provided for upload.")

            images = request.data.pop('images', [])

            if len(images) == 0 or len(images) > self.max_image_upload_limit:
                raise ValidationError(f"Exceeded maximum limit of {self.max_image_upload_limit} images per upload.")

            with transaction.atomic():
                # Serialize and save the product
                product_serializer = RestaurantProductSerializer(data=request.data)
                product_serializer.is_valid(raise_exception=True)
                product = product_serializer.save(business=business)

                # Serialize and save each image associated with the product
                for image in images:
                    image_serializer = ProductImageSerializer(data={'image': image})
                    image_serializer.is_valid(raise_exception=True)
                    image_serializer.save(business=business, product=product)
            
            return Response({"message": "product created successfully"}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            print(e)
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"message": "An error occurred while processing your request.", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_serializer(self):
        return RestaurantProductSerializer()

'''
Here we'll implement the openai data generating methods- start
'''

def generateContent(prompt: str):
    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return str(e)


class GenerateShopProductContentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            business = Business.objects.get(user=request.user)
            if business.category != Business.BusinessCategory.SHOP:
                raise ValidationError("Please only generate contents for shop products.")
            
            serializer = ShopProductContentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            prompt = serializer.validated_data
            content = generateContent(prompt)
            return Response({"content": content}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GenerateRestaurantProductContentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            business = Business.objects.get(user=request.user)
            if business.category != Business.BusinessCategory.RESTAURANT:
                raise ValidationError("Please only generate contents for restaurant products.")

            serializer = RestaurantProductContentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            prompt = serializer.validated_data
            content = generateContent(prompt)
            return Response({"content": content}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GenerateBusinessContentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            serializer = BusinessContentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            prompt = serializer.validated_data
            content = generateContent(prompt)
            return Response({"content": content}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def get_serializer(self):
        return BusinessContentSerializer()
    
'''
Content generation end
'''