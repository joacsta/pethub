from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):
    class TipoUsuario(models.TextChoices):
        PESSOA_FISICA = ("PF", "Pessoa Física")
        ONG = ("ONG", "ONG/Abrigo")

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    tipo = models.CharField(
        max_length=3, choices=TipoUsuario.choices, default=TipoUsuario.PESSOA_FISICA
    )
    phone = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
