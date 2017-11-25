from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from .models import Account, Tweet
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.db.models import F, Q

@login_required
def index(request):
    account = request.user.account
    follows = account.follows.all()
    followers = account.followers.all()
    tweets = Tweet.objects.filter(
        Q(author__follower = account) | \
        Q(author = account)
    ).order_by('-created_at')

    return render(request, 'tweet/index.html', {
        'tweets': tweets,
        'follows': follows,
        'followers': followers,
    })

@login_required
def tweet(request):
    account = request.user.account
    text = request.POST['text']

    Tweet.objects.create(
        author = account,
        text = text,
    )
    return HttpResponseRedirect(
        reverse('tweet:index')
    )

@login_required
def show_tweet(request, author_name, tweet_id):
    author = Account.objects.get(name = author_name)
    tweet = author.tweets.get(pk = tweet_id)

    return render(request, 'tweet/show_tweet.html', {
        'author': author,
        'tweet': tweet,
    })
