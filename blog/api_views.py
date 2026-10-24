
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Post
from .serializers import PostSerializer


@api_view(['GET', 'POST'])
def post_list_api(request):

    # Get all blog posts
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-created_date')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    # Create a new blog post
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def post_detail_api(request, pk):

    post = get_object_or_404(Post, pk=pk)

    # Get one blog post
    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)

    # Update the complete blog post
    elif request.method == 'PUT':
        serializer = PostSerializer(
            post,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # Update selected fields only
    elif request.method == 'PATCH':
        serializer = PostSerializer(
            post,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # Delete a blog post
    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
