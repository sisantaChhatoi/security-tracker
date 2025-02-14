from django.db import models
from guards.models import SecurityGuard
from authentication.models import UserProfile

class VerificationRequest(models.Model):
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    requester = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')])
    requested_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Verification request for {self.guard} by {self.requester} - {self.status}"
