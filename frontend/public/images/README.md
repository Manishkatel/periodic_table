# Element Images Directory

## Location
Place element images in: `frontend/public/images/elements/`

## Naming Convention
Use the element symbol in **lowercase** with `.jpg` extension:
- Hydrogen (H) → `h.jpg`
- Helium (He) → `he.jpg`
- Lithium (Li) → `li.jpg`
- Carbon (C) → `c.jpg`
- etc.

## Example Structure
```
frontend/public/images/elements/
├── h.jpg
├── he.jpg
├── li.jpg
├── be.jpg
├── b.jpg
├── c.jpg
├── n.jpg
├── o.jpg
├── f.jpg
├── ne.jpg
└── ... (all 118 elements)
```

## Image Format
- **Format**: JPG or PNG
- **Recommended size**: 400x300px or similar aspect ratio
- **Quality**: High quality for best display

## Usage
The application will automatically:
1. First try to load from `/images/elements/{symbol}.jpg` (local)
2. Then try external URL `https://images-of-elements.com/{symbol}.jpg`
3. Finally show a colored placeholder with the element symbol
