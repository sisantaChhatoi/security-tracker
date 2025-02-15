from rest_framework.views import APIView
from rest_framework.response import  Response
from .models import Guard
from .serializers import GuardSerializer


class GuardDetail(APIView):
    def get(self,request,pk):
        guard = Guard.objects.get(pk=pk)
        serializer = GuardSerializer(guard)
        return Response(serializer.data)


class GuardList(APIView):
    def get(self,request):
        guard = Guard.objects.all()
        serializer = GuardSerializer(guard, many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = GuardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
