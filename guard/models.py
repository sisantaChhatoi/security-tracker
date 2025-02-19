from django.db import models



class Guard(models.Model):

    name = models.CharField(max_length=100)
    phoneNum = models.CharField(max_length=11,unique=True)
    email = models.EmailField(null=True)
    age = models.IntegerField()
    password = models.CharField(max_length=100)
    address = models.TextField(max_length=500)
    # work_detail = models.OneToOneField('WorkDetail',on_delete=models.CASCADE)

class Shift(models.Model):
    period = models.CharField(max_length=20,choices=[{'M':'Morning','N':'Night'}], default='Morning')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    guard = models.ForeignKey(Guard,on_delete=models.CASCADE)



class WorkDetail(models.Model):
    past_experience = models.TextField(max_length=500,
                                        null=True,blank=True)
    rating = models.DecimalField(max_digits=2,decimal_places=1)
    guard = models.OneToOneField('Guard',on_delete=models.CASCADE)


