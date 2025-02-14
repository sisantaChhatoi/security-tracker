from django.db import models
from guards.models import SecurityGuard

class Location(models.Model):
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.guard} at {self.latitude}, {self.longitude} on {self.timestamp}"
