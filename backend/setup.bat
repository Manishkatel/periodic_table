@echo off
REM Setup script for backend Django project (Windows)

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Running migrations...
python manage.py makemigrations
python manage.py migrate

echo Setup complete! Activate the virtual environment with: venv\Scripts\activate
echo Then run the server with: python manage.py runserver
pause