# Generated by Django 4.2 on 2024-06-15 21:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_file_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='description',
        ),
    ]