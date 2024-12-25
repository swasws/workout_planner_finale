from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutTypeViewSet, WorkoutViewSet, WorkoutScheduleViewSet, TodayWorkoutsView

router = DefaultRouter()
router.register("workout-types", WorkoutTypeViewSet)
router.register("workouts", WorkoutViewSet)
router.register("workout-schedules", WorkoutScheduleViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("today-workouts/", TodayWorkoutsView.as_view(), name="today-workouts"),
]

