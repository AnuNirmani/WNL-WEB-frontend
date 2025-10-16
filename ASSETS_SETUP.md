# Assets Setup Guide

To complete the dashboard setup, you need to add your assets (images, logos, etc.) to the `public` folder.

## Required Assets Structure

Create the following structure in your `public` folder:

```
public/
├── favicon.ico
└── assets/
    └── img/
        ├── wijeya_logo.png           # Company logo for header
        ├── slider/                    # News carousel images
        │   ├── 1.png
        │   ├── 2.png
        │   └── 3.png
        ├── portfolio/                 # Publication images
        │   ├── po-1.png              # Tamil Mirror
        │   ├── po-2.png              # Sunday Lankadeepa
        │   ├── po-3.png              # Deshaya
        │   ├── po-4.png              # Daily Lankadeepa
        │   ├── po-5.png              # Daily Mirror
        │   ├── po-6.png              # FT
        │   ├── po-7.png              # Ada
        │   ├── po-8.png              # Sunday Times
        │   ├── po-10.png             # Lanka Women
        │   ├── po-12.png             # Sirikatha
        │   ├── po-14.png             # Wijaya
        │   ├── po-16.png             # Bilindu
        │   ├── po-18.png             # Hi Magazine
        │   ├── po-20.png             # Pariganaka
        │   ├── po-22.png             # Easy Guide
        │   └── po-23.png             # Braille
        ├── 1.png                      # Press release image 1
        ├── 2.png                      # Press release image 2
        └── 3.png                      # Press release image 3
```

## How to Add Assets

1. Create the folder structure:
   - `public/assets/img/`
   - `public/assets/img/slider/`
   - `public/assets/img/portfolio/`

2. Copy your images into the respective folders

3. Ensure the filenames match exactly as shown above

## Image Recommendations

- **Logo**: PNG format with transparent background, max width ~200px
- **Slider images**: 800x600px or similar aspect ratio
- **Portfolio images**: Square or portrait orientation, 400x500px recommended
- **Press release images**: 800x600px or 16:9 aspect ratio

## Optional: Custom CSS

If you have custom CSS from your original template, you can:
1. Place CSS files in `public/assets/css/`
2. Import them in `index.html` or individual components

## Testing

After adding assets, run:
```bash
npm run dev
```

And verify all images load correctly at `http://localhost:5173`

