# middleware.py
from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse
from rest_framework_simplejwt.authentication import JWTAuthentication

class RoleBasedMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        jwt_auth = JWTAuthentication()
        user, _ = jwt_auth.authenticate(request)

        if user is None:
            # Handle unauthenticated requests gracefully
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        # Check if the request is for user dashboard and the user is a merchant
        if request.path.startswith(reverse('user_dashboard')) and user.is_merchant:
            return JsonResponse({'error': 'Unauthorized'}, status=403)
        
        # Check if the request is for merchant actions and the user is not a merchant
        if request.path.startswith(reverse('merchant_actions')) and not user.is_merchant:
            return JsonResponse({'error': 'Unauthorized'}, status=403)

        # Pass the request to the next middleware or view
        response = self.get_response(request)
        return response
