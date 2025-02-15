from rest_framework import serializers

from guard.models import Guard


class GuardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guard
        fields = ['name','phoneNum','email','age','password','address','work_detail']

    # work_detail = serializers.PrimaryKeyRelatedField(queryset=Guard.objects.all())
