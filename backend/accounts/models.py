import uuid
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone

from .managers import CustomUserManager

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):

    # These fields tie to the roles!
    class UserRole(models.TextChoices):
        BUSINESS = "business", "Business"
        USER = "user", "User"
        ADMIN =  "admin", "Admin"
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    # Roles created here
    id = models.UUIDField(unique=True, editable=False, primary_key=True, default=uuid.uuid4, verbose_name='Public identifier')
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    username = models.CharField(max_length=40, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, blank=False, default="")
    contact_number = models.CharField(max_length=15, default="")
    role = models.CharField(max_length=15, choices=UserRole.choices, blank=True, null=True, default=UserRole.USER)
    # date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # Hash the password before saving
        if self.password:
            self.set_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username