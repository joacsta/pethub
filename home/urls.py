from django.urls import path

from . import views

app_name = "home"


urlpatterns = [
    path("", views.home, name="home"),
    path("conceito/", views.conceito, name="conceito"),
    path("depoimentos/", views.historias, name="depoimentos"),
]
