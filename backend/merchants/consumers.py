import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try: 
            self.id = str(self.scope['url_route']['kwargs']['id'])
            self.room_group_name = f'b_{self.id}'

            if 'error' in self.scope:
                await self.send(text_data=json.dumps({'error': self.scope['error']}))
                await self.close()

            user_id = str(self.scope['user_id'])

            if user_id != self.id:
                await self.send(text_data=json.dumps({'error': 'Unauthorized access'}))
                await self.close()
            else:
                await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )
                await self.accept()
        except Exception as e:
            print(e)
            await self.close()

            
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Handle messages from the WebSocket
        await self.send(text_data=json.dumps({
            "message": "received your message",
            "data": text_data
        }))

    async def send_order_notification(self, event):
        await self.send(text_data=json.dumps(event))

    @sync_to_async
    def get_user(self):
        # You can fetch additional user details if needed
        pass
