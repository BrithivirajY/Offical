"""
URL configuration for VendorManagementSystemProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('api/signup/',views.Registration.as_view()),
    path('api/signin/',obtain_auth_token),
    path('api/vendors/',views. ProfileAPI.as_view()),
    path('api/vendors/<int:vendor_id>/',views. ProfileAPI.as_view()),

    path('api/purchase_orders/',views. PurchaseOrderAPI.as_view()),
    path('api/purchase_orders/<int:vendor>/',views. PurchaseOrderAPI.as_view()),

]
