from django.test import TestCase
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Business, BusinessAddress, BusinessImage, BusinessDocument, OwnerDocument
from .serializers import BusinessRegisterSerializer

class BusinessRegisterSerializerTestCase(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.get(username='testuser1', password='User@1234')

        # Prepare data for serialization
        self.business_data = {
            'name': 'Test Business',
            'category': 'shop',
            'contact_number': '1234567890',
            'email': 'test@example.com',
            'description': 'This is a test business',
            'service_available_at': ['12345', '67890'],  # Example postal codes
        }

        self.address_data = {
            'address_line1': '123 Test Street',
            'city': 'Test City',
            'state': 'Test State',
            'postal_code': '12345',
            'country': 'Test Country',
        }

        # Prepare image data (a sample image file)
        self.image_file = SimpleUploadedFile("test_image.jpg", b"file_content", content_type="image/jpeg")
        self.image_data = {
            'image': self.image_file
        }

        # Prepare document data (a sample document file)
        self.document_file = SimpleUploadedFile("test_document.pdf", b"file_content", content_type="application/pdf")
        self.document_data = {
            'document': self.document_file
        }

    def test_create_business_with_related_objects(self):
        serializer = BusinessRegisterSerializer(data={
            'business': self.business_data,
            'address': self.address_data,
            'images': self.image_data,
            'business_document': self.document_data,
            'owner_document': self.document_data,
        })

        self.assertTrue(serializer.is_valid())
        business = serializer.save(owner=self.user)

        # Check if the business object and related objects are created correctly
        self.assertIsNotNone(business)
        self.assertEqual(Business.objects.count(), 1)
        self.assertEqual(BusinessAddress.objects.count(), 1)
        self.assertEqual(BusinessImage.objects.count(), 1)
        self.assertEqual(BusinessDocument.objects.count(), 1)
        self.assertEqual(OwnerDocument.objects.count(), 1)

        # Check the attributes of the created objects
        self.assertEqual(business.name, 'Test Business')
        self.assertEqual(business.category, 'shop')
        self.assertEqual(business.contact_number, '1234567890')
        self.assertEqual(business.email, 'test@example.com')
        self.assertEqual(business.description, 'This is a test business')
        self.assertEqual(business.service_available_at.count(), 2)  # Two postal codes added
