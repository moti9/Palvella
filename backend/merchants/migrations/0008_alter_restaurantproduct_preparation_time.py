# Generated by Django 5.0.2 on 2024-04-20 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('merchants', '0007_rename_brand_shopproduct_brands'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurantproduct',
            name='preparation_time',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True),
        ),
    ]
