from typing import Any
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from accounts.models import User
from urllib.parse import parse_qs

class JWTAUthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        token = self.get_token_from_scope(scope)
        # print(scope)
        if token is not None:
            user_id = await self.get_user_from_token(token)
            if user_id:
                scope["user_id"] = user_id
            else:
                scope["error"] = "unauthorized access"
        else:
            scope["error"] = "provide an auth token"
        
        return await super().__call__(scope, receive, send)

    def get_token_from_scope(self, scope):
        # headers = dict(scope.get("headers", {}))
        # token_header = headers.get(b'authorization', b'').decode('utf-8')
        # if token_header.startswith('JWT'):
        #     token = token_header.split(' ')[1]
        #     return token
        query_string = parse_qs(scope['query_string'].decode())
        token = query_string.get('token', [None])[0]
        return token

    @database_sync_to_async
    def get_user_from_token(self, token):
        try:
            access_token = AccessToken(token)
            user_id = access_token["user_id"]
            user = User.objects.get(id=user_id)
            if user and user.role == User.UserRole.BUSINESS:
                return user.id
            return None
        except Exception as e:
            return None
