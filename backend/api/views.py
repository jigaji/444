from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
import logging
from django.http import HttpResponse
from dotenv import load_dotenv
from api import serializer as api_serializer
from api import models as api_models

load_dotenv()
logger = logging.getLogger(__name__)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = api_models.User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.RegisterSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.ProfileSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)
        profile = api_models.Profile.objects.get(user=user)
        return profile

class FileList(generics.ListAPIView):
    serializer_class = api_serializer.FileSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = api_models.User.objects.get(id=user_id)

        
        return api_models.File.objects.filter(by_user=user).order_by("-id") 
        

class FileUploadAPIView(generics.CreateAPIView):
    serializer_class = api_serializer.FileSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
      
        user_id = request.data.get('by_user')
        filename = request.data.get('filename')
        file = request.data.get('file')
        # description = request.data.get('description')
        # size = request.data.get('size')
        # share_link = request.data.get('share_link')
        # upload_datetime = request.data.get('upload_datetime')
        

      
        print(request.data)
        # print(share_link)
        # print(filename)
        # print(file)
        # print(description)
        # print(size)
        # print(share_link)
        # print(upload_datetime)

        user = api_models.User.objects.get(id=user_id)
        print(user)

        file = api_models.File.objects.create(
            by_user=user,
            filename=filename,
            file=file,
            # description=description,
            # size=size,
            # share_link=share_link,
            # upload_datetime=upload_datetime
            
        )
        print(file.by_user)
        print(file.filename)
        print(file.share_link)

        return Response({"message": "File has been uploaded successfully"}, status=status.HTTP_201_CREATED)
    
class FileDeleteAPIView(generics.DestroyAPIView):
    queryset = api_models.File.objects.all()
    serializer_class = api_serializer.FileSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class FileView(generics.RetrieveAPIView):
    queryset = api_models.File.objects.all()
    serializer_class = api_serializer.FileSerializer
    permission_classes = [AllowAny]


    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    

class FileEditAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = api_serializer.FileSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs['user_id']
        file_id = self.kwargs['file_id']
        user = api_models.User.objects.get(id=user_id)
        return api_models.File.objects.get(user=user, id=file_id)

    def update(self, request, *args, **kwargs):
        file_instance = self.get_object()
        filename = request.data.get('filename')
    

        print(filename)


        file_instance.filename = filename
    
        file_instance.save()

        return Response({"message": "File Updated Successfully"}, status=status.HTTP_200_OK)



def redirect_to_file(request, hash):
        try:
            share_link = f"{'http://localhost:5173/s/{hash}'}"
            file_obj = api_models.File.objects.get(share_link=share_link)
            response = HttpResponse(file_obj.file)
            response['Content-Disposition'] = f'attachment; filename="{file_obj.filename}"'
            logger.info(f"File '{file_obj.filename}' was provided for download.")
            return response
        except api_models.File.DoesNotExist:
            logger.error("Share link not found.")
            return HttpResponse("Share link not found", status=404)   
