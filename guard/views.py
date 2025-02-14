from django.shortcuts import render
from django.urls import path,include
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import  APIView

from guard.models import Guard
from guard.serializers import GuardSerializer, WorkDetailSerializer
from .models import WorkDetail

# Create your views here.

class GuardDetail(APIView):


    def get(self, request, pk):
        queryset = Guard.objects.select_related('work_detail').get(pk=pk)
        serializer = GuardSerializer(instance=self.queryset)
        return Response(serializer.data)


class GuardList(APIView):
    def get(self, request):
        queryset = Guard.objects.all()
        serializer = GuardSerializer(instance=queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = GuardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class Workdetail(APIView):
    def get(self, request, pk):
        queryset = WorkDetail.objects.select_related('Shift').get(pk=pk)
        serializer = WorkDetailSerializer(instance=queryset)
        return Response(serializer.data)

    def post(self, request, pk):
        serializer = WorkDetailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        queryset = WorkDetail.objects.select_related('Shift').get(pk=pk)
        serializer = WorkDetailSerializer(instance=queryset, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


