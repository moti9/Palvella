# Generated by Django 5.0.2 on 2024-04-21 12:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merchants', '0009_productimage_business'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='business',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='merchants.business'),
        ),
    ]
