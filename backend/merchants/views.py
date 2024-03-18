# Import from rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
# Import from rest_framework_simplejwt
# Import from others
from django.shortcuts import render
from .models import Business, ShopProduct, RestaurantProduct
from .serializers import BusinessRegisterSerializer, BusinessSerializer, BusinessListSerializer, BusinessDetailSerializer, ShopProductSerializer, RestaurantProductSerializer, ShopProductListSerializer, RestaurantProductListSerializer
# Custom import

# Create your views here.

class HomeView(APIView):
    def get(self, request):
        return Response({"message": "welcome to merchants views"}, status=status.HTTP_200_OK)
    

class BusinessRegistrationView(APIView):
    def post(self, request, format=None):
        try:
            # print(request.data)
            serializer = BusinessRegisterSerializer(data=request.data)
            if serializer.is_valid():
                business = serializer.save()
                return Response(BusinessSerializer(business).data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response("An unexpected error occurred.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_serializer(self, *args, **kwargs):
        return BusinessRegisterSerializer(*args, **kwargs)
    

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
    serializer_class = ShopProductSerializer

# for detailed info
class RestaurantProductDetailView(generics.RetrieveAPIView):
    queryset = RestaurantProduct.objects.all()
    serializer_class = RestaurantProductSerializer


# class BusinessSearchView(APIView):
#     def get(self, request):
#         try:
#             # Get the query parameters from the URL
#             search_query = request.query_params.get('search', None)
#             pincode = request.query_params.get('pincode', None)
#             business_type = request.query_params.get('type', None)

#             # Initialize the queryset with all businesses
#             businesses = Business.objects.all()

#             # Filter businesses by search query
#             if search_query:
#                 businesses = businesses.filter(name__icontains=search_query)

#             # Filter businesses by pincode
#             if pincode:
#                 businesses = businesses.filter(service_available_at__postal_code=pincode)

#             # Filter businesses by type
#             if business_type:
#                 businesses = businesses.filter(category=business_type)

#             # Serialize the businesses data
#             serializer = BusinessSerializer(businesses, many=True)

#             # Return the serialized data as a JSON response
#             return Response(serializer.data)
#         except Exception as e:
#             return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
#     def get_serializer(self, *args, **kwargs):
#         return BusinessSerializer(*args, **kwargs)