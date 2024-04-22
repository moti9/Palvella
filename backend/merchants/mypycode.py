'''
api_key='...'

import google.generativeai as genai
import asyncio
from .views import generateContent

genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-pro')

product_name="Ice cream"
product_code = "ICECREAM0001"

# prompt = f"Generate meta_data for the product: {product_name} with product code: {product_code}. More info:"

prompt = f"Generate a description for the product: {product_name} with product code: {product_code}. Description:"

response = asyncio.run(generateContent(prompt))
print(response.text)

'''

