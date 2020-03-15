# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in big_calendar/__init__.py
from big_calendar import __version__ as version

setup(
	name='big_calendar',
	version=version,
	description='A calendar showing any doctype with a date',
	author='Maryn van der Laarse',
	author_email='marynvdl@africanparks.org',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
