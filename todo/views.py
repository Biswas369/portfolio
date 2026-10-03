from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Todo


def todo(request):
    todos = Todo.objects.all()
    return render(request, 'todo/index.html', {'todos': todos})


def todo_add(request):
    if request.method == 'POST':
        title = request.POST.get('title')

        if title:
            Todo.objects.create(title=title)

        return redirect('todo')

    return render(request, 'todo/add.html')


def todo_edit(request, id):
    todo_item = Todo.objects.get(id=id)

    if request.method == 'POST':
        title = request.POST.get('title')

        if title:
            todo_item.title = title
            todo_item.save()

        return redirect('todo')

    return render(request, 'todo/edit.html', {'todo': todo_item})


def todo_delete(request, id):
    todo_item = Todo.objects.get(id=id)
    todo_item.delete()

    return redirect('todo')


def todo_complete(request, id):
    todo_item = Todo.objects.get(id=id)

    todo_item.complete = not todo_item.complete
    todo_item.save()

    return JsonResponse({
        'success': True,
        'complete': todo_item.complete
    })