import React from 'react';

/**
 * Garment SVG Sprite
 * 17 flat garment silhouettes in one consistent graphic language:
 * 400x500 box, ~70% height, centered, flat fills, no outlines, no gradients.
 * Uses currentColor with subtle cutouts/overlays for collar/fold details.
 */
export function GarmentSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'none' }}
      aria-hidden="true"
    >
      <defs>
        {/* 1. Bodysuit / Jhabla */}
        <symbol id="g-jhabla" viewBox="0 0 400 500">
          {/* Main bodysuit torso */}
          <path
            fill="currentColor"
            d="M130 90 C150 115 250 115 270 90 L320 145 C328 154 324 168 312 174 L275 192 L275 350 C275 375 255 410 215 410 L185 410 C145 410 125 375 125 350 L125 192 L88 174 C76 168 72 154 80 145 Z"
          />
          {/* Neckline cutout */}
          <path
            fill="var(--bg, #FFFFFF)"
            opacity="0.3"
            d="M145 90 C165 130 235 130 255 90 C235 105 165 105 145 90 Z"
          />
          {/* Snap crotch tab */}
          <rect x="180" y="395" width="40" height="15" rx="3" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          {/* Placket/wrap tie detail */}
          <path
            d="M200 115 L200 240 M190 200 L210 200"
            stroke="var(--bg, #FFFFFF)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
        </symbol>

        {/* 2. Romper / Sleepsuit */}
        <symbol id="g-romper" viewBox="0 0 400 500">
          {/* Body with legs */}
          <path
            fill="currentColor"
            d="M135 90 C155 110 245 110 265 90 L315 140 L275 180 L275 340 L300 400 L250 415 L225 330 L200 345 L175 330 L150 415 L100 400 L125 340 L125 180 L85 140 Z"
          />
          {/* Center zip/snap line */}
          <path
            d="M200 110 L200 320"
            stroke="var(--bg, #FFFFFF)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.35"
          />
          {/* Sleeve cuffs */}
          <rect x="275" y="170" width="10" height="20" fill="var(--bg, #FFFFFF)" opacity="0.25" />
          <rect x="115" y="170" width="10" height="20" fill="var(--bg, #FFFFFF)" opacity="0.25" />
        </symbol>

        {/* 3. Swaddle Blanket */}
        <symbol id="g-swaddle" viewBox="0 0 400 500">
          {/* Folded envelope wrap */}
          <path
            fill="currentColor"
            d="M200 85 L320 200 L260 415 L140 415 L80 200 Z"
          />
          {/* Inner crossover wings */}
          <path
            fill="var(--bg, #FFFFFF)"
            opacity="0.25"
            d="M100 190 L220 310 L260 270 L140 150 Z"
          />
          <path
            fill="var(--bg, #FFFFFF)"
            opacity="0.35"
            d="M300 190 L180 310 L140 270 L260 150 Z"
          />
          {/* Hood peak */}
          <polygon points="200,85 170,120 230,120" fill="var(--bg, #FFFFFF)" opacity="0.4" />
        </symbol>

        {/* 4. Bath Towel */}
        <symbol id="g-towel" viewBox="0 0 400 500">
          {/* Hooded triangle towel fold */}
          <path
            fill="currentColor"
            d="M200 85 L325 210 L300 415 L100 415 L75 210 Z"
          />
          {/* Hood triangle */}
          <polygon points="200,85 140,165 260,165" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          {/* Hanging loop */}
          <path
            d="M200 85 C200 65 200 65 200 85"
            stroke="currentColor"
            strokeWidth="4"
          />
          {/* Border weave trim */}
          <rect x="100" y="385" width="200" height="12" fill="var(--bg, #FFFFFF)" opacity="0.3" />
        </symbol>

        {/* 5. Cap & Mittens */}
        <symbol id="g-cap-mittens" viewBox="0 0 400 500">
          {/* Cap dome */}
          <path
            fill="currentColor"
            d="M130 190 C130 100 270 100 270 190 Z"
          />
          {/* Cap folded brim */}
          <rect x="120" y="190" width="160" height="30" rx="4" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Knot / pompom */}
          <circle cx="200" cy="100" r="14" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          {/* Left mitten */}
          <path
            fill="currentColor"
            d="M110 270 C110 240 160 240 160 270 L160 350 C160 365 145 375 130 375 C115 375 100 365 100 350 Z"
          />
          <rect x="100" y="340" width="60" height="15" rx="3" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Right mitten */}
          <path
            fill="currentColor"
            d="M290 270 C290 240 240 240 240 270 L240 350 C240 365 255 375 270 375 C285 375 300 365 300 350 Z"
          />
          <rect x="240" y="340" width="60" height="15" rx="3" fill="var(--bg, #FFFFFF)" opacity="0.3" />
        </symbol>

        {/* 6. T-shirt */}
        <symbol id="g-tshirt" viewBox="0 0 400 500">
          {/* Torso & short sleeves */}
          <path
            fill="currentColor"
            d="M140 100 C165 125 235 125 260 100 L335 150 C345 158 340 175 325 185 L285 205 L285 410 L115 410 L115 205 L75 185 C60 175 55 158 65 150 Z"
          />
          {/* Ribbed crew neck */}
          <path
            fill="var(--bg, #FFFFFF)"
            opacity="0.35"
            d="M150 100 C170 120 230 120 250 100 C235 110 165 110 150 100 Z"
          />
          {/* Subtle hem line */}
          <line x1="115" y1="395" x2="285" y2="395" stroke="var(--bg, #FFFFFF)" strokeWidth="3" opacity="0.25" />
        </symbol>

        {/* 7. Shorts / Cargos */}
        <symbol id="g-shorts" viewBox="0 0 400 500">
          {/* Waistband to thighs */}
          <path
            fill="currentColor"
            d="M115 130 L285 130 L295 360 L220 375 L200 240 L180 375 L105 360 Z"
          />
          {/* Elastic waistband */}
          <rect x="115" y="130" width="170" height="24" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Drawstring loop */}
          <path d="M195 154 L190 185 M205 154 L210 185" stroke="var(--bg, #FFFFFF)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          {/* Left cargo pocket */}
          <rect x="125" y="240" width="40" height="45" rx="3" fill="var(--bg, #FFFFFF)" opacity="0.25" />
          {/* Right cargo pocket */}
          <rect x="235" y="240" width="40" height="45" rx="3" fill="var(--bg, #FFFFFF)" opacity="0.25" />
        </symbol>

        {/* 8. Jeans / Trousers */}
        <symbol id="g-jeans" viewBox="0 0 400 500">
          {/* Full length pants */}
          <path
            fill="currentColor"
            d="M120 105 L280 105 L290 415 L225 415 L200 230 L175 415 L110 415 Z"
          />
          {/* Waistband & fly */}
          <rect x="120" y="105" width="160" height="22" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          <path d="M200 127 L200 185 C200 195 190 200 180 200" stroke="var(--bg, #FFFFFF)" strokeWidth="2.5" fill="none" opacity="0.4" />
          {/* Curved front pockets */}
          <path d="M130 127 C150 130 160 150 160 170" stroke="var(--bg, #FFFFFF)" strokeWidth="2.5" fill="none" opacity="0.3" />
          <path d="M270 127 C250 130 240 150 240 170" stroke="var(--bg, #FFFFFF)" strokeWidth="2.5" fill="none" opacity="0.3" />
        </symbol>

        {/* 9. Nightsuit */}
        <symbol id="g-nightsuit" viewBox="0 0 400 500">
          {/* Shirt top */}
          <path
            fill="currentColor"
            d="M135 90 C155 110 245 110 265 90 L325 140 L285 180 L285 285 L115 285 L115 180 L75 140 Z"
          />
          {/* Notch collar */}
          <polygon points="200,120 160,95 200,165" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          <polygon points="200,120 240,95 200,165" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Buttons */}
          <circle cx="200" cy="190" r="3.5" fill="var(--bg, #FFFFFF)" opacity="0.6" />
          <circle cx="200" cy="225" r="3.5" fill="var(--bg, #FFFFFF)" opacity="0.6" />
          <circle cx="200" cy="260" r="3.5" fill="var(--bg, #FFFFFF)" opacity="0.6" />
          {/* Pyjama bottom */}
          <path
            fill="currentColor"
            d="M125 305 L275 305 L285 415 L230 415 L200 355 L170 415 L115 415 Z"
            opacity="0.9"
          />
          <rect x="125" y="305" width="150" height="12" fill="var(--bg, #FFFFFF)" opacity="0.25" />
        </symbol>

        {/* 10. Sportswear / Cricket Whites */}
        <symbol id="g-sportswear" viewBox="0 0 400 500">
          {/* Polo top */}
          <path
            fill="currentColor"
            d="M140 95 C165 115 235 115 260 95 L335 145 L285 195 L285 320 L115 320 L115 195 L65 145 Z"
          />
          {/* Polo collar tabs */}
          <polygon points="150,95 200,135 175,150 140,110" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          <polygon points="250,95 200,135 225,150 260,110" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          {/* Button placket */}
          <rect x="195" y="135" width="10" height="40" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Athletic chest stripe / crest */}
          <rect x="140" y="190" width="30" height="25" rx="3" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          {/* Shorts / track bottom */}
          <path
            fill="currentColor"
            d="M120 335 L280 335 L285 415 L225 415 L200 365 L175 415 L115 415 Z"
          />
        </symbol>

        {/* 11. Hoodie / Jacket */}
        <symbol id="g-hoodie" viewBox="0 0 400 500">
          {/* Hood on shoulders */}
          <path
            fill="currentColor"
            d="M150 85 C150 55 250 55 250 85 L330 150 L280 200 L280 410 L120 410 L120 200 L70 150 Z"
          />
          {/* Hood cowl shape */}
          <ellipse cx="200" cy="115" rx="40" ry="25" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Center zip */}
          <line x1="200" y1="140" x2="200" y2="410" stroke="var(--bg, #FFFFFF)" strokeWidth="3" opacity="0.4" />
          {/* Kangaroo split pocket */}
          <path
            fill="var(--bg, #FFFFFF)"
            opacity="0.2"
            d="M150 310 L250 310 L260 380 L140 380 Z"
          />
          {/* Ribbed hem & cuffs */}
          <rect x="120" y="395" width="160" height="15" fill="var(--bg, #FFFFFF)" opacity="0.3" />
        </symbol>

        {/* 12. Thermals / Socks */}
        <symbol id="g-thermals" viewBox="0 0 400 500">
          {/* Long sleeve thermal top */}
          <path
            fill="currentColor"
            d="M140 95 C165 115 235 115 260 95 L340 250 L295 270 L275 190 L275 320 L125 320 L125 190 L105 270 L60 250 Z"
          />
          {/* Ribbed neckline */}
          <path fill="var(--bg, #FFFFFF)" opacity="0.35" d="M150 95 C170 115 230 115 250 95 Z" />
          {/* Pair of thermal ribbed socks */}
          <path
            fill="currentColor"
            d="M135 345 L175 345 L175 395 L200 405 C205 415 195 420 185 420 L150 420 C135 420 135 405 135 395 Z"
          />
          <path
            fill="currentColor"
            d="M265 345 L225 345 L225 395 L200 405 C195 415 205 420 215 420 L250 420 C265 420 265 405 265 395 Z"
          />
        </symbol>

        {/* 13. Swimwear */}
        <symbol id="g-swimwear" viewBox="0 0 400 500">
          {/* One-piece swimsuit / rashguard */}
          <path
            fill="currentColor"
            d="M145 90 C165 110 235 110 255 90 L295 130 L270 160 L270 330 C270 370 250 410 215 410 L185 410 C150 410 130 370 130 330 L130 160 L105 130 Z"
          />
          {/* Racerback / shoulder straps */}
          <rect x="145" y="90" width="22" height="60" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          <rect x="233" y="90" width="22" height="60" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Side contrast panels */}
          <path d="M130 180 C150 240 150 280 130 340 Z" fill="var(--bg, #FFFFFF)" opacity="0.2" />
          <path d="M270 180 C250 240 250 280 270 340 Z" fill="var(--bg, #FFFFFF)" opacity="0.2" />
        </symbol>

        {/* 14. Frock / Dress */}
        <symbol id="g-frock" viewBox="0 0 400 500">
          {/* Bodice */}
          <path
            fill="currentColor"
            d="M150 95 C170 115 230 115 250 95 L285 140 L260 165 L255 230 L145 230 L140 165 L115 140 Z"
          />
          {/* Round scoop neck */}
          <path fill="var(--bg, #FFFFFF)" opacity="0.35" d="M155 95 C175 125 225 125 245 95 Z" />
          {/* Flared A-line skirt */}
          <path
            fill="currentColor"
            d="M145 230 L255 230 L320 415 L80 415 Z"
            opacity="0.95"
          />
          {/* Waist sash */}
          <rect x="145" y="222" width="110" height="16" rx="2" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          {/* Skirt pleat lines */}
          <line x1="180" y1="238" x2="160" y2="415" stroke="var(--bg, #FFFFFF)" strokeWidth="2" opacity="0.25" />
          <line x1="220" y1="238" x2="240" y2="415" stroke="var(--bg, #FFFFFF)" strokeWidth="2" opacity="0.25" />
        </symbol>

        {/* 15. Leggings */}
        <symbol id="g-leggings" viewBox="0 0 400 500">
          {/* Slim trousers */}
          <path
            fill="currentColor"
            d="M135 110 L265 110 L275 415 L225 415 L200 240 L175 415 L125 415 Z"
          />
          {/* Elastic waist */}
          <rect x="135" y="110" width="130" height="20" fill="var(--bg, #FFFFFF)" opacity="0.3" />
          {/* Ankle cuffs */}
          <rect x="125" y="400" width="50" height="15" fill="var(--bg, #FFFFFF)" opacity="0.2" />
          <rect x="225" y="400" width="50" height="15" fill="var(--bg, #FFFFFF)" opacity="0.2" />
        </symbol>

        {/* 16. Kaftan / Top */}
        <symbol id="g-kaftan" viewBox="0 0 400 500">
          {/* Wide draped tunic */}
          <path
            fill="currentColor"
            d="M140 90 L200 120 L260 90 L330 200 L285 240 L275 415 L125 415 L115 240 L70 200 Z"
          />
          {/* V-neckline */}
          <polygon points="200,165 175,95 225,95" fill="var(--bg, #FFFFFF)" opacity="0.35" />
          {/* Side slit details */}
          <line x1="125" y1="350" x2="125" y2="415" stroke="var(--bg, #FFFFFF)" strokeWidth="4" opacity="0.3" />
          <line x1="275" y1="350" x2="275" y2="415" stroke="var(--bg, #FFFFFF)" strokeWidth="4" opacity="0.3" />
        </symbol>

        {/* 17. School Uniform */}
        <symbol id="g-uniform" viewBox="0 0 400 500">
          {/* Collared shirt & pinafore / shorts */}
          <path
            fill="currentColor"
            d="M145 90 C165 110 235 110 255 90 L320 145 L280 185 L280 250 L120 250 L120 185 L80 145 Z"
          />
          {/* Crisp shirt collar */}
          <polygon points="200,120 160,95 185,140" fill="var(--bg, #FFFFFF)" opacity="0.4" />
          <polygon points="200,120 240,95 215,140" fill="var(--bg, #FFFFFF)" opacity="0.4" />
          {/* School tie */}
          <polygon points="194,120 206,120 208,220 200,235 192,220" fill="var(--bg, #FFFFFF)" opacity="0.6" />
          {/* Pleated pinafore / uniform skirt */}
          <path
            fill="currentColor"
            d="M130 250 L270 250 L310 415 L90 415 Z"
            opacity="0.95"
          />
          {/* Knife pleats */}
          <line x1="150" y1="250" x2="140" y2="415" stroke="var(--bg, #FFFFFF)" strokeWidth="2.5" opacity="0.3" />
          <line x1="200" y1="250" x2="200" y2="415" stroke="var(--bg, #FFFFFF)" strokeWidth="2.5" opacity="0.3" />
          <line x1="250" y1="250" x2="260" y2="415" stroke="var(--bg, #FFFFFF)" strokeWidth="2.5" opacity="0.3" />
        </symbol>
      </defs>
    </svg>
  );
}

export default GarmentSprite;
