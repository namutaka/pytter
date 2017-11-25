from django.conf.urls import url

from . import views

app_name = 'tweet'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^tweet$', views.tweet, name='tweet'),
    url(r'^(?P<author_name>[^/]+)/status/(?P<tweet_id>\d+)$', views.show_tweet, name='show_tweet'),
]
