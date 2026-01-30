from django.urls import path

from .api import ProductListAPI , ProductDetailAPI , BrandListAPI , BrandDetailAPI


app_name = 'products'


urlpatterns = [
    path('api/genariclist', ProductListAPI.as_view()),
    path('api/genariclist/<int:pk>', ProductDetailAPI.as_view()),
    path('api/brandlist', BrandListAPI.as_view()),
    path('api/brandetail/<int:pk>', BrandDetailAPI.as_view()),
]