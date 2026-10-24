from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'author',
        'category',
        'created_date',
        'updated_date',
    )

    search_fields = ('title', 'author', 'category')
    list_filter = ('category', 'created_date')
    ordering = ('-created_date',)