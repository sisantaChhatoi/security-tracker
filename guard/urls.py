from django.urls import path,include
from . import views


urlpatterns = [
   path('<int:pk>',views.GuardDetail.as_view()),
   path('',views.GuardList.as_view()),
]