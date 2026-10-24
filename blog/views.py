from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q

from .models import Post
from .forms import PostForm


def post_list(request):
    query = request.GET.get('q', '').strip()
    category = request.GET.get('category', '').strip()

    posts = Post.objects.all().order_by('-created_date')

    if query:
        posts = posts.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(content__icontains=query)
        )

    if category:
        posts = posts.filter(category__iexact=category)

    categories = (
        Post.objects.order_by('category')
        .values_list('category', flat=True)
        .distinct()
    )

    return render(request, 'blog/post_list.html', {
        'posts': posts,
        'query': query,
        'category': category,
        'categories': categories,
    })


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)

    return render(request, 'blog/post_detail.html', {
        'post': post,
    })


def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('blog:post_list')
    else:
        form = PostForm()

    return render(request, 'blog/post_form.html', {
        'form': form,
        'title': 'Create Blog Post',
    })


def post_update(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)

        if form.is_valid():
            form.save()
            return redirect('blog:post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)

    return render(request, 'blog/post_form.html', {
        'form': form,
        'title': 'Edit Blog Post',
        'post': post,
    })


def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'POST':
        if post.image:
            post.image.delete(save=False)
        post.delete()
        return redirect('blog:post_list')

    return render(request, 'blog/post_confirm_delete.html', {
        'post': post,
    })
