
from django.urls import path
from . import views, api_views

app_name = 'students'

urlpatterns = [
    # HTML pages
    path('', views.student_list, name='student_list'),
    path('add/', views.student_create, name='student_create'),
    path('edit/<int:pk>/', views.student_update, name='student_update'),
    path('delete/<int:pk>/', views.student_delete, name='student_delete'),

    # REST API
    path('api/', api_views.student_list_api, name='student_list_api'),
    path('api/<int:pk>/', api_views.student_detail_api, name='student_detail_api'),
]
