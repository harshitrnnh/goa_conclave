// Goan Conclave SVG Icons and Ornamental Frieze Patterns
// Handcrafted to match the tablet interface in the photo

export const GOAN_BORDER_FRIEZE = `
<svg class="goan-frieze-svg" viewBox="0 0 1200 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="goanArchPattern" width="60" height="48" patternUnits="userSpaceOnUse">
      <!-- Upper border rule -->
      <line x1="0" y1="2" x2="60" y2="2" stroke="currentColor" stroke-width="2.5" />
      <line x1="0" y1="7" x2="60" y2="7" stroke="currentColor" stroke-width="1" />
      
      <!-- Inverted Terracotta Vessel / Amphora motif from photo -->
      <path d="M 12 12 Q 18 10 24 12 Q 28 20 28 32 Q 24 40 18 40 Q 12 40 8 32 Q 8 20 12 12 Z" fill="currentColor" />
      <circle cx="18" cy="18" r="3" fill="#F8EFE3" />
      
      <!-- Connecting arch -->
      <path d="M 28 36 Q 33 28 38 36 Q 43 42 48 36" fill="none" stroke="currentColor" stroke-width="2" />
      <circle cx="33" cy="24" r="2.5" fill="currentColor" />
      
      <!-- Lower border rule -->
      <line x1="0" y1="44" x2="60" y2="44" stroke="currentColor" stroke-width="1.5" />
    </pattern>
  </defs>
  <rect width="100%" height="48" fill="url(#goanArchPattern)" />
</svg>
`;

export const WEATHER_ICONS = {
  sunny: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="17" fill="currentColor" />
      <circle cx="40" cy="40" r="21" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="2,3" />
      <!-- Solar rays -->
      <g stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
        <line x1="40" y1="8" x2="40" y2="13" />
        <line x1="40" y1="67" x2="40" y2="72" />
        <line x1="8" y1="40" x2="13" y2="40" />
        <line x1="67" y1="40" x2="72" y2="40" />
        <line x1="17.4" y1="17.4" x2="21.5" y2="21.5" />
        <line x1="58.5" y1="58.5" x2="62.6" y2="62.6" />
        <line x1="17.4" y1="62.6" x2="21.5" y2="58.5" />
        <line x1="58.5" y1="21.5" x2="62.6" y2="17.4" />
      </g>
    </svg>
  `,
  windy: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
        <!-- Flowing coastal wind breezes -->
        <path d="M 12 28 Q 38 28 48 24 Q 58 20 54 14 Q 50 10 44 14 Q 40 18 46 22" />
        <path d="M 8 40 Q 42 40 54 36 Q 66 32 68 24 Q 70 16 62 18 Q 56 22 60 28" />
        <path d="M 16 52 Q 36 52 46 56 Q 56 60 52 66 Q 48 70 42 66 Q 38 62 44 58" />
      </g>
      <circle cx="28" cy="28" r="2" fill="currentColor" />
      <circle cx="34" cy="40" r="2" fill="currentColor" />
      <circle cx="24" cy="52" r="2" fill="currentColor" />
    </svg>
  `,
  rainy: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Goan Monsoon cloud -->
      <path d="M 22 42 A 10 10 0 0 1 30 26 A 14 14 0 0 1 54 28 A 11 11 0 0 1 60 42 Z" fill="currentColor" />
      <!-- Rain drops -->
      <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <line x1="24" y1="48" x2="20" y2="58" />
        <line x1="36" y1="48" x2="32" y2="62" />
        <line x1="48" y1="48" x2="44" y2="58" />
        <line x1="58" y1="48" x2="54" y2="60" />
      </g>
      <circle cx="20" cy="65" r="2" fill="currentColor" />
      <circle cx="44" cy="65" r="2" fill="currentColor" />
    </svg>
  `,
  stormy: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Cyclone vortex spiral matching photo -->
      <g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
        <path d="M 40 40 A 6 6 0 0 0 35 44 A 12 12 0 0 0 48 50 A 18 18 0 0 0 56 34 A 24 24 0 0 0 32 18 A 29 29 0 0 0 13 42 A 32 32 0 0 0 46 70" />
      </g>
      <circle cx="40" cy="40" r="4.5" fill="currentColor" />
    </svg>
  `,
  calm: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Serene Goan ocean waves matching photo -->
      <g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round">
        <path d="M 12 24 Q 26 16 40 24 T 68 24" />
        <path d="M 12 40 Q 26 32 40 40 T 68 40" />
        <path d="M 12 56 Q 26 48 40 56 T 68 56" />
      </g>
      <circle cx="40" cy="30" r="2" fill="currentColor" />
      <circle cx="26" cy="48" r="2" fill="currentColor" />
    </svg>
  `
};

export const FOOD_ICONS = {
  fish_curry: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Traditional Clay Curry Pot with Fish motif -->
      <path d="M 14 38 Q 40 44 66 38 L 60 58 Q 40 68 20 58 Z" fill="currentColor" />
      <ellipse cx="40" cy="38" rx="26" ry="7" fill="currentColor" opacity="0.8" />
      <!-- Fish silhouette inside bowl -->
      <path d="M 28 37 Q 38 31 52 37 Q 44 42 34 38 Z" fill="#F8EFE3" />
      <!-- Steam vapors -->
      <path d="M 32 26 Q 34 18 38 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 44 24 Q 46 16 50 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
    </svg>
  `,
  prawn_curry: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Curry bowl with curved prawn -->
      <path d="M 15 42 Q 40 48 65 42 L 58 60 Q 40 68 22 60 Z" fill="currentColor" />
      <!-- Curved prawn -->
      <path d="M 32 36 C 26 26 38 18 46 22 C 54 26 52 36 44 38 C 38 39 36 34 40 32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <circle cx="34" cy="22" r="2" fill="currentColor" />
    </svg>
  `,
  vindaloo: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Fiery Goan Chili Pepper matching photo -->
      <path d="M 26 56 C 20 44 26 28 50 20 C 58 18 64 22 58 28 C 50 40 42 56 26 56 Z" fill="currentColor" />
      <!-- Stem -->
      <path d="M 52 20 Q 58 12 62 10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- Spicy highlights -->
      <circle cx="34" cy="42" r="2.5" fill="#F8EFE3" />
      <circle cx="42" cy="32" r="2" fill="#F8EFE3" />
    </svg>
  `,
  xacuti: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Rich layered masala dish with spice garnish -->
      <path d="M 16 42 Q 40 50 64 42 L 58 62 Q 40 70 22 62 Z" fill="currentColor" />
      <ellipse cx="40" cy="42" rx="24" ry="7" fill="currentColor" opacity="0.8" />
      <!-- Star anise / roasted spice cloves -->
      <g fill="#F8EFE3">
        <circle cx="40" cy="40" r="3" />
        <circle cx="32" cy="38" r="2.5" />
        <circle cx="48" cy="38" r="2.5" />
        <circle cx="36" cy="44" r="2" />
        <circle cx="44" cy="44" r="2" />
      </g>
      <!-- Steam -->
      <path d="M 38 28 Q 40 20 44 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
    </svg>
  `,
  bebinca: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- 7 Layered Goan Bebinca Slice matching photo -->
      <polygon points="18,58 36,24 62,24 50,58" fill="currentColor" opacity="0.2" />
      <!-- Seven horizontal layers -->
      <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <line x1="20" y1="56" x2="52" y2="56" />
        <line x1="23" y1="51" x2="54" y2="51" />
        <line x1="26" y1="46" x2="56" y2="46" />
        <line x1="29" y1="41" x2="58" y2="41" />
        <line x1="32" y1="36" x2="60" y2="36" />
        <line x1="35" y1="31" x2="62" y2="31" />
        <line x1="38" y1="26" x2="64" y2="26" />
      </g>
    </svg>
  `,
  poe_bread: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Round crusty Goan Poe Bread matching photo -->
      <ellipse cx="40" cy="44" rx="26" ry="19" fill="currentColor" />
      <!-- Traditional pocket slash across center -->
      <path d="M 22 42 Q 40 48 58 42" fill="none" stroke="#F8EFE3" stroke-width="3" stroke-linecap="round" />
      <ellipse cx="40" cy="34" rx="14" ry="5" fill="#F8EFE3" opacity="0.3" />
      <!-- Flour dust speckles -->
      <circle cx="32" cy="32" r="1.5" fill="#F8EFE3" />
      <circle cx="46" cy="32" r="1.5" fill="#F8EFE3" />
      <circle cx="40" cy="28" r="1.5" fill="#F8EFE3" />
    </svg>
  `
};

export const LOCATION_ICONS = {
  dudhsagar: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Mountain cliffs on both sides -->
      <path d="M 10 20 L 26 50 L 10 70 Z" fill="currentColor" opacity="0.7" />
      <path d="M 70 20 L 54 50 L 70 70 Z" fill="currentColor" opacity="0.7" />
      <!-- Tiered cascading waterfall streams -->
      <g stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="36" y1="16" x2="36" y2="38" />
        <line x1="40" y1="14" x2="40" y2="44" />
        <line x1="44" y1="16" x2="44" y2="38" />
        <!-- Railway arch bridge silhouette -->
        <path d="M 24 40 Q 40 34 56 40" fill="none" stroke="#F8EFE3" stroke-width="3" />
        <!-- Lower cascading plunge pool -->
        <line x1="33" y1="44" x2="31" y2="64" />
        <line x1="38" y1="44" x2="38" y2="66" />
        <line x1="42" y1="44" x2="42" y2="66" />
        <line x1="47" y1="44" x2="49" y2="64" />
      </g>
      <!-- Foaming water base -->
      <ellipse cx="40" cy="68" rx="22" ry="4" fill="currentColor" />
    </svg>
  `,
  aguada_fort: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Fort stone ramparts base -->
      <rect x="18" y="52" width="44" height="16" rx="2" fill="currentColor" />
      <!-- Rampart crenellations -->
      <rect x="22" y="47" width="6" height="5" fill="currentColor" />
      <rect x="34" y="47" width="6" height="5" fill="currentColor" />
      <rect x="46" y="47" width="6" height="5" fill="currentColor" />
      <rect x="54" y="47" width="6" height="5" fill="currentColor" />
      <!-- Historic circular lighthouse tower -->
      <polygon points="32,52 35,26 45,26 48,52" fill="currentColor" />
      <!-- Lantern dome -->
      <path d="M 33 26 Q 40 18 47 26 Z" fill="currentColor" />
      <circle cx="40" cy="23" r="2.5" fill="#F8EFE3" />
      <!-- Beacon light rays -->
      <line x1="28" y1="21" x2="16" y2="17" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <line x1="52" y1="21" x2="64" y2="17" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <line x1="40" y1="16" x2="40" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  fontainhas: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Pitched Portuguese terracotta tiled roof -->
      <polygon points="40,14 16,32 64,32" fill="currentColor" />
      <!-- Heritage building wall -->
      <rect x="22" y="32" width="36" height="36" fill="currentColor" />
      <!-- Upper arched window with shutters -->
      <path d="M 34 44 A 6 6 0 0 1 46 44 L 46 48 L 34 48 Z" fill="#F8EFE3" />
      <rect x="38" y="44" width="4" height="4" fill="currentColor" />
      <!-- Iconic Balcão (porch / projecting balcony) railing -->
      <rect x="28" y="56" width="24" height="12" fill="#F8EFE3" />
      <g stroke="currentColor" stroke-width="1.8">
        <line x1="33" y1="56" x2="33" y2="68" />
        <line x1="40" y1="56" x2="40" y2="68" />
        <line x1="47" y1="56" x2="47" y2="68" />
      </g>
    </svg>
  `,
  chapora_fort: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Hilltop promontory curve -->
      <path d="M 10 68 Q 40 48 70 68 Z" fill="currentColor" opacity="0.4" />
      <!-- Dramatic laterite fort rampart battlements -->
      <path d="M 14 54 Q 38 40 66 48 L 66 62 Q 38 52 14 62 Z" fill="currentColor" />
      <!-- Crenellations & arrow slits -->
      <g fill="#F8EFE3">
        <rect x="22" y="52" width="3" height="5" />
        <rect x="34" y="48" width="3" height="5" />
        <rect x="46" y="49" width="3" height="5" />
        <rect x="56" y="52" width="3" height="5" />
      </g>
      <!-- Fort flag on bastion -->
      <line x1="28" y1="46" x2="28" y2="24" stroke="currentColor" stroke-width="2.5" />
      <polygon points="28,24 42,30 28,36" fill="currentColor" />
    </svg>
  `,
  palolem_beach: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Crescent bay coastline -->
      <path d="M 12 60 Q 40 44 68 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M 16 68 Q 40 56 64 70" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6" />
      <!-- Setting sun on ocean horizon -->
      <path d="M 30 46 A 10 10 0 0 1 50 46 Z" fill="currentColor" />
      <line x1="24" y1="46" x2="56" y2="46" stroke="currentColor" stroke-width="2" />
      <!-- Leaning coconut palm tree -->
      <path d="M 22 62 Q 24 38 32 26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- Palm fronds -->
      <path d="M 32 26 Q 20 22 14 26" fill="none" stroke="currentColor" stroke-width="2.5" />
      <path d="M 32 26 Q 28 14 36 12" fill="none" stroke="currentColor" stroke-width="2.5" />
      <path d="M 32 26 Q 42 18 46 24" fill="none" stroke="currentColor" stroke-width="2.5" />
    </svg>
  `,
  cabo_de_rama: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Cabo de Rama Fort Clifftop & Ocean Waves -->
      <!-- Rising Sun / Horizon -->
      <circle cx="58" cy="24" r="9" fill="currentColor" opacity="0.3" />
      <path d="M 46 24 L 70 24 M 58 12 L 58 36" stroke="currentColor" stroke-width="1.8" opacity="0.4" />
      <!-- High Clifftop Promontory -->
      <path d="M 12 70 L 12 36 L 48 36 L 48 46 L 56 46 L 56 56 L 68 70 Z" fill="currentColor" />
      <!-- Fort Bastion Crenellations on Crest -->
      <rect x="14" y="30" width="6" height="6" fill="currentColor" />
      <rect x="24" y="30" width="6" height="6" fill="currentColor" />
      <rect x="34" y="30" width="6" height="6" fill="currentColor" />
      <rect x="44" y="30" width="6" height="6" fill="currentColor" />
      <!-- Lookout Flagpost -->
      <line x1="20" y1="30" x2="20" y2="16" stroke="currentColor" stroke-width="2" />
      <polygon points="20,16 30,20 20,24" fill="currentColor" />
      <!-- Rolling Ocean Waves below -->
      <path d="M 44 64 Q 54 60 64 64 T 76 64" fill="none" stroke="#F8EFE3" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 48 70 Q 58 66 68 70" fill="none" stroke="#F8EFE3" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,
  old_goa_basilica: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Cabo de Rama Fallback -->
      <path d="M 12 70 L 12 36 L 48 36 L 48 46 L 56 46 L 56 56 L 68 70 Z" fill="currentColor" />
      <rect x="14" y="30" width="6" height="6" fill="currentColor" />
      <rect x="24" y="30" width="6" height="6" fill="currentColor" />
      <line x1="20" y1="30" x2="20" y2="16" stroke="currentColor" stroke-width="2" />
      <polygon points="20,16 30,20 20,24" fill="currentColor" />
      <path d="M 44 64 Q 54 60 64 64 T 76 64" fill="none" stroke="#F8EFE3" stroke-width="2.5" />
    </svg>
  `
};

export const EMBLEM_ICONS = {
  mandovi_boat: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- River hull -->
      <path d="M 14 52 Q 40 60 66 52 L 60 62 Q 40 66 20 62 Z" fill="currentColor" />
      <!-- Mast -->
      <line x1="42" y1="16" x2="42" y2="52" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- Main triangular sail -->
      <polygon points="42,18 42,48 64,44" fill="currentColor" opacity="0.85" />
      <!-- Jib sail -->
      <polygon points="40,22 40,48 24,46" fill="currentColor" opacity="0.6" />
      <!-- Mandovi river ripples -->
      <path d="M 10 66 Q 26 62 42 66 T 70 66" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  `,
  coconut_palm: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Curved trunk -->
      <path d="M 36 68 Q 42 46 40 30" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" />
      <!-- Radial swaying fronds -->
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <path d="M 40 30 Q 24 24 16 34" />
        <path d="M 40 30 Q 26 14 30 10" />
        <path d="M 40 30 Q 42 10 50 12" />
        <path d="M 40 30 Q 56 16 64 26" />
        <path d="M 40 30 Q 54 36 60 44" />
      </g>
      <!-- Coconuts -->
      <circle cx="37" cy="33" r="2.5" fill="currentColor" />
      <circle cx="43" cy="33" r="2.5" fill="currentColor" />
      <!-- Sand mound base -->
      <path d="M 24 68 Q 40 64 56 68" fill="none" stroke="currentColor" stroke-width="3" />
    </svg>
  `,
  sea_turtle: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Shell carapace -->
      <ellipse cx="40" cy="42" rx="17" ry="21" fill="currentColor" />
      <!-- Shell pattern lines -->
      <ellipse cx="40" cy="42" rx="10" ry="14" fill="none" stroke="#F8EFE3" stroke-width="2" />
      <line x1="40" y1="28" x2="40" y2="56" stroke="#F8EFE3" stroke-width="2" />
      <!-- Turtle head -->
      <ellipse cx="40" cy="18" rx="6" ry="7" fill="currentColor" />
      <!-- Front long swimming flippers -->
      <path d="M 30 32 C 16 26 10 18 12 16 C 14 14 24 24 32 30" fill="currentColor" />
      <path d="M 50 32 C 64 26 70 18 68 16 C 66 14 56 24 48 30" fill="currentColor" />
      <!-- Rear flippers -->
      <ellipse cx="28" cy="58" rx="4" ry="7" transform="rotate(-30 28 58)" fill="currentColor" />
      <ellipse cx="52" cy="58" rx="4" ry="7" transform="rotate(30 52 58)" fill="currentColor" />
    </svg>
  `,
  kingfisher: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Perched branch -->
      <line x1="16" y1="62" x2="64" y2="62" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
      <!-- Kingfisher body -->
      <ellipse cx="38" cy="44" rx="13" ry="17" transform="rotate(-15 38 44)" fill="currentColor" />
      <!-- Head with crest -->
      <circle cx="34" cy="26" r="10" fill="currentColor" />
      <path d="M 28 20 Q 24 16 26 14 Q 30 18 32 18" fill="currentColor" />
      <!-- Long sharp pointed bill -->
      <polygon points="26,24 6,28 26,30" fill="currentColor" />
      <!-- Eye -->
      <circle cx="30" cy="24" r="2" fill="#F8EFE3" />
      <!-- Folded wing -->
      <path d="M 36 36 Q 48 44 46 58 Q 40 54 36 44 Z" fill="#F8EFE3" opacity="0.6" />
      <!-- Tail -->
      <polygon points="44,54 52,68 46,68 40,56" fill="currentColor" />
    </svg>
  `,
  carnival_spirit: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Viva Carnival Masquerade Mask -->
      <path d="M 14 42 C 16 32 26 30 40 36 C 54 30 64 32 66 42 C 68 54 52 60 40 52 C 28 60 12 54 14 42 Z" fill="currentColor" />
      <!-- Eye cutouts -->
      <ellipse cx="28" cy="42" rx="6" ry="4" transform="rotate(-10 28 42)" fill="#F8EFE3" />
      <ellipse cx="52" cy="42" rx="6" ry="4" transform="rotate(10 52 42)" fill="#F8EFE3" />
      <!-- Crown feathers -->
      <path d="M 40 34 Q 38 14 40 8 Q 42 14 40 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M 38 34 Q 30 18 24 14 Q 30 22 36 34" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 42 34 Q 50 18 56 14 Q 50 22 44 34" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <!-- Star embellishments -->
      <circle cx="40" cy="42" r="2" fill="#F8EFE3" />
    </svg>
  `,
  susegad: `
    <svg viewBox="0 0 80 80" class="sentiment-icon-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Two coconut tree trunks -->
      <line x1="16" y1="18" x2="16" y2="68" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <line x1="64" y1="18" x2="64" y2="68" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <!-- Suspension ropes -->
      <line x1="16" y1="36" x2="26" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <line x1="64" y1="36" x2="54" y2="44" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
      <!-- Curved gentle hammock sling -->
      <path d="M 24 44 Q 40 60 56 44 Q 40 54 24 44 Z" fill="currentColor" />
      <!-- Hammock weave lines -->
      <g stroke="#F8EFE3" stroke-width="1.8" stroke-linecap="round">
        <line x1="32" y1="48" x2="32" y2="54" />
        <line x1="40" y1="50" x2="40" y2="57" />
        <line x1="48" y1="48" x2="48" y2="54" />
      </g>
      <!-- Small siesta pillow -->
      <ellipse cx="28" cy="46" rx="4" ry="3" fill="#F8EFE3" />
    </svg>
  `
};

