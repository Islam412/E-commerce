from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters

from .serializers import ProductListSerializers , ProductDetailSerializers , BrandListSerializers , BrandDetailSerializers , ProductImageSerializer
from .models import Product , Brand , ProductImage
from .myfilter import ProductFilter


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductListAPI(generics.ListCreateAPIView):  # list show all dsta | create update data
    queryset = Product.objects.all()
    serializer_class = ProductListSerializers
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = ['flag', 'brand']
    search_fields = ['name', 'descripition']
    ordering_fields = ['price', 'quantity']
    filterset_class = ProductFilter
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]


class ProductDetailAPI(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializers
    permission_classes = [IsAuthenticated]


class BrandListAPI(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandListSerializers
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]


class BrandDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandDetailSerializers
    permission_classes = [IsAuthenticated]


class ProductImageCreateAPI(generics.CreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated]