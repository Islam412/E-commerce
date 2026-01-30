from django.urls import path

from .api import ProductListAPI , ProductDetailAPI


app_name = 'products'


urlpatterns = [
    path('api/genariclist', ProductListAPI.as_view()),
    path('api/genariclist/<int:pk>', ProductDetailAPI.as_view()),
]