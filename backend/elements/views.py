from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from .models import Element
from .serializers import ElementSerializer


class ElementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
    lookup_field = 'atomic_number'
    
    @method_decorator(cache_page(60 * 60))  # Cache for 1 hour
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(60 * 60))  # Cache for 1 hour
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


@api_view(['GET'])
@cache_page(60 * 60)  # Cache for 1 hour
def element_detail(request, atomic_number):
    try:
        element = Element.objects.get(atomic_number=atomic_number)
        serializer = ElementSerializer(element)
        response = Response(serializer.data)
        # Add cache headers
        response['Cache-Control'] = 'public, max-age=3600'  # 1 hour
        response['ETag'] = f'"{element.atomic_number}-{hash(element)}"'
        return response
    except Element.DoesNotExist:
        return Response(
            {'error': 'Element not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )