# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-23 06:17
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweet', '0003_auto_20171123_1448'),
    ]

    operations = [
        migrations.RenameField('Tweet', 'tweet_by', 'author'),
    ]
