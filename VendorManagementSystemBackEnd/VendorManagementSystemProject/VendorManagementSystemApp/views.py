from django.shortcuts import render
from rest_framework.authtoken.admin import User
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Vendor,PurchaseOrder
from .serializers import VendorSerializers,PurchaseOrderSerializers,RegisterSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated



class Registration(APIView):
    def post(self,request):
        new_data = request.data
        serializerdata = RegisterSerializer(data=new_data)
        if serializerdata.is_valid():
            serializerdata.save()
            return Response(serializerdata.data)
        else:
            return Response(serializerdata.errors)


# Create your views here.
class ProfileAPI(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    def get(self, request,vendor_id=None):
        if vendor_id is None:
            dataInfo = Vendor.objects.all()
            serializerData = VendorSerializers(dataInfo, many=True)
            return Response(serializerData.data)
        else:
            try:
                dataInfo = Vendor.objects.get(Vendor_id=vendor_id)
            except Vendor.DoesNotExist:
                msg = {'msg':'Ventor Profile details not Found'}
                return Response(msg)
            serializerData = VendorSerializers(dataInfo)
            return Response(serializerData.data)



    def post(self, request):
        new_info = request.data
        serializerData = VendorSerializers(data=new_info)
        if serializerData.is_valid():
            serializerData.save()
            return Response(serializerData.data)
        else:
            return Response(serializerData.errors)

    def put(self, request, vendor_id):
        new_info = request.data
        try:
            dataInfo = Vendor.objects.get(Vendor_id=vendor_id)
        except Vendor.DoesNotExist:
            msg = {'msg': 'Vendor Order details not Found'}
            return Response(msg)
        serializerData = VendorSerializers(dataInfo, data=new_info)
        if serializerData.is_valid():
            serializerData.save()
            return Response(serializerData.data)
        else:
            return Response(serializerData.errors)

    def delete(self, request,vendor_id):
        new_info = request.data
        try:
            dataInfo = Vendor.objects.get(Vendor_id=vendor_id)
        except Vendor.DoesNotExist:
            msg = {'msg': 'Ventor Profile details not Found'}
            return Response(msg)
        dataInfo.delete()
        result = "Vendor Record {} Deleted Successfully!".format(vendor_id)
        return Response(result)

class PurchaseOrderAPI(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get(self, request, vendor = None):
        if(vendor == None):
            dataInfo = PurchaseOrder.objects.all()
            serializerData = PurchaseOrderSerializers(dataInfo, many=True)
            return Response(serializerData.data)
        else:
            try:
                dataInfo = PurchaseOrder.objects.filter(vendor=vendor)
            except PurchaseOrder.DoesNotExist:
                msg = {'msg': 'Purchase Order details not Found'}
                return Response(msg)
            serializerData = PurchaseOrderSerializers(dataInfo,many=True)
            return Response(serializerData.data)

    def post(self, request):
        new_info = request.data
        serializerData = PurchaseOrderSerializers(data=new_info)
        if serializerData.is_valid():
            serializerData.save()
            return Response(serializerData.data)
        else:
            return Response(serializerData.errors)

    def put(self, request, vendor):
        new_info = request.data
        try:
            dataInfo = PurchaseOrder.objects.get(po_id=vendor)
        except PurchaseOrder.DoesNotExist:
            msg = {'msg': 'Purchase Order details not Found'}
            return Response(msg)
        serializerData = PurchaseOrderSerializers(dataInfo, data=new_info)
        if serializerData.is_valid():
            serializerData.save()
            return Response(serializerData.data)
        else:
            return Response(serializerData.errors)

    def delete(self, request, vendor):
        new_info = request.data
        try:
            serserData = PurchaseOrder.objects.get(po_id=vendor)
        except PurchaseOrder.DoesNotExist:
            msg = {'msg': 'Purchase Order details not Found'}
            return Response(msg)
        serserData.delete()
        result = "Purchase Order Record {} Deleted Successfully!".format(vendor)
        return Response(result)