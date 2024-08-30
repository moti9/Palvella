# Import from rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Import from rest_framework_simplejwt
# Import from others
from django.shortcuts import render
# Custom import
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Create your views here.

class HomeView(APIView):
    def get(selg, request):
        return Response({"message": "welcome to users views"}, status=status.HTTP_200_OK)
    

'''Order place'''


class PlaceOrderView(APIView):
    # Your order placement logic
    def post(self, request):
        # Send notification to the merchant
        
        channel_layer = get_channel_layer()
        merchant_id = request.data.get("merchant_id")  # Adjust according to your model
        async_to_sync(channel_layer.group_send)(
            f'b_{merchant_id}',
            {
                'type': 'send_order_notification',
                'order_id': str("abc-def-ghi"),
                'order_details': 'Your order details here',
                'role': 'merchant'
            }
        )
        return Response("Order placed")


