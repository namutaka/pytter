from django.conf.urls import url

from . import views

app_name = 'tweet'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^tweet$', views.tweet, name='tweet'),
    url(r'^who_to_follow$', views.who_to_follow, name='who_to_follow'),
    url(r'^toggle_follow/(?P<account_id>[^/]+)$', views.toggle_follow, name='toggle_follow'),
    url(r'^(?P<author_name>[^/]+)/status/(?P<tweet_id>\d+)$', views.show_tweet, name='show_tweet'),
]
