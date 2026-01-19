#!/bin/bash
# Setup script for backend Django project

echo "Creating virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

echo "Setup complete! Activate the virtual environment with: source venv/bin/activate"
echo "Then run the server with: python manage.py runserver"