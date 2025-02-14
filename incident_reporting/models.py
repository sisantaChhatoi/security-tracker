from django.db import models
from guards.models import SecurityGuard
from authentication.models import UserProfile

class IncidentReport(models.Model):
    reported_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    description = models.TextField()
    reported_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('resolved', 'Resolved')])

    def __str__(self):
        return f"Incident reported by {self.reported_by} for {self.guard} - {self.status}"

