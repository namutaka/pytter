from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import F, Q
from tweet.models import Account, Tweet

@login_required
def tweets(request):
    account = request.user.account
    tweets = Tweet.objects.filter(
        Q(author__follower = account) | \
        Q(author = account)
    ).order_by('-created_at')

    return JsonResponse({
        'tweets': [ tweet.to_dict() for tweet in tweets]
    })

@login_required
def post_tweet(request):
    account = request.user.account
    text = request.POST['text']

    tweet = Tweet.objects.create(
        author = account,
        text = text,
    )
    return JsonResponse(tweet.to_dict())

@login_required
def get_tweet(request, author_name, tweet_id):
    author = Account.objects.get(name = author_name)
    tweet = author.tweets.get(pk = tweet_id)

    return JsonResponse(tweet.to_dict())

