#!/bin/bash

export DJANGO_SETTINGS_MODULE=Silant.settings
find . -path "*migrations*" -not -regex ".*__init__.py" -a -not -regex ".*migrations" | xargs rm -rf
rm mydatabase.sqlite
python manage.py makemigrations app
python manage.py makemigrations users
python manage.py makemigrations manuals
python manage.py migrate
python init_db.py