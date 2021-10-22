from rest_framework import serializers
from .models import ToDo

 #Specifies the model and fields to be returned

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('id', 'task','completed')