from django.db import models

class SecurityGuard(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    past_work_history = models.TextField()
    current_deployment = models.ForeignKey('assignments.Assignment', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Certification(models.Model):
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    certification_name = models.CharField(max_length=100)
    issued_by = models.CharField(max_length=100)
    issue_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.certification_name} for {self.guard}"

class EmergencyContact(models.Model):
    guard = models.ForeignKey(SecurityGuard, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)


    def __str__(self):
        return f"Emergency Contact for {self.guard}: {self.name} ({self.relationship})"
