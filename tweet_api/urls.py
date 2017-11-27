from django.conf.urls import url

from . import views

app_name = 'tweet_api'
urlpatterns = [
    url(r'^$', views.tweets, name='tweets'),
    url(r'^/post$', views.post_tweet, name='post_tweet'),
    url(r'^(?P<author_name>[^/]+)/status/(?P<tweet_id>\d+)$', views.get_tweet, name='get_tweet'),
]
