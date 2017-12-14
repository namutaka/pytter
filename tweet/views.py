from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from django.db.models import F, Q
from .models import Account, Tweet

@login_required
def index(request):
    account = request.user.account
    follows = account.follows.all()
    followers = account.followers.all()

    return render(request, 'tweet/index.html', {
        'follows': follows,
        'followers': followers,
    })

@login_required
def who_to_follow(request):
    account = request.user.account
    follows = account.follows.all()
    accounts = Account.objects.exclude(pk=account.pk)

    return render(request, 'tweet/who_to_follow.html', {
        'follows': follows,
        'accounts': accounts,
    })

@login_required
def toggle_follow(request, account_id):
    followed = get_object_or_404(Account, pk = account_id)

    account = request.user.account
    if account.follows.filter(pk=followed.pk).exists():
        account.follows.remove(followed)
    else:
        account.follows.add(followed)

    return redirect('tweet:who_to_follow')


# -----
# react 以前のときの実装
@login_required
def tweet(request):
    account = request.user.account
    text = request.POST['text']

    Tweet.objects.create(
        author = account,
        text = text,
    )
    return redirect('tweet:index')

@login_required
def show_tweet(request, author_name, tweet_id):
    author = Account.objects.get(name = author_name)
    tweet = author.tweets.get(pk = tweet_id)

    return render(request, 'tweet/show_tweet.html', {
        'author': author,
        'tweet': tweet,
    })
