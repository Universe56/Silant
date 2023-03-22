from rest_framework import serializers
from rest_framework.serializers import ReadOnlyField
from app.models import *
from django.contrib.auth.models import Group

AUTH_FIELDS = [
    "shipment_date",
    "buyer",
    "consignee",
    "delivery_adress",
    "additional_equipment",
    "service_company",
]


class LimitedCarSerializer(serializers.ModelSerializer):
    model_name = ReadOnlyField(source="model.name")
    model_description = ReadOnlyField(source="model.description")
    engine_model_name = ReadOnlyField(source="engine_model.name")
    engine_model_description = ReadOnlyField(source="engine_model.description")
    transmission_model_description = ReadOnlyField(
        source="transmission_model.description"
    )
    transmission_model_name = ReadOnlyField(source="transmission_model.name")
    driving_axle_model_description = ReadOnlyField(
        source="driving_axle_model.description"
    )
    driving_axle_model_name = ReadOnlyField(source="driving_axle_model.name")
    steering_axle_model_description = ReadOnlyField(
        source="steering_axle_model.description"
    )
    steering_axle_model_name = ReadOnlyField(source="steering_axle_model.name")

    class Meta:
        model = Car
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in AUTH_FIELDS:
            self.fields.pop(field)


class CarSerializer(serializers.ModelSerializer):
    model_name = ReadOnlyField(source="model.name")
    model_description = ReadOnlyField(source="model.description")
    engine_model_name = ReadOnlyField(source="engine_model.name")
    engine_model_description = ReadOnlyField(source="engine_model.description")
    transmission_model_description = ReadOnlyField(
        source="transmission_model.description"
    )
    transmission_model_name = ReadOnlyField(source="transmission_model.name")
    driving_axle_model_description = ReadOnlyField(
        source="driving_axle_model.description"
    )
    driving_axle_model_name = ReadOnlyField(source="driving_axle_model.name")
    steering_axle_model_description = ReadOnlyField(
        source="steering_axle_model.description"
    )
    steering_axle_model_name = ReadOnlyField(source="steering_axle_model.name")
    buyer_name = ReadOnlyField(source="buyer.name")
    buyer_description = ReadOnlyField(source="buyer.description")
    service_company_name = ReadOnlyField(source="service_company.name")
    service_company_description = ReadOnlyField(source="service_company.description")

    class Meta:
        model = Car
        fields = "__all__"


class MaitenanceSerializer(serializers.ModelSerializer):
    car_serial_number = ReadOnlyField(source="car.serial_number")
    car_buyer_name = ReadOnlyField(source="car.buyer.name")
    car_buyer_description = ReadOnlyField(source="car.buyer.description")
    service_company_name = ReadOnlyField(source="service_company.name")
    service_company_description = ReadOnlyField(source="service_company.description")
    type_name = ReadOnlyField(source="type.name")

    class Meta:
        model = Maitenance
        fields = "__all__"


class RepairSerializer(serializers.ModelSerializer):
    car_serial_number = ReadOnlyField(source="car.serial_number")
    car_buyer_name = ReadOnlyField(source="car.buyer.name")
    car_buyer_description = ReadOnlyField(source="car.buyer.description")
    service_company_name = ReadOnlyField(source="service_company.name")
    service_company_description = ReadOnlyField(source="service_company.description")
    method_name = ReadOnlyField(source="method.name")
    unit_name = ReadOnlyField(source="unit.name")

    class Meta:
        model = Repair
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "groups", "username"]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = "__all__"


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"


class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = "__all__"


class ManualSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manual
        fields = "__all__"
