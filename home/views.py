from django.shortcuts import render
from django.http import HttpRequest


# Create your views here.
def home(request: HttpRequest):
    context = {"title": "PetHub"}
    return render(request, "home/index.html", context)


def conceito(request: HttpRequest):
    context = {"title": "PetHub - Conceito"}
    return render(request, "home/conceito.html", context)


def historias(request: HttpRequest):
    context = {"title": "PetHub - Depoimentos"}
    return render(request, "home/historias.html", context)
