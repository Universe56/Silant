import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Silant.settings")
from django import setup

lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

setup()
import random
import string
from app.models import *
from django.contrib.auth.models import User, Group, Permission
from openpyxl import load_workbook
from django.db import IntegrityError
from django.contrib.contenttypes.models import ContentType


wb = load_workbook(filename="data.xlsx")
car = wb["машины"]
mtn = wb["ТО output"]
rec = wb["рекламация output"]
car_usr = range(4, 14)
rep_range = range(3, 15)
mtn_range = range(2, 38)

client_permissions = [
    # car
    "view_car",
    "view_client",
    "view_servicecompany"
    # repairs
    "view_repair",
    # maitenance
    "view_maitenance",
    "add_maitenance",
    "change_maitenance",
]

service_permissions = [
    # car
    "view_car",
    "view_client",
    "view_servicecompany"
    # repairs
    "view_repair",
    "add_repair",
    "change_repair",
    # maitenance
    "view_maitenance",
    "add_maitenance",
    "change_maitenance",
]

manager_models = [
    ContentType.objects.get_for_model(Client),
    ContentType.objects.get_for_model(ServiceCompany),
    ContentType.objects.get_for_model(Car),
    ContentType.objects.get_for_model(Repair),
    ContentType.objects.get_for_model(Maitenance),
    ContentType.objects.get_for_model(Manual),
]


def init_groups():
    client_group = Group.objects.create(name="client")
    manager_group = Group.objects.create(name="manager")
    service_group = Group.objects.create(name="service company")
    print("Groups created")
    return client_group, manager_group, service_group


c, m, s = init_groups()


def init_group_permissions():
    for perm in client_permissions:
        perms = Permission.objects.filter(codename=perm)
        for perm in perms.iterator():
            c.permissions.add(perm)

    for perm in service_permissions:
        perms = Permission.objects.filter(codename=perm)
        for perm in perms.iterator():
            s.permissions.add(perm)

    for model in manager_models:
        post = Permission.objects.filter(content_type=model)
        for permission in post:
            m.permissions.add(permission)
    print("Permissions assigned")


def init_superuser():
    try:
        User.objects.create_superuser(username="admin", password="admin")
        print("Superuser created")
    except IntegrityError:
        pass


def random_string():
    characters = string.ascii_letters + string.digits
    result = "".join(random.choice(characters) for i in range(1, 16))
    return result


def init_car_manuals():
    # car parts
    for i in car_usr:
        try:
            Manual.objects.create(
                name=car[f"B{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.CAR_MODEL,
            )
        except IntegrityError:
            pass
        try:
            Manual.objects.create(
                name=car[f"D{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.ENINGE_MODEL,
            )
        except IntegrityError:
            pass
        try:
            Manual.objects.create(
                name=car[f"F{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.TRANSMISSION_MODEL,
            )
        except IntegrityError:
            pass
        try:
            Manual.objects.create(
                name=car[f"H{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.DRIVING_AXLE_MODEL,
            )
        except IntegrityError:
            pass
        try:
            Manual.objects.create(
                name=car[f"J{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.STEERING_AXLE_MODEL,
            )
        except IntegrityError:
            pass
    print("Car manuals created")


def init_users():
    for i in car_usr:
        try:
            user = User.objects.create(
                username="c_" + random_string().lower(),
            )
            user.save()
            user.groups.add(c)
            user.set_password("password")
            # user.set_password(random_string())
            user.save()
            Client.objects.create(name=car[f"M{i}"].value, user=user, description=lorem)
        except IntegrityError:
            pass
        try:
            user = User.objects.create(
                username="s_" + random_string().lower(),
            )
            user.save()
            user.groups.add(s)
            user.set_password("password")
            # user.set_password(random_string())
            user.save()
            ServiceCompany.objects.create(
                name=car[f"Q{i}"].value, user=user, description=lorem
            )
        except IntegrityError:
            pass
    print("Users created")


def init_repair_manuals():
    for i in rep_range:
        try:
            Manual.objects.create(
                name=rec[f"D{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.REPAIR_UNIT,
            )
        except IntegrityError:
            pass
        try:
            Manual.objects.create(
                name=rec[f"F{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.REPAIR_METHOD,
            )
        except IntegrityError:
            pass
    print("Repair manuals created")


def init_maitenance_manuals():
    for i in mtn_range:
        try:
            Manual.objects.create(
                name=mtn[f"B{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.MAITENANCE_TYPE,
            )
        except IntegrityError:
            pass
        try:
            Manual.objects.create(
                name=mtn[f"G{i}"].value,
                description=lorem,
                manual_type=Manual.ManualType.MAITENANCE_PROVIDER,
            )
        except IntegrityError:
            pass
    print("Maitenance manuals created")


def init_cars():
    try:
        for i in car_usr:
            Car.objects.create(
                model=Manual.objects.get(name=car[f"B{i}"].value),
                serial_number=car[f"C{i}"].value,
                engine_model=Manual.objects.get(name=car[f"D{i}"].value),
                engine_serial_number=car[f"E{i}"].value,
                transmission_model=Manual.objects.get(name=car[f"F{i}"].value),
                transmission_serial_number=car[f"G{i}"].value,
                driving_axle_model=Manual.objects.get(name=car[f"H{i}"].value),
                driving_axle_serial_number=car[f"I{i}"].value,
                steering_axle_model=Manual.objects.get(name=car[f"J{i}"].value),
                steering_axle_serial_number=car[f"K{i}"].value,
                shipment_date=car[f"L{i}"].value,
                buyer=Client.objects.get(name=car[f"M{i}"].value),
                consignee=car[f"N{i}"].value,
                delivery_adress=car[f"O{i}"].value,
                additional_equipment=car[f"P{i}"].value,
                service_company=ServiceCompany.objects.get(name=car[f"Q{i}"].value),
            )
    except IntegrityError:
        pass
    print("Cars created")


def init_maitenance():
    for i in mtn_range:
        car = Car.objects.get(serial_number=mtn[f"A{i}"].value)
        if mtn[f"G{i}"].value == "самостоятельно":
            p = Manual.objects.get(name="самостоятельно")
            s = True
        else:
            p = Manual.objects.get(name=mtn[f"G{i}"].value)
            s = False
        try:
            Maitenance.objects.create(
                type=Manual.objects.get(name=mtn[f"B{i}"].value),
                date=mtn[f"C{i}"].value,
                operating_time=mtn[f"D{i}"].value,
                contract_serial_number=mtn[f"E{i}"].value,
                contract_date=mtn[f"F{i}"].value,
                self_maitenance=s,
                provider=p,
                car=car,
                service_company=car.service_company,
            )
        except IntegrityError:
            pass
    print("Maitenance created")


def init_repairs():
    for i in rep_range:
        try:
            car = Car.objects.get(serial_number=rec[f"A{i}"].value)
            Repair.objects.create(
                issue_date=rec[f"B{i}"].value,
                operating_time=rec[f"C{i}"].value,
                unit=Manual.objects.get(name=rec[f"D{i}"].value),
                description=rec[f"E{i}"].value,
                method=Manual.objects.get(name=rec[f"F{i}"].value),
                repair_parts=rec[f"G{i}"].value,
                completion_date=rec[f"H{i}"].value,
                repair_time=int((rec[f"H{i}"].value - rec[f"B{i}"].value).days),
                car=car,
                service_company=car.service_company,
            )
        except IntegrityError:
            pass
    print("Repairs created")


def init_test_manager():
    try:
        user = User.objects.create(username="manager")
        user.save()
        user.groups.add(m)
        user.set_password("password")
        user.save()
        Manager.objects.create(name="Менеджер", user=user, description=lorem)
        print("Manager created")
    except IntegrityError:
        pass


def init_test_client():
    try:
        user = User.objects.create(username="test_client")
        user.save()
        user.set_password("password")
        user.groups.add(c)
        user.save()
        Client.objects.create(name="Тест Клиент", user=user, description=lorem)
    except IntegrityError:
        pass


def init_test_service():
    try:
        user = User.objects.create(username="test_service")
        user.save()
        user.set_password("password")
        user.groups.add(s)
        user.save()
        ServiceCompany.objects.create(
            name="Тест Компания", user=user, description=lorem
        )
    except IntegrityError:
        pass


init_superuser()
init_group_permissions()
init_test_manager()
init_test_client()
init_test_service()
init_users()
init_car_manuals()
init_maitenance_manuals()
init_repair_manuals()
init_cars()
init_repairs()
init_maitenance()
