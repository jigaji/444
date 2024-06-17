from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.core.validators import RegexValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api import models as api_models

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
   
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        try:
            token['vendor_id'] = user.vendor.id
        except:
            token['vendor_id'] = 0
        return token


class RegisterSerializer(serializers.ModelSerializer):

    login_validator = RegexValidator(
        regex=r'^[a-zA-Z]{1}[a-z0-9]{3,20}$',
        message='Login should start with letter, consist of letters and numbers, 4-20 characters',)
   
    password_validator = RegexValidator(
        regex=r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,/])[A-Za-z\d@$!%*?&.,]{6,}$', 
        message='Password should be at least 6 characters and consist of one uppercase letter, one numeric digit, and one special character',)
    
    username = serializers.CharField(label="Login", required=True, validators=[login_validator])
    password = serializers.CharField(write_only=True, required=True, validators=[password_validator])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        
        model = api_models.User
        fields = ('full_name','username', 'email',  'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = api_models.User.objects.create(
            full_name=validated_data['full_name'],
            email=validated_data['email'],
        )
        email_username, mobile = user.email.split('@')
        user.username = email_username
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = api_models.User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = api_models.Profile
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response


class FileSerializer(serializers.ModelSerializer):
    filename = serializers.CharField(max_length=255, default='')
    # description = serializers.CharField(max_length=255, default='')
    upload_datetime = serializers.SerializerMethodField()
    by_user = serializers.PrimaryKeyRelatedField(queryset=api_models.User.objects.all())
    size = serializers.SerializerMethodField()
    share_link = serializers.SerializerMethodField()

    class Meta:
        model = api_models.File
        fields = '__all__'

    def get_upload_datetime(self, obj):
        datetime = obj.upload_datetime
        return datetime
    
    def get_size(self, obj):
        return obj.size

    def get_share_link(self, obj):
        return obj.share_link

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        by_user_id = representation['by_user']
        user = api_models.User.objects.filter(pk=by_user_id).values(
            'username').first() if by_user_id else None
        representation['by_user'] = user['username'] if user else None

        return representation