from django.shortcuts import render
from django.http import HttpRequest


# Create your views here.
def home(request: HttpRequest):
    context = {}
    return render(request, "home/index.html", context)
