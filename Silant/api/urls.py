from django.urls import path, include, re_path
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Silant API",
        default_version="v1",
        description="API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register(r"car", CarViewSet)
router.register(r"manager", ManagerViewSet)
router.register(r"user", UserViewSet)
router.register(r"client", ClientViewSet)
router.register(r"service-company", ServiceViewSet)
router.register(r"maitenance", MaitenanceViewSet)
router.register(r"repair", RepairViewSet)
router.register(r"manual", ManualViewSet)

urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),
    path("", include(router.urls)),
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
]
