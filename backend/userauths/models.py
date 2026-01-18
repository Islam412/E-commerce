from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save  # create profile before creat user
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.utils.timezone import now
from django.contrib.auth import get_user_model

import uuid


from utils.generate_code import generate_code

# Create your models here.
