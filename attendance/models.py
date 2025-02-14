from django.db import models
from guards.models import SecurityGuard

class Attendance(models.Model):
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    check_in_time = models.DateTimeField()
    check_out_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Attendance for {self.guard} - Checked in at {self.check_in_time}, Checked out at {self.check_out_time}"
