from rest_framework.serializers import Serializer, ModelSerializer

from guard.models import Guard, WorkDetail, Shift


class ShiftSerializer(ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'
        read_only_fields = ['id']
# serializers.py
class WorkDetailSerializer(ModelSerializer):
    shifts = ShiftSerializer(many=True, required=False)

    class Meta:
        model = WorkDetail
        fields = ['id', 'detail', 'guard', 'shifts']

    def update(self, instance, validated_data):
        shifts_data = validated_data.pop('shifts', [])

        # Update WorkDetail fields
        instance.detail = validated_data.get('detail', instance.detail)
        instance.save()

        # Create or update shifts
        for shift_data in shifts_data:
            shift_id = shift_data.get('id', None)
            if shift_id:
                shift = Shift.objects.get(id=shift_id, work_detail=instance)
                shift.start_time = shift_data.get('start_time', shift.start_time)
                shift.end_time = shift_data.get('end_time', shift.end_time)
                shift.save()
            else:
                Shift.objects.create(work_detail=instance, **shift_data)

        return instance


class GuardSerializer(ModelSerializer):
    class Meta:
        model = Guard
        fields = ['name','phone_number','email','age','work_detail','password']
        read_only_fields = ['work_detail']
        kwargs = {
            'password': {'write_only': True},
        }
        def create(self, validated_data):
            work_detail = validated_data.pop('work_detail',{})
            guard = Guard.objects.create(**validated_data)
            WorkDetail.objects.create(guard=guard,**work_detail)
            return guard



