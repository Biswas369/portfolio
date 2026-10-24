from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'name', 'email', 'phone', 'age', 'course', 'status')
    search_fields = ('student_id', 'name', 'email', 'phone')
    list_filter = ('course', 'status')
    ordering = ('student_id',)
