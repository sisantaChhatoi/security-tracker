from django.db import models




class Shift(models.Model):
    period = models.CharField(max_length=20,choices=[{'M':'Morning','N':'Night'}], default='Morning')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    work_detail = models.ForeignKey('WorkDetail', on_delete=models.CASCADE)



class WorkDetail(models.Model):
    past_experience = models.TextField(max_length=500,null=True,blank=True)
    rating = models.DecimalField(decimal_places=1, max_digits=1,null=True,blank=True)



class Guard(models.Model):

    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=11)
    email = models.EmailField(null=True)
    age = models.IntegerField()
    password = models.CharField(max_length=100)
    address = models.TextField(max_length=500)
    work_detail = models.OneToOneField('WorkDetail', on_delete=models.CASCADE, null=True,blank=True)
