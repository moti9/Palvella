# Import from rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Import from rest_framework_simplejwt
# Import from others
from django.shortcuts import render
# Custom import

# Create your views here.

class HomeView(APIView):
    def get(selg, request):
        return Response({"message": "welcome to users views"}, status=status.HTTP_200_OK)
