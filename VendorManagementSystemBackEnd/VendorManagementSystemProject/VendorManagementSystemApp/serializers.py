from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from .models import Vendor, PurchaseOrder


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self,data):
        if data['username']:
            if User.objects.filter(username = data['username']).exists():
                raise serializers.ValidationError('Username taken')

        if data['email']:
            if User.objects.filter(email=data['email']).exists():
                raise serializers.ValidationError('email taken')

        return data

    def create(self, validated_data):
        user  = User.objects.create(username = validated_data['username'],email = validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return validated_data


class VendorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'


class PurchaseOrderSerializers(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = '__all__'



