from django.shortcuts import render
from .serializers import ToDoSerializer
from rest_framework import viewsets
from .models import ToDo

# Create your views here.

# View for handling GET and POST requests

class ToDoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()