# Warden & Sons — Catalogue Photography Guidelines

## Photography Rules
- **Aspect Ratio:** 4:5 portrait (e.g. 1600 × 2000 pixels).
- **Resolution:** At least 1600px wide, uncompressed JPEG, PNG, or WebP.
- **Background:** Plain background (clean neutral ivory/white wall, linen sheet, or uncluttered wooden floor).
- **Lighting:** One natural light source (e.g. soft daylight from an adjacent window). Avoid direct flash or artificial yellow lamps.
- **Setup:** Phone or camera mounted on a tripod with the exact same crop and camera angle for every shot.

---

## File Naming Rule

Place photos according to the category and sub-category hierarchy:

```text
assets/photos/<category>/<subcategory>/<name>.(jpg|jpeg|png|webp)
```

### Examples:
- `assets/photos/newborn/bodysuits-jhablas/1.jpg`
- `assets/photos/boys/shorts-joggers-cargos/1.jpg`
- `assets/photos/girls/dresses-frocks/1.jpg`

---

## Build Automation
Running `npm run images` processes these raw source photos into responsive AVIF and WebP sizes (`480px`, `800px`, `1200px`) in `public/img/`, generates a 16px blurred base64 placeholder, and updates `src/data/image-manifest.json`.
