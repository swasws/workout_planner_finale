from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Workout, WorkoutSchedule, WorkoutType
from .serializers import WorkoutSerializer, WorkoutScheduleSerializer, WorkoutTypeSerializer
from datetime import date


class WorkoutTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkoutType.objects.all()
    serializer_class = WorkoutTypeSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class WorkoutScheduleViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSchedule.objects.all()
    serializer_class = WorkoutScheduleSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Возвращаем только тренировки текущего пользователя
        return WorkoutSchedule.objects.filter(user=self.request.user)




class TodayWorkoutsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()
        workouts = WorkoutSchedule.objects.filter(user=request.user, date=today)
        serializer = WorkoutScheduleSerializer(workouts, many=True)
        return Response(serializer.data)
