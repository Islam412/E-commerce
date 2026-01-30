from django.urls import path

from .api import ProductListAPI


app_name = 'products'


urlpatterns = [
    path('api/genariclist', ProductListAPI.as_view()),
]