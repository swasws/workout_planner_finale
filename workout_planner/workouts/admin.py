from django.contrib import admin
from .models import Workout, WorkoutSchedule, WorkoutType

@admin.register(WorkoutType)
class WorkoutTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # Показывать ID и название
    search_fields = ('name',)  # Поиск по названию


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'workout_type', 'description')  # Указываем только нужные поля
    search_fields = ('name', 'workout_type__name')  # Поиск по имени и типу тренировки
    list_filter = ('workout_type',)  # Фильтр по типу тренировки

    # Исключаем ненужные поля из формы в админке
    exclude = ('sets', 'reps', 'duration', 'additional_weight')  # Укажите поля, которые нужно скрыть


@admin.register(WorkoutSchedule)
class WorkoutScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'workout', 'date', 'time')  # Показывать ID, пользователя, тренировку, дату и время
    list_filter = ('date', 'user')  # Фильтр по дате и пользователю
    search_fields = ('user__email', 'workout__name')  # Поиск по email пользователя и названию тренировки
