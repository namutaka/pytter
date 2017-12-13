from django.contrib import admin

from .models import Account, Tweet

admin.site.register(Account)

admin.site.register(Tweet)
