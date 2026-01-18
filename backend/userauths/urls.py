from django.urls import path

from userauths import api


app_name = 'userauths'



urlpatterns = [
    # api
    path('api/<int:pk>/', api.UserRetrieveUpdateDestroyAPIView.as_view(), name='user_api_updc'),
    path('api/', api.UserListAPIView.as_view(), name='user_api_list'),
    path('api/create/', api.UserCreateAPIView.as_view(), name='user_api_create'),
    path('api/profile/', api.ProfileListAPIView.as_view(), name='profile_api_list'),
    path('api/profile/create/', api.ProfileCreateAPIView.as_view(), name='profile_api_create'),
    path('api/profile/update/<pk>/', api.ProfileUpdateAPIView.as_view(), name='profile_api_update'),
]
