# Periodic Table Elements Explorer

A  web application for exploring periodic table elements with detailed properties, 3D atom visualization, and organized property tabs.

## Features

- **Interactive Periodic Table**: Click on any element to view detailed information
- **3D Atom Structure**: Visualize atom structure with protons, neutrons, and electrons
- **47 Properties Organized**: All element properties organized into 11 categories:
  1. Atomic/Fundamental Properties (6 properties)
  2. Electronic Properties (6 properties)
  3. Periodic Properties (4 properties)
  4. Physical Properties (11 properties)
  5. Chemical Properties (5 properties)
  6. Nuclear Properties (3 properties)
  7. Crystallographic/Structural Properties (3 properties)
  8. Thermodynamic Properties (3 properties)
  9. Optical & Spectroscopic Properties (2 properties)
  10. Biological & Environmental Properties (3 properties)
  11. Classification Properties (3 properties)
- **Element Images**: Display element images with fallback placeholders
- **Quiz System**: 
  - Select up to 2 elements to take an interactive quiz
  - 10 questions per quiz (5 questions per element when 2 elements selected, or 10 questions for a single element)
  - 20 unique questions generated dynamically for each element based on their properties
  - Questions cover atomic number, symbol, name, group, period, block, category, atomic mass, protons, neutrons, electrons, and more
  - View detailed results with correct/incorrect answers and score percentage
- **Element Comparison**: 
  - Compare any two elements side-by-side in a comprehensive table
  - Shows differences in atomic properties, periodic properties, physical properties, and electronic properties
  - Highlights which element has greater/lower values for numeric properties
  - Includes summary section with key information about both elements
- **Modern UI**: Built with React, Tailwind CSS, and Three.js for 3D visualization

## Tech Stack

### Frontend
- Vite
- Tailwind CSS
- Three.js (@react-three/fiber, @react-three/drei)

### Backend
- Django 4.2
- Django REST Framework
- SQLite (default, can be changed)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8 or higher
- pip

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. (Optional) Create a superuser to access admin panel:
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

## Project Structure

```
periodic_table/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PeriodicTable.jsx
│   │   │   ├── Atom3D.jsx
│   │   │   ├── PropertyTabs.jsx
│   │   │   ├── QuizComponent.jsx
│   │   │   └── ComparisonComponent.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ElementDetail.jsx
│   │   │   └── QuizCompare.jsx
│   │   ├── utils/
│   │   │   ├── periodicTableColors.js
│   │   │   └── questionGenerator.js
│   │   ├── data/
│   │   │   ├── elements.js
│   │   │   └── elementFacts.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── elements/
    │   ├── models.py
    │   ├── views.py
    │   ├── serializers.py
    │   └── urls.py
    ├── periodic_table_api/
    │   ├── settings.py
    │   └── urls.py
    └── manage.py
```

## Notes

- The frontend includes default data that works even if the backend is not running
- Element images are fetched from external sources with fallback placeholders
- The 3D atom visualization shows a simplified model based on electron shells
- All 118 elements are included in the periodic table
- Quiz questions are generated dynamically for each element, ensuring 20 unique questions per element
- Questions cover various aspects including atomic properties, periodic trends, classification, and element relationships
- The comparison feature works with any two elements and highlights key differences in their properties

## Development

- Frontend dev server: `npm run dev` (port 3000)
- Backend dev server: `python manage.py runserver` (port 8000)

The frontend proxy is configured to forward `/api/*` requests to the backend.

## License

MIT
