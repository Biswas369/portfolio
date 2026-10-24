from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from .models import Student
from .forms import StudentForm


def student_list(request):
    query = request.GET.get('q', '').strip()

    students = Student.objects.all().order_by('student_id')

    if query:
        students = students.filter(
            Q(name__icontains=query) |
            Q(student_id__icontains=query) |
            Q(email__icontains=query) |
            Q(phone__icontains=query) |
            Q(course__icontains=query)
        )

    return render(request, 'students/student_list.html', {
        'students': students,
        'query': query,
    })


def student_create(request):
    if request.method == 'POST':
        form = StudentForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('students:student_list')
    else:
        form = StudentForm()

    return render(request, 'students/student_form.html', {
        'form': form,
        'title': 'Add Student',
    })


def student_update(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == 'POST':
        form = StudentForm(request.POST, instance=student)

        if form.is_valid():
            form.save()
            return redirect('students:student_list')
    else:
        form = StudentForm(instance=student)

    return render(request, 'students/student_form.html', {
        'form': form,
        'title': 'Update Student',
    })


def student_delete(request, pk):
    student = get_object_or_404(Student, pk=pk)

    if request.method == 'POST':
        student.delete()
        return redirect('students:student_list')

    return render(request, 'students/student_confirm_delete.html', {
        'student': student,
    })
