"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import path
from .jwt_middleware import JWTAUthMiddleware
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# application = get_asgi_application()

django_asgi_app = get_asgi_application()

from merchants.consumers import OrderConsumer

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": 
        JWTAUthMiddleware(
            URLRouter([
                path('ws/b/<uuid:id>/orders/', OrderConsumer.as_asgi()),
            ])
        # )
    ),
})
