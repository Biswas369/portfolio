
from django.urls import path
from . import views
from . import api_views

app_name = 'blog'

urlpatterns = [
    # HTML pages
    path('', views.post_list, name='post_list'),
    path('create/', views.post_create, name='post_create'),
    path('<int:pk>/', views.post_detail, name='post_detail'),
    path('<int:pk>/edit/', views.post_update, name='post_update'),
    path('<int:pk>/delete/', views.post_delete, name='post_delete'),

    # REST API
    path('api/', api_views.post_list_api, name='post_list_api'),
    path('api/<int:pk>/', api_views.post_detail_api, name='post_detail_api'),
]
