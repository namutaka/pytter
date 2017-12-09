from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate

from tweet.models import Account

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)

            Account.objects.create(
                user = user,
                name = username,
                display_name = username
            )

            login(request, user)
            return redirect('tweet:index')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/signup.html', {'form': form})

