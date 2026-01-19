from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ElementViewSet, element_detail

router = DefaultRouter()
router.register(r'elements', ElementViewSet, basename='element')

urlpatterns = [
    path('', include(router.urls)),
    path('elements/<int:atomic_number>/', element_detail, name='element-detail'),
]
