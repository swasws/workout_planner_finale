from django.db import models
from django.contrib.auth.models import User


class WorkoutType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    workout_type = models.ForeignKey(WorkoutType, on_delete=models.CASCADE, related_name="workouts")
    sets = models.PositiveIntegerField(default=1)
    reps = models.PositiveIntegerField(default=1)
    duration = models.PositiveIntegerField(default=0)
    additional_weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name


class WorkoutSchedule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workout_schedules")
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name="scheduled_workouts")
    date = models.DateField()
    time = models.TimeField()
    sets = models.PositiveIntegerField(default=1)
    reps = models.PositiveIntegerField(default=1)
    duration = models.PositiveIntegerField(default=0)
    additional_weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.workout.name} on {self.date} at {self.time}"
