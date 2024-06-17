from rest_framework import routers
from api.viewsets import FileViewSet


router = routers.DefaultRouter()
router.register(r'files', FileViewSet, basename='files')