"""
URL configuration for periodic_table_api project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('elements.urls')),
]