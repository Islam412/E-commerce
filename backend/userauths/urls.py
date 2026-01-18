from django.urls import path

from userauths import api


app_name = 'userauths'



urlpatterns = [
    # api
    path('api/<int:pk>/', api.UserRetrieveUpdateDestroyAPIView.as_view(), name='user_api_updc'),
]