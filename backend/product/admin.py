from django.contrib import admin
from .models import Product, ProductImage,Brand,Review

# Register your models here.

# admin many image of product in same product
class ProductImageTabular(admin.TabularInline):
    model = ProductImage
