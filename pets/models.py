from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Pet(models.Model):
    class Especie(models.TextChoices):
        DOG = ("Cachorro", "CAO")
        CAT = ("Gato", "GATO")
        OUTRO = ("Outro", "OUTRO")

    class Porte(models.TextChoices):
        PEQUENO = ("P", "Pequeno")
        MEDIO = ("M", "Médio")
        GRANDE = ("G", "Grande")

    class Sexo(models.TextChoices):
        macho = "M", "Macho"
        femea = "F", "Fêmea"

    class Status(models.TextChoices):
        DISPONIVEL = "DISPONIVEL", "Disponivel"
        ADOTADO = "ADOTADO", "Adotado"

    doador = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="pet_doados"
    )
    nome = models.CharField(max_length=100)
    # especie = models.CharField(max_length=5, choices=Especie.choices)
    raca = models.CharField(max_length=5, blank=True)
    idade = models.PositiveIntegerField(null=True, blank=True)
    porte = models.CharField(max_length=1, choices=Porte.choices)
    sexo = models.CharField(max_length=1, choices=Sexo.choices)

    castrado = models.BooleanField(default=False)
    vacinado = models.BooleanField(default=False)
    vermifugado = models.BooleanField(default=False)
    necessidades = models.BooleanField(blank=True)

    descricao = models.TextField(blank=True)
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.DISPONIVEL
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome


# class FotoPet(models.Model):
#     pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="pedidos")
#     interessado = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="pedidos feitos"
#     )
#     status = models.CharField(
#         max_length=10, choices=Status.choices, default=Status.DISPONIVEL
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#
#     class Meta:
#         unique_together = ("pet", "interessado")
#
#     def __str__(self):
#         return f"{self.interessado} -> {self.pet} ({self.status})"
