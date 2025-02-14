from django.db import models
from guards.models import SecurityGuard

class Assignment(models.Model):
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.guard} assigned to {self.location} from {self.start_time} to {self.end_time}"
