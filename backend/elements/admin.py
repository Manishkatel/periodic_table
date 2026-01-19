from django.contrib import admin
from .models import Element


@admin.register(Element)
class ElementAdmin(admin.ModelAdmin):
    list_display = ['atomic_number', 'symbol', 'name', 'category', 'group', 'period']
    list_filter = ['category', 'block', 'period', 'group']
    search_fields = ['name', 'symbol']