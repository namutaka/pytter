from django.db import models
from django.conf import settings
from django.forms.models import model_to_dict

class Account(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=100)
    display_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    blocked_at = models.DateTimeField(null=True, blank=True)

    follows = models.ManyToManyField(
        "self",
        symmetrical = False,
        related_name = "followers",
        related_query_name = "follower"
    )

    def __str__(self):
        return self.name

    def to_dict(self):
        return model_to_dict(
            self,
            fields=['id', 'name', 'display_name']
        )


class Tweet(models.Model):
    author = models.ForeignKey(
        Account,
        on_delete = models.CASCADE,
        related_name = "tweets",
        related_query_name = "tweet"
    )
    text = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(null=True)

    retweet_from = models.ForeignKey(
        'Tweet',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return str(self.pk)

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'author': self.author.to_dict(),
            'created_at': self.created_at,
        }

