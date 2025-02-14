from django.db import models
from guards.models import SecurityGuard
from authentication.models import UserProfile

class PerformanceReview(models.Model):
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comments = models.TextField()
    reviewed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.guard} by {self.reviewer} - Rating: {self.rating}"
