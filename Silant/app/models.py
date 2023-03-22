from django.db import models
from django.contrib.auth.models import User


class ServiceCompany(models.Model):
    class Meta:
        verbose_name = "Сервисная организация"
        verbose_name_plural = "Сервисные организации"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField(unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Client(models.Model):
    class Meta:
        verbose_name = "Клиент"
        verbose_name_plural = "Клиенты"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField(unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Manager(models.Model):
    class Meta:
        verbose_name = "Менеджер"
        verbose_name_plural = "Менеджеры"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField(unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Manual(models.Model):
    class ManualType(models.TextChoices):
        CAR_MODEL = "Модель техники"
        ENINGE_MODEL = "Двигатель"
        TRANSMISSION_MODEL = "Трансмиссия"
        DRIVING_AXLE_MODEL = "Ведущий мост"
        STEERING_AXLE_MODEL = "Управляемый мост"
        MAITENANCE_TYPE = "Тип ТО"
        MAITENANCE_PROVIDER = "Компания"
        REPAIR_METHOD = "Способ восстановления"
        REPAIR_UNIT = "Узел отказа"

    class Meta:
        verbose_name = "Справочник"
        verbose_name_plural = "Справочники"

    name = models.TextField(unique=True)
    description = models.TextField(null=True, blank=True)
    manual_type = models.CharField(
        max_length=50, choices=ManualType.choices, blank=False, null=False
    )


class Car(models.Model):
    class Meta:
        ordering = ["shipment_date"]
        verbose_name = "Машина"
        verbose_name_plural = "Машины"

    model = models.ForeignKey(
        Manual,
        on_delete=models.CASCADE,
        verbose_name="Модель техники",
        related_name="manual_model",
    )

    serial_number = models.TextField(verbose_name="Зав. № машины", unique=True)
    engine_model = models.ForeignKey(
        Manual,
        on_delete=models.CASCADE,
        verbose_name="Модель двигателя",
        related_name="manual_engine_model",
    )
    engine_serial_number = models.TextField(verbose_name="Зав. № двигателя")
    transmission_model = models.ForeignKey(
        Manual,
        on_delete=models.CASCADE,
        verbose_name="Модель трансмиссии",
        related_name="manual_transmission_model",
    )
    transmission_serial_number = models.TextField(verbose_name="Зав. № трансмиссии")
    driving_axle_model = models.ForeignKey(
        Manual,
        on_delete=models.CASCADE,
        verbose_name="Модель ведущего моста",
        related_name="manual_driving_axle_model",
    )
    driving_axle_serial_number = models.TextField(verbose_name="Зав. № ведущего моста")
    steering_axle_model = models.ForeignKey(
        Manual,
        on_delete=models.CASCADE,
        verbose_name="Модель управляемого моста",
        related_name="manual_steering_axle_model",
    )
    steering_axle_serial_number = models.TextField(
        verbose_name="Зав. № управляемого моста"
    )
    shipment_date = models.DateField(verbose_name="Дата отгрузки с завода")
    buyer = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        verbose_name="Покупатель",
    )
    consignee = models.TextField(verbose_name="Грузополучатель (конечный потребитель)")
    delivery_adress = models.TextField(verbose_name="Адрес поставки (эксплуатации)")
    additional_equipment = models.TextField(verbose_name="Комплектация (доп. опции)")
    service_company = models.ForeignKey(
        ServiceCompany, on_delete=models.CASCADE, verbose_name="Сервисная компания"
    )

    def __str__(self) -> str:
        return self.serial_number


class Maitenance(models.Model):
    class Meta:
        ordering = ["date"]
        verbose_name = "ТО"
        verbose_name_plural = "ТО"

    type = models.ForeignKey(
        Manual,
        on_delete=models.CASCADE,
        verbose_name="Вид ТО",
        related_name="maitenance_type",
    )
    date = models.DateField(verbose_name="Дата проведения ТО")
    operating_time = models.IntegerField(verbose_name="Наработка, м/час")
    contract_serial_number = models.TextField(
        verbose_name="№ заказ-наряда", unique=True
    )
    contract_date = models.DateField(verbose_name="Дата заказ-наряда")
    self_maitenance = models.BooleanField(
        verbose_name="Самостоятельное проведение ТО", default=False
    )
    provider = models.ForeignKey(
        Manual,
        on_delete=models.CASCADE,
        verbose_name="Организация, проводившая ТО",
        related_name="maitenance_provider",
        null=True,
    )
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name="Зав. № машины")
    service_company = models.ForeignKey(
        ServiceCompany,
        related_name="maitenance_service_company",
        on_delete=models.CASCADE,
        verbose_name="Сервисная компания",
        null=True,
    )

    def __str__(self):
        return f"{self.date} | {self.car} -- {self.service_company}"

    # Automatically assign the correct service company and provider
    def save(self, *args, **kwargs):
        if self.self_maitenance == True:
            self_provider = Manual.objects.get(name="самостоятельно")
            self.provider = self_provider
        if self.service_company == None:
            self.service_company = self.car.service_company
        super(Maitenance, self).save(*args, **kwargs)


class Repair(models.Model):
    class Meta:
        verbose_name = "Рекламация"
        verbose_name_plural = "Рекламации"

    issue_date = models.DateField(verbose_name="Дата отказа")
    operating_time = models.IntegerField(verbose_name="Наработка, м/час")
    unit = models.ForeignKey(
        Manual,
        on_delete=models.DO_NOTHING,
        verbose_name="Узел отказа",
        related_name="repair_unit",
    )
    description = models.TextField(verbose_name="Описание отказа")
    method = models.ForeignKey(
        Manual,
        on_delete=models.DO_NOTHING,
        verbose_name="Способ восстановления",
        related_name="repair_method",
    )
    repair_parts = models.TextField(
        verbose_name="Используемые запасные части", null=True, blank=True
    )
    completion_date = models.DateField(
        null=True, blank=True, verbose_name="Дата восстановления"
    )
    # ⬇ completion_date - issue_date
    repair_time = models.IntegerField(
        verbose_name="Время простоя техники", blank=True, null=True, default=0
    )
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name="Машина")
    service_company = models.ForeignKey(
        ServiceCompany,
        on_delete=models.CASCADE,
        verbose_name="Сервисная компания",
        null=True,
    )

    # Automatically assign the correct service company and repair date
    def save(self, *args, **kwargs):
        if self.service_company == None:
            self.service_company = self.car.service_company
        if self.completion_date != None:
            self.repair_time = (self.completion_date - self.issue_date).days

        super(Repair, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.issue_date} | Машина: {self.car} -- {self.service_company}"
