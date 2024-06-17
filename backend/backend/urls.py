from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from api import views as api_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/token/', api_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/register/', api_views.RegisterView.as_view(), name='auth_register'),
    path('api/user/profile/<user_id>/', api_views.ProfileView.as_view(), name='user_profile'),
    path('api/files/<user_id>/', api_views.FileList.as_view()),
    path('api/file/upload/', api_views.FileUploadAPIView.as_view()),
    path('api/file/share/<int:pk>', api_views.FileView.as_view()),
    path('api/file/delete/<int:pk>', api_views.FileDeleteAPIView.as_view()),
    path('api/files/detail/<user_id>/<file_id>/', api_views.FileEditAPIView.as_view()),
    

    path('s/<str:hash>/', api_views.redirect_to_file, name='redirect_to_file'),

]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)