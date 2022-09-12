from django import forms
from .models import Vendor
from accounts.validators import allow_only_images_validator

class VendorForm(forms.ModelForm):
	vendor_name = forms.CharField(
		widget=forms.TextInput(attrs={
			'class':'foodbakery-dev-req-field',
			'placeholder':'i.e Pizza Hut'
		})
	)
	vendor_license = forms.FileField(
		widget=forms.FileInput(attrs={'class':'btn btn-info'}),
		validators=[allow_only_images_validator]
	)
	class Meta:
		model = Vendor
		fields = ['vendor_name', 'vendor_license']