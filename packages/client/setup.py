from distutils.core import setup
from setuptools import setup, find_packages

setup(

    name='group_firewall',
    version='0.1dev0',
    author='Jake Laurie', 
    author_email='jake.gordon.laurie@gmail.com',
    packages=find_packages(),

    long_description=open('README.md').read()
)
