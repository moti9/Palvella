# Import from rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Import from rest_framework_simplejwt
# Import from others
from django.shortcuts import render
from .models import Business
from .serializers import BusinessSerializer
# Custom import

# Create your views here.

class HomeView(APIView):
    def get(self, request):
        return Response({"message": "welcome to merchants views"}, status=status.HTTP_200_OK)
    

    

class BusinessSearchAPIView(APIView):
    def get(self, request):
        try:
            # Get the query parameters from the URL
            search_query = request.query_params.get('search', None)
            pincode = request.query_params.get('pincode', None)
            business_type = request.query_params.get('type', None)

            # Initialize the queryset with all businesses
            businesses = Business.objects.all()

            # Filter businesses by search query
            if search_query:
                businesses = businesses.filter(name__icontains=search_query)

            # Filter businesses by pincode
            if pincode:
                businesses = businesses.filter(service_available_at__postal_code=pincode)

            # Filter businesses by type
            if business_type:
                businesses = businesses.filter(category=business_type)

            # Serialize the businesses data
            serializer = BusinessSerializer(businesses, many=True)

            # Return the serialized data as a JSON response
            return Response(serializer.data)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_serializer(self, *args, **kwargs):
        return BusinessSerializer(*args, **kwargs)