from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password
from django.contrib import messages
from .forms import UserForm
from .models import User

def registerUser(request):
	if request.method == 'POST':
		print(request.POST)
		form = UserForm(request.POST)
		if form.is_valid():
			# password = form.cleaned_data['password']
			# user = form.save(commit=False)
			# user.role = User.CUSTOMER
			# user.password = make_password(password)
			# user.save()
			first_name = form.cleaned_data['first_name']
			last_name = form.cleaned_data['last_name']
			password = form.cleaned_data['password']
			username	 = form.cleaned_data['username']
			email	 = form.cleaned_data['email']
			user = User.objects.create_user(
				first_name=first_name, 
				last_name=last_name, 
				username=username, 
				email=email, 
				password= password 
			)
			user.role = User.CUSTOMER
			user.save()
			messages.success(request, 'Your account has been registered successfully!')
			return redirect('registerUser')
		else:
			print('Invalid form!')
			print(form.errors)
	else:	
		form = UserForm()
	context = {
		'form': form,
	}
	return render(request, 'accounts/registerUser.html', context)
