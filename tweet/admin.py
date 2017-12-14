from django.contrib import admin

from .models import Account, Tweet

admin.site.register(Tweet)

admin.site.register(Account)

#class AccountAdmin(admin.ModelAdmin):
#    list_display = ('name', 'display_name',
#                    'created_at')
#
#admin.site.register(Account, AccountAdmin)
