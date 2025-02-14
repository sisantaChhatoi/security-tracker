from django.urls import path,include
from . import views


urlpatterns = [
    path('/',views.GuardList),
    path('/<int:pk>',views.GuardDetail.as_view()),
    path('/work_detail/<int:pk>',views.WorkDetail.as_view()),
]