from django.db import models

class Resident(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class IncidentReport(models.Model):
    resident = models.ForeignKey(Resident, on_delete=models.CASCADE)
    description = models.TextField()
    reported_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('resolved', 'Resolved')])

    def __str__(self):
        return f"Incident reported by {self.resident} - {self.status}"
