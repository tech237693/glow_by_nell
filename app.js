(function(){
'use strict';


/* =====================================================================
   RÉGLAGES À MODIFIER
   Tout ce que tu dois changer est dans ce premier bloc.
   ===================================================================== */
const BRAND = {
  name: 'GLOW',                      // nom affiché dans le logo (en haut)
  sub: 'by Nell',                    // petite ligne sous le nom
  full: 'Glow by Nell',              // nom complet, utilisé dans les messages et les titres
  whatsapp: '237693387592',          // numéro WhatsApp sans le +, sans espaces
  phone: '+237 6 93 38 75 92',       // numéro affiché sur le site
  email: 'kanaange59@gmail.com',   // adresse e-mail affichée (à remplacer)
  instagram: 'kananellyange',           // nom d'utilisateur Instagram, sans @
  city: 'Douala, Cameroun',
  hours: 'Tous les jours, 9 h – 19 h'
};
// Page Partenaires : conditions affichées aux revendeurs, salons, entreprises (à adapter)
const PARTNER = {
  tiers: [['5 à 9 pièces', '−10 %'], ['10 à 24 pièces', '−15 %'], ['25 pièces et plus', '−20 %']],
  minOrder: 5,                       // quantité minimale d'une commande professionnelle
  reply: 'Devis sous 24 h ouvrées',  // délai de réponse annoncé
  deposit: '50 %'                    // acompte à la validation ('' pour ne rien afficher)
};
const PAY = { momo: '6 73 24 95 26', om: '6 93 38 75 92' };   // numéros MTN MoMo / Orange Money
const MATERIAL = 'Cheveux naturels';                          // matière affichée sur les fiches
const LENGTH_STEP = 0.16;      // chaque longueur au-dessus de la première ajoute 16 % au prix de base
const DELIVERY = [             // frais de livraison en FCFA
  { id: 'douala',  label: 'Douala',                  fee: 2000 },
  { id: 'yaounde', label: 'Yaoundé',                 fee: 3500 },
  { id: 'ouest',   label: 'Autre ville a l"ouest', fee: 5000 }
];
// Avis : remplace les exemples par de vrais messages de clientes (avec leur accord).
const REVIEWS = [
  { name: 'JULIE', city: 'DOUALA', text: " j'ai hesité doutant de la qualité du service je me rends compte que j'ai fait le bon choix chez glow by nell", sample: true },
  { name: 'CINDY', city: 'YAOUNDE', text: 'facile a manipuler tu choisis juste celle qui te definit et les livraisons sont rapides j', sample: true },
  { name: 'ROSE', city: 'DOUALA', text: 'La ref des perruques chez GLOW BY NELL', sample: true }
];

/* =====================================================================
Z   CATALOGUE
   Pour ajouter une perruque : copie une ligne P(...) dans PRODUCTS.S
   P(identifiant, nom, forme, finition, couleur, prix de base FCFA, étiquettes, options)
   Étiquettes : 'new' (nouveauté) et/ou 'best' (best-seller)
   Pour mettre tes vraies photos : options { images: ['photos/soyeuse-1.jpg', 'photos/soyeuse-2.jpg'] }
   ===================================================================== */
const COLORS = {
  noir:     { label: 'Noir naturel',  hex: '#1d1612' },
  brun:     { label: 'Brun chocolat', hex: '#3b2416' },
  miel:     { label: 'Châtain miel',  hex: '#8c5b34' },
  blond:    { label: 'Blond 613',     hex: '#e6cd8e' },
  bordeaux: { label: 'Bordeaux 99J',  hex: '#5a1224' },
  cuivre:   { label: 'Cuivre',        hex: '#a9511f' },
  ombre:    { label: 'Ombré ambre',   hex: '#24180f', hex2: '#b5803f' },
  platine:  { label: 'Platine',       hex: '#cfcbc6' },
  rose:     { label: 'Rose poudré',   hex: '#d99aa6' }
};

const STYLES = [
  ['lisse', 'Lisse'], ['ondulee', 'Ondulée'], ['bouclee', 'Bouclée'],
  ['crepue', 'Crépue & afro'], ['bob', 'Bob'], ['pixie', 'Pixie'], ['tressee', 'Tressée']
];

const SHAPES = {
  straight:  { style: 'lisse',   label: 'Straight',       dens: '180 %', lens: [14,18,22,26,30], text: 'Lisse et souple, avec un vrai mouvement. Tombe droit sans effet raide.' },
  bone:      { style: 'lisse',   label: 'Bone straight',  dens: '180 %', lens: [18,22,26,30,34], text: 'Ultra lisse, effet repassé, pointes pleines. Chaque mèche retombe bien droite.' },
  yaki:      { style: 'lisse',   label: 'Yaki lisse',     dens: '150 %', lens: [14,18,22,26],    text: 'Texture yaki légèrement striée. Se marie sans effort aux cheveux défrisés.' },
  layers:    { style: 'lisse',   label: 'Dégradé',        dens: '180 %', lens: [16,20,24,28],    text: 'Coupe dégradée qui encadre le visage et donne du mouvement aux longueurs.' },
  curtain:   { style: 'lisse',   label: 'Frange rideau',  dens: '180 %', lens: [16,20,24,28],    text: 'Frange rideau ouverte au centre, qui adoucit le visage dès la première minute.' },
  body:      { style: 'ondulee', label: 'Body wave',      dens: '180 %', lens: [14,18,22,26,30], text: 'Ondulations larges et souples, effet brushing. Le volume reste léger.' },
  loose:     { style: 'ondulee', label: 'Loose wave',     dens: '180 %', lens: [14,18,22,26],    text: 'Grandes ondes lâches, mouvement naturel, idéal au quotidien.' },
  water:     { style: 'ondulee', label: 'Water wave',     dens: '200 %', lens: [14,18,22,26,30], text: 'Boucles fines en S, effet mouillé, très volumineux une fois sec.' },
  deep:      { style: 'ondulee', label: 'Deep wave',      dens: '200 %', lens: [14,18,22,26,30], text: 'Vagues marquées en profondeur. Elles tiennent après le lavage.' },
  spanish:   { style: 'ondulee', label: 'Spanish wave',   dens: '180 %', lens: [14,18,22,26],    text: 'Boucles mi-lâches et torsadées, très naturelles, avec du corps à la racine.' },
  curly:     { style: 'bouclee', label: 'Curly',          dens: '200 %', lens: [12,16,20,24],    text: 'Boucles définies et rebondies, volume généreux de la racine aux pointes.' },
  burmese:   { style: 'bouclee', label: 'Burmese curly',  dens: '180 %', lens: [14,18,22,26],    text: 'Boucles souples et brillantes, volume léger, retombée douce.' },
  jerry:     { style: 'bouclee', label: 'Jerry curl',     dens: '180 %', lens: [8,10,12,14],     text: 'Petites boucles serrées et nettes, un style rétro qui ne se démode pas.' },
  kinky:     { style: 'crepue',  label: 'Kinky curly',    dens: '180 %', lens: [10,14,18,22],    text: 'Texture crépue naturelle, boucles serrées type 4B, qui fondent avec tes cheveux.' },
  afro:      { style: 'crepue',  label: 'Afro kinky',     dens: '200 %', lens: [8,10,12,14],     text: 'Afro volumineux et léger, à sculpter avec les doigts ou un pic.' },
  bob:       { style: 'bob',     label: 'Bob lisse',      dens: '180 %', lens: [8,10,12,14],     text: 'Coupe carrée nette au menton, facile à poser et à coiffer.' },
  bobwave:   { style: 'bob',     label: 'Bob wavy',       dens: '180 %', lens: [8,10,12,14],     text: 'Bob ondulé avec du mouvement, plus doux qu’un carré strict.' },
  bobcurl:   { style: 'bob',     label: 'Bob bouclé',     dens: '200 %', lens: [8,10,12,14],     text: 'Bob de boucles rebondies, léger sur la nuque et plein sur le dessus.' },
  pixie:     { style: 'pixie',   label: 'Pixie cut',      dens: '150 %', lens: [6,8,10],         text: 'Coupe très courte, nuque et oreilles dégagées. Se met en dix secondes.' },
  pixiecurl: { style: 'pixie',   label: 'Pixie bouclé',   dens: '180 %', lens: [6,8,10],         text: 'Petite coupe bouclée, compacte, avec du volume sur le dessus.' },
  braids:    { style: 'tressee', label: 'Box braids',     dens: 'Tresses fines', lens: [24,28,32,36], text: 'Box braids prêtes à poser, légères, sans nœuds visibles à la racine.' },
  locs:      { style: 'tressee', label: 'Faux locs',      dens: 'Locs moyennes', lens: [18,24,30],    text: 'Faux locs souples, aux longueurs irrégulières pour un rendu vraiment naturel.' }
};

const BUILDS = {
  lf134: { label: 'Lace frontal 13x4',    text: 'Dentelle transparente 13x4 prédécoupée : tu peux faire ta raie d’une oreille à l’autre.' },
  lf136: { label: 'Lace frontal 13x6 HD', text: 'Dentelle HD 13x6 : la ligne de naissance est plus profonde et presque invisible sur la peau.' },
  cl44:  { label: 'Closure 4x4',          text: 'Closure 4x4 avec raie au centre. Plus simple à poser, idéale pour débuter.' },
  cl55:  { label: 'Closure 5x5',          text: 'Closure 5x5, un peu plus large : raie centrale ou sur le côté.' },
  full:  { label: 'Full lace',            text: 'Dentelle sur tout le bonnet : toutes les raies sont possibles et les cheveux s’attachent.' },
  gl:    { label: 'Glueless',             text: 'Prête à porter : bonnet ajustable et peignes intégrés, sans colle.' },
  upart: { label: 'U-part',               text: 'Ouverture en U : tes cheveux passent et se mélangent à la perruque, sans dentelle.' },
  vpart: { label: 'V-part',               text: 'Ouverture en V : une pose rapide, sans colle ni dentelle.' },
  band:  { label: 'Headband',             text: 'Bandeau intégré : tu l’enfiles et c’est terminé, sans colle.' }
};

const BUILD_GROUPS = [
  ['frontal',  'Lace frontal',    ['lf134', 'lf136']],
  ['closure',  'Closure',         ['cl44', 'cl55']],
  ['full',     'Full lace',       ['full']],
  ['glueless', 'Glueless',        ['gl']],
  ['part',     'U-part / V-part', ['upart', 'vpart']],
  ['band',     'Headband',        ['band']]
];

/* ---------- Photos réelles (remplacent toutes les illustrations) ---------- */
const PHOTO = n => 'photos/glow-' + String(n).padStart(2, '0') + '.jpg';
const PHOTO_COUNT = 12;
const PHOTO_POOL = {
  lisse: [3, 10, 9, 4, 6], ondulee: [11, 7, 5], bouclee: [12, 2, 8, 1], crepue: [12, 2],
  bob: [6, 7, 8, 2], pixie: [7, 2], tressee: [10, 12]
};
const PHOTO_COLOR = { miel: [1, 5], blond: [3], bordeaux: [8, 4], cuivre: [9, 6], ombre: [1, 9], platine: [3], rose: [8] };

const P = (id, name, shape, build, color, base, tags, extra) =>
  Object.assign({ id, name, shape, build, color, base, tags: tags || '', images: [] }, extra || {});

const PRODUCTS = [
  P('soyeuse',        'Soyeuse',        'straight',  'lf134', 'noir',     95000,  'best'),
  P('bone-royale',    'Bone Royale',    'bone',      'lf134', 'noir',     115000, ''),
  P('satin',          'Satin',          'body',      'lf134', 'brun',     10500, 'best'),
  P('oceane',         'Océane',         'water',     'lf136', 'noir',     12500, 'new'),
  P('profonde',       'Profonde',       'deep',      'lf134', 'noir',     12000, ''),
  P('douce-vague',    'Douce Vague',    'loose',     'cl55',  'miel',     9800,  ''),
  P('ressort',        'Ressort',        'curly',     'lf134', 'noir',     11000, 'best'),
  P('kinky-edge',     'Kinky Edge',     'kinky',     'lf134', 'noir',     10500, ''),
  P('jerry',          'Jerry',          'jerry',     'cl44',  'noir',     6500,  ''),
  P('bob-parisien',   'Bob Parisien',   'bob',       'cl44',  'noir',     6800,  'best'),
  P('bob-vague',      'Bob Vague',      'bobwave',   'lf134', 'brun',     7800,  ''),
  P('bob-boucles',    'Bob Boucles',    'bobcurl',   'cl44',  'noir',     7200,  ''),
  P('pixie',          'Pixie',          'pixie',     'gl',    'noir',     4800,  'new'),
  P('mini-boucles',   'Mini Boucles',   'pixiecurl', 'gl',    'noir',     5000,  ''),
  P('afro-kinky',     'Afro Nuage',     'afro',      'upart', 'noir',     8500,  ''),
  P('soleil',         'Soleil',         'body',      'lf134', 'blond',    14000, 'new'),
  P('miel',           'Miel',           'straight',  'lf134', 'miel',     10800, ''),
  P('grenat',         'Grenat',         'straight',  'lf134', 'bordeaux', 11800, 'new'),
  P('cuivre',         'Cuivre',         'body',      'lf134', 'cuivre',   12500, ''),
  P('ambre',          'Ambre',          'straight',  'lf134', 'ombre',    13000, 'best'),
  P('givre',          'Givre',          'bob',       'cl44',  'platine',  9200,  ''),
  P('wear-go-wave',   'Wear & Go Wave', 'body',      'gl',    'noir',     11500, 'new best'),
  P('wear-go-lisse',  'Wear & Go Lisse','straight',  'gl',    'noir',     10000, ''),
  P('naturelle',      'Naturelle',      'yaki',      'upart', 'noir',     9800,  ''),
  P('v-part-body',    'V-part Body',    'body',      'vpart', 'brun',     10200, ''),
  P('headband-curl',  'Headband Curl',  'curly',     'band',  'noir',     8800,  ''),
  P('rideau',         'Rideau',         'curtain',   'lf134', 'brun',     11200, ''),
  P('box-braids',     'Box Braids',     'braids',    'full',  'noir',     13500, 'new'),
  P('faux-locs',      'Faux Locs',      'locs',      'full',  'noir',     12500, ''),
  P('espagnole',      'Espagnole',      'spanish',   'lf134', 'noir',     11800, ''),
  P('birmane',        'Birmane',        'burmese',   'lf134', 'noir',     11200, ''),
  P('degrade',        'Dégradé',        'layers',    'lf134', 'miel',     10800, ''),
  P('full-lace',      'Full Lace',      'straight',  'full',  'noir',     16000, ''),
  P('rose-poudre',    'Rose Poudré',    'bob',       'cl44',  'rose',     8500,  '')
];
{ // attribue à chaque perruque une photo proche de son style (les photos peuvent se répéter)
  const used = {};
  PRODUCTS.forEach(p => {
    const pool = PHOTO_COLOR[p.color] || PHOTO_POOL[SHAPES[p.shape].style] || [1];
    const k = pool.join();
    used[k] = used[k] || 0;
    p.photo = pool[used[k]++ % pool.length];
    p.images = [PHOTO(p.photo)];
  });
}

/* ---------- Illustrations de remplacement (tu les remplaces par tes photos) ---------- */
let uid = 0;
const hex2rgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const mix = (a, b, t) => { const x = hex2rgb(a), y = hex2rgb(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
function rng(seed){
  let s = 0; for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function edge(x1, y1, x2, y2, amp, n){
  if (!amp || n < 2) return 'L' + x2.toFixed(1) + ' ' + y2.toFixed(1);
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len; let d = '';
  for (let i = 1; i <= n; i++){
    const t = i / n, tm = (i - .5) / n, s = i % 2 ? 1 : -1;
    d += 'Q' + (x1 + dx * tm + nx * amp * s).toFixed(1) + ' ' + (y1 + dy * tm + ny * amp * s).toFixed(1) + ' ' + (x1 + dx * t).toFixed(1) + ' ' + (y1 + dy * t).toFixed(1);
  }
  return d;
}
function flowPath(g){
  const b = g.b, w = g.w, a = g.a, n = g.n;
  const bottom = a ? edge(200 + w, b, 200 - w, b, a * .7, Math.max(4, Math.round(w / 16))) : 'Q200 ' + (b + 16) + ' ' + (200 - w) + ' ' + b;
  return 'M200 94C268 94 286 150 286 196' + edge(286, 196, 200 + w, b, a, n) + bottom + edge(200 - w, b, 114, 196, a, n) + 'C114 150 132 94 200 94Z';
}
const G = {
  straight: { b: 425, w: 92, a: 0, n: 1 },   bone: { b: 452, w: 88, a: 0, n: 1 },
  yaki: { b: 412, w: 94, a: 3, n: 9 },       layers: { b: 405, w: 94, a: 2, n: 4, layer: 1 },
  curtain: { b: 418, w: 92, a: 0, n: 1, fringe: 1 },
  body: { b: 415, w: 98, a: 9, n: 5 },       loose: { b: 418, w: 100, a: 14, n: 4 },
  water: { b: 402, w: 104, a: 11, n: 10 },   deep: { b: 402, w: 106, a: 16, n: 7 },
  spanish: { b: 404, w: 104, a: 15, n: 11 },
  bob: { b: 300, w: 86, a: 0, n: 1 },        bobwave: { b: 308, w: 92, a: 8, n: 3 },
  curly: { kind: 'curl', b: 400, w: 104, rad: [15, 21], gap: 17 },
  burmese: { kind: 'curl', b: 410, w: 106, rad: [19, 25], gap: 20 },
  jerry: { kind: 'curl', b: 318, w: 90, rad: [10, 13], gap: 12 },
  kinky: { kind: 'curl', b: 340, w: 94, rad: [9, 12], gap: 11 },
  bobcurl: { kind: 'curl', b: 318, w: 96, rad: [14, 18], gap: 15 },
  afro: { kind: 'afro' }, pixie: { kind: 'pixie' }, pixiecurl: { kind: 'pixie', curl: 1 },
  braids: { kind: 'braid', b: 455, w: 100, thick: 9, step: 11 },
  locs: { kind: 'braid', b: 420, w: 98, thick: 12, step: 14, irr: 1 }
};
const VB = ['0 0 400 500', '112 92 176 220', '90 225 220 275'];

function wigSvg(p, view){
  view = view || 0;
  const g = G[p.shape], col = COLORS[p.color], n = ++uid, TAU = Math.PI * 2;
  const c = col.hex, c2 = col.hex2 || col.hex, hi = mix(c, '#ffffff', .3), lo = mix(c, '#000000', .38);
  const r = rng(p.id + p.shape), lace = /^(lf|full)/.test(p.build);
  const gb = Math.max(g.b || 400, 380);
  let hair = '';
  const fill = 'url(#hg' + n + ')';
  const circ = (x, y, rr) => {
    hair += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + rr.toFixed(1) + '" fill="' + fill + '" stroke="' + lo + '" stroke-width="1"/>';
    if (rr > 13) hair += '<circle cx="' + (x - rr * .28).toFixed(1) + '" cy="' + (y - rr * .3).toFixed(1) + '" r="' + (rr * .34).toFixed(1) + '" fill="' + hi + '" opacity=".28"/>';
  };
  const k = g.kind || 'flow';
  if (k === 'flow'){
    hair = '<path d="' + flowPath(g) + '" fill="' + fill + '" stroke="' + lo + '" stroke-width="1"/>';
    let sd = '';
    for (let i = 0; i < 18; i++){ const t = i / 17, x0 = 146 + t * 108, xb = 200 + (t - .5) * 2 * g.w * .96; sd += 'M' + x0.toFixed(1) + ' 110' + edge(x0, 110, xb, g.b - 8, g.a * .45, g.n); }
    hair += '<path d="' + sd + '" fill="none" stroke="' + hi + '" stroke-width=".9" opacity=".3"/>';
    if (g.layer) hair += '<path d="' + flowPath({ b: g.b - 70, w: g.w - 10, a: g.a, n: g.n }) + '" fill="' + hi + '" opacity=".16"/>';
    const sy = 150 + (g.b - 150) * .45, sr = (g.b - 130) * .27;
    hair += '<ellipse cx="150" cy="' + sy + '" rx="13" ry="' + sr + '" fill="#fff" opacity=".1" transform="rotate(8 150 ' + sy + ')"/><ellipse cx="254" cy="' + (sy + 20) + '" rx="9" ry="' + (sr * .8) + '" fill="#fff" opacity=".07" transform="rotate(-8 254 ' + (sy + 20) + ')"/>';
  } else if (k === 'curl'){
    hair = '<path d="' + flowPath({ b: g.b, w: g.w - 8, a: 0, n: 1 }) + '" fill="' + lo + '"/>';
    const r0 = g.rad[0], r1 = g.rad[1];
    for (let y = 100; y < g.b; y += g.gap){
      const hw = Math.min(g.w, 52 + (y - 96) * .78);
      [-1, 1].forEach(s => {
        circ(200 + s * (hw - r0 * .5 + r() * 5), y + r() * 5, r0 + r() * (r1 - r0));
        circ(200 + s * (hw * .62 + r() * 8), y + g.gap * .5 + r() * 4, r0 + r() * (r1 - r0));
      });
    }
    for (let x = 146; x <= 254; x += g.gap * .9) circ(x + r() * 4, 104 + r() * 8, r0 + r() * (r1 - r0));
  } else if (k === 'afro'){
    hair = '<circle cx="200" cy="188" r="116" fill="' + lo + '"/>';
    [[26, 106, 20, 26], [20, 80, 20, 25], [12, 50, 18, 22]].forEach(q => {
      for (let i = 0; i < q[0]; i++){ const an = i / q[0] * TAU + r() * .2; circ(200 + Math.cos(an) * q[1] * 1.02, 188 + Math.sin(an) * q[1] * .98, q[2] + r() * (q[3] - q[2])); }
    });
  } else if (k === 'pixie'){
    hair = '<path d="M136 202C126 98 274 98 264 202L262 262Q246 246 242 226L158 226Q154 246 138 262Z" fill="' + fill + '" stroke="' + lo + '"/>';
    if (g.curl){
      for (let i = 0; i < 30; i++){ const an = Math.PI + i / 29 * Math.PI; circ(200 + Math.cos(an) * 66, 176 + Math.sin(an) * 74, 10 + r() * 3); }
      for (let i = 0; i < 20; i++){ const an = Math.PI + i / 19 * Math.PI; circ(200 + Math.cos(an) * 46, 170 + Math.sin(an) * 56, 9 + r() * 3); }
      circ(139, 238, 11); circ(261, 238, 11); circ(142, 258, 9); circ(258, 258, 9);
    } else {
      let wd = '';
      for (let i = 0; i < 28; i++){ const x = 140 + r() * 120, y = 104 + r() * 46; wd += 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'q' + ((x - 200) * .12).toFixed(1) + ' 14 ' + ((x - 200) * .25).toFixed(1) + ' 30'; }
      hair += '<path d="' + wd + '" fill="none" stroke="' + hi + '" stroke-width="1" opacity=".35"/>';
    }
  } else {
    hair = '<path d="M114 196C114 140 132 96 200 96C268 96 286 140 286 196L286 215L114 215Z" fill="' + lo + '"/>';
    for (let x = 200 - g.w; x <= 200 + g.w; x += g.step){
      const dx = x - 200, y0 = 98 + Math.pow(Math.abs(dx) / g.w, 2.2) * 78;
      const xb = 200 + dx * 1.04 + (g.irr ? (r() - .5) * 8 : 0), yb = g.b - (g.irr ? r() * 40 : r() * 10);
      const d = 'M' + x + ' ' + y0.toFixed(1) + edge(x, y0, xb, yb, g.thick * .22, Math.max(4, Math.round((yb - y0) / 22)));
      hair += '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="' + g.thick + '" stroke-linecap="round"/><path d="' + d + '" fill="none" stroke="' + lo + '" stroke-width="' + (g.thick * .85) + '" stroke-dasharray="1.2 ' + (g.irr ? 8 : 5.5) + '" opacity=".55"/>';
    }
  }
  /* Éléments posés au-dessus du visage : naissance des cheveux, raie, frange, bandeau */
  let front = '<path d="M143 206C138 126 262 126 257 206C250 168 226 150 200 150C174 150 150 168 143 206Z" fill="' + fill + '" stroke="' + lo + '" stroke-width=".8"/>';
  if (lace) front += '<path d="M147 190C160 164 182 152 200 152C218 152 240 164 253 190" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.2"/>';
  if (k === 'flow' && !g.fringe) front += '<path d="M200 128V152" stroke="' + lo + '" stroke-width="1.6"/>';
  if (g.fringe) front += '<path d="M143 214C138 120 262 120 257 214C238 178 214 164 200 166C186 164 162 178 143 214Z" fill="' + fill + '" stroke="' + lo + '" stroke-width=".8"/><path d="M200 126C196 150 170 172 150 196M200 126C204 150 230 172 250 196" fill="none" stroke="' + hi + '" stroke-width="1" opacity=".4"/>';
  if (p.build === 'band') front += '<path d="M140 170C160 138 240 138 260 170" fill="none" stroke="#2b211c" stroke-width="13" stroke-linecap="round"/><path d="M144 166C164 136 236 136 256 166" fill="none" stroke="#d6b676" stroke-width="1.2" opacity=".8"/>';

  const grad = '<linearGradient id="hg' + n + '" gradientUnits="userSpaceOnUse" x1="0" y1="100" x2="0" y2="' + gb + '"><stop offset="0" stop-color="' + c + '"/><stop offset=".4" stop-color="' + c + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>' +
    '<radialGradient id="fc' + n + '" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#dccdb9"/><stop offset="1" stop-color="#ad987f"/></radialGradient>';
  const bust = '<rect x="178" y="250" width="44" height="92" fill="#b3a08a"/><path d="M30 500C30 410 104 346 178 336H222C296 346 370 410 370 500Z" fill="#bfae98"/><ellipse cx="200" cy="264" rx="30" ry="9" fill="#000" opacity=".12"/>';
  const face = '<ellipse cx="200" cy="206" rx="52" ry="68" fill="url(#fc' + n + ')"/>';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (VB[view] || VB[0]) + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration de la perruque ' + String(p.name).replace(/&/g, '&amp;') + '"><defs>' + grad +
    '<clipPath id="cl' + n + '"><path d="M0 0H400V500H232V255H168V500H0Z"/></clipPath><g id="h' + n + '">' + hair + '</g></defs>' +
    '<use href="#h' + n + '"/>' + bust + '<use href="#h' + n + '" clip-path="url(#cl' + n + ')"/>' + face + front + '</svg>';
}

/* =====================================================================
   OUTILS
   ===================================================================== */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
const priceFor = (p, i) => Math.round(p.base * (1 + LENGTH_STEP * i) / 500) * 500;
const lensOf = p => p.lens || SHAPES[p.shape].lens;
const styleOf = p => SHAPES[p.shape].style;
const byId = id => PRODUCTS.find(p => p.id === id);
const has = (p, t) => p.tags.split(' ').indexOf(t) > -1;
const waLink = t => 'https://wa.me/' + BRAND.whatsapp + '?text=' + encodeURIComponent(t);
const igLink = 'https://instagram.com/' + BRAND.instagram;
function wig(p, view){
  const n = view ? ((p.photo - 1 + view * 5) % PHOTO_COUNT) + 1 : p.photo;
  return `<img src="${PHOTO(n)}" alt="${esc(p.name)}" loading="lazy">`;
}
const visual = (p, i) => (p.images && p.images[i])
  ? `<img src="${esc(p.images[i])}" alt="${esc(p.name)}, vue ${i + 1}" loading="lazy">`
  : wig(p, i);
const CAPS = [['S', '52–54 cm'], ['M', '55–57 cm'], ['L', '58–60 cm']];
const styleLabel = k => (STYLES.find(s => s[0] === k) || [0, k])[1];

function card(p, i){
  const sh = SHAPES[p.shape], bd = BUILDS[p.build];
  const badge = has(p, 'new') ? '<span class="badge">Nouveau</span>' : has(p, 'best') ? '<span class="badge">Best-seller</span>' : '';
  return `<article class="card" style="--i:${Math.min(i || 0, 14)}"><a class="card-img" href="#produit-${p.id}" data-link aria-label="${esc(p.name)}">${badge}${visual(p, 0)}</a>
    <div><h3><a href="#produit-${p.id}" data-link>${esc(p.name)}</a></h3><p class="meta">${sh.label} · ${bd.label}</p><p class="price">À partir de ${money(p.base)}</p></div></article>`;
}

/* ---------- Panier (mémorisé dans le navigateur quand c'est possible) ---------- */
let memCart = [];
function loadCart(){
  try { const v = JSON.parse(localStorage.getItem('gbn-cart') || '[]'); return Array.isArray(v) ? v.filter(i => byId(i.id)) : []; }
  catch (e) { return memCart; }
}
let cart = loadCart();
let lastCount = cart.reduce((s, i) => s + i.qty, 0);
function saveCart(){
  memCart = cart;
  try { localStorage.setItem('gbn-cart', JSON.stringify(cart)); } catch (e) {}
  const n = cart.reduce((s, i) => s + i.qty, 0), el = $('#cartCount');
  el.textContent = n;
  if (n > lastCount){ el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
  lastCount = n;
}

let toastTimer;
function toast(html){
  const t = $('#toast'); t.innerHTML = html; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 4200);
}

/* =====================================================================
   PAGES
   ===================================================================== */
/* Bandeau qui défile : le contenu est écrit deux fois pour que la boucle soit continue */
function marq(fn, cls, dur){
  return `<div class="marq ${cls || ''}" style="--dur:${dur || 40}s"><div class="marq-track"><div class="marq-group">${fn()}</div><div class="marq-group" aria-hidden="true">${fn().replace(/<a /g, '<a tabindex="-1" ')}</div></div></div>`;
}

function pageHome(){
  const nw = PRODUCTS.filter(p => has(p, 'new')).slice(0, 8);
  const best = PRODUCTS.filter(p => has(p, 'best')).slice(0, 5);
  const rep = { lisse: 'soyeuse', ondulee: 'satin', bouclee: 'ressort', crepue: 'afro-kinky', bob: 'bob-parisien', pixie: 'pixie', tressee: 'box-braids' };
  const count = s => PRODUCTS.filter(p => styleOf(p) === s).length;
  const tile = (s, cls) => `<a class="tile ${cls || ''}" href="#boutique-${s}" data-link>${wig(byId(rep[s]))}<span class="lab"><b>${styleLabel(s)}</b><span>${count(s)} modèles</span></span></a>`;
  const insta = [['satin', 0], ['ressort', 1], ['oceane', 2], ['bob-parisien', 0], ['soleil', 1], ['box-braids', 2]]
    .map(x => `<a href="${igLink}" target="_blank" rel="noopener" aria-label="Voir sur Instagram">${wig(byId(x[0]), x[1])}</a>`).join('');
  const reviews = REVIEWS.map(r => `<figure class="quote rv" style="margin:0"><blockquote>« ${esc(r.text)} »</blockquote><cite>${esc(r.name)}, ${esc(r.city)}</cite>${r.sample ? '<span class="tag">Exemple à remplacer</span>' : ''}</figure>`).join('');
  const heroIds = ['soyeuse', 'soleil', 'ressort', 'rose-poudre', 'ambre', 'satin'];
  const sideIds = ['oceane', 'box-braids', 'pixie', 'bob-parisien'];
  const slides = ids => ids.map((id, i) => `<div class="slide${i === 0 ? ' on' : ''}" data-id="${id}">${wig(byId(id))}</div>`).join('');
  const first = byId(heroIds[0]);
  const band = ['Livraison partout au Cameroun', 'Paiement à la livraison', 'MTN MoMo et Orange Money', 'Conseils sur WhatsApp', 'Perruques en cheveux naturels'];
  const bandHtml = () => band.concat(band).map(t => `<span>${t}</span><i class="spark"></i>`).join('');
  const big = ['Lace frontal', 'Body wave', 'Bob', 'Pixie', 'Curly', 'Closure', 'Glueless', 'Box braids', 'Water wave', 'Bone straight', 'Afro kinky', 'Faux locs'];
  const bigHtml = () => big.map(t => `<span>${t}</span><i class="spark pk"></i>`).join('');
  return `
  <div class="hero-wrap">
    <i class="blob b1"></i><i class="blob b2"></i>
    <section class="wrap hero">
      <div>
        <p class="eyebrow">Perruques haut de gamme · Cameroun</p>
        <h1><span class="ln"><span>Ton éclat,</span></span><span class="ln"><span><em>sans effort.</em></span></span></h1>
        <p class="lede">Des perruques en cheveux naturels, choisies une à une, prêtes à porter et livrées partout au Cameroun.</p>
        <div class="cta">
          <a class="btn" href="#boutique" data-link>Voir la boutique</a>
          <a class="btn ghost" href="${waLink('Bonjour ' + BRAND.full + ', j’aimerais être conseillée pour choisir une perruque.')}" target="_blank" rel="noopener">Commander sur WhatsApp</a>
        </div>
        <ul class="facts">
          <li><b>13x4 · 13x6 · 5x5</b><span>Dentelle et closure</span></li>
          <li><b>150 – 200 %</b><span>Densité</span></li>
          <li><b>6" – 36"</b><span>Longueurs</span></li>
        </ul>
      </div>
      <div class="hero-art">
        <i class="spark" style="top:2%;left:4%;--s:24px"></i>
        <i class="spark pk" style="top:16%;right:-1%;--s:18px;animation-delay:-1s"></i>
        <i class="spark" style="bottom:26%;left:40%;--s:14px;animation-delay:-2s"></i>
        <i class="spark pk" style="top:50%;left:-3%;--s:20px;animation-delay:-.5s"></i>
        <div class="arch big" data-slider="main" data-ms="3800"><div class="slides">${slides(heroIds)}</div></div>
        <div class="arch small" data-slider="side" data-ms="3000"><div class="slides">${slides(sideIds)}</div></div>
        <a class="slide-cap" id="heroCap" href="#produit-${first.id}" data-link><b>${esc(first.name)}</b><span>${money(first.base)}</span></a>
      </div>
    </section>
  </div>
  <div class="band-pink">${marq(bandHtml, '', 34)}</div>

  <section class="wrap sec">
    <div class="sec-head rv"><h2>Tous les <em>styles</em></h2><a class="more" href="#boutique" data-link>Toute la boutique</a></div>
    <div class="styles">
      ${tile('lisse', 'lg')}${tile('ondulee')}${tile('bouclee')}${tile('crepue')}${tile('bob')}${tile('pixie')}${tile('tressee')}
      <a class="tile wide" href="#boutique" data-link><b>${PRODUCTS.length} perruques,<br><em>un seul éclat.</em></b><span>Tout voir</span></a>
    </div>
  </section>

  <div class="band-big" aria-hidden="true">${marq(bigHtml, 'rev', 55)}</div>

  <section class="wrap sec">
    <div class="sec-head rv"><h2>Les <em>nouveautés</em></h2><a class="more" href="#boutique-nouveautes" data-link>Tout voir</a></div>
    ${marq(() => nw.map(card).join(''), 'cards', 55)}
  </section>

  <section class="wrap sec" style="padding-top:8px">
    <div class="split">
      <div class="rv rv-l">
        <p class="eyebrow">Taille de bonnet</p>
        <h2>Une perruque qui tient se joue en <em>quelques centimètres.</em></h2>
        <div class="prose"><p>Mesure le tour de ta tête avec un mètre ruban souple, de la naissance des cheveux au-dessus des oreilles, jusqu’à la nuque. Entre deux tailles, prends la plus petite : les sangles réglables font le reste.</p></div>
        <p style="margin-top:24px"><a class="more" href="#guide" data-link>Guide complet</a></p>
      </div>
      <div class="table-wrap rv rv-r">
        <table class="tbl"><thead><tr><th scope="col">Bonnet</th><th scope="col">Tour de tête</th><th scope="col">Pour</th></tr></thead>
        <tbody><tr><td>S</td><td>52 – 54 cm</td><td>Petite tête, ados</td></tr><tr><td>M</td><td>55 – 57 cm</td><td>Taille la plus courante</td></tr><tr><td>L</td><td>58 – 60 cm</td><td>Tête plus large, cheveux épais</td></tr></tbody></table>
      </div>
    </div>
  </section>

  <section class="wrap sec" style="padding-top:8px">
    <div class="sec-head rv"><h2>Les <em>best-sellers</em></h2><a class="more" href="#boutique-best" data-link>Tout voir</a></div>
    <div class="best">${best.map(card).join('')}</div>
  </section>

  <section class="wrap sec" style="padding-top:8px">
    <div class="sec-head rv"><h2>En <em>vidéo</em></h2></div>
    <div class="vid rv"><video controls playsinline preload="metadata" poster="videos/glow-video.jpg"><source src="videos/glow-video.mp4" type="video/mp4"></video></div>
  </section>

  <section class="wrap sec">
    <div class="sec-head rv"><h2>Elles en <em>parlent</em></h2></div>
    <div class="quotes">${reviews}</div>
  </section>

  <section class="wrap sec" style="padding-top:8px">
    <div class="sec-head rv"><h2>Sur <em>Instagram</em></h2><a class="more" href="${igLink}" target="_blank" rel="noopener">@${esc(BRAND.instagram)}</a></div>
    <div class="insta rv">${insta}</div>
  </section>`;
}

/* ---------- Mouvement : carrousel, apparitions, étincelles ---------- */
let timers = [];
function stopSliders(){ timers.forEach(t => clearInterval(t)); timers = []; }
function updateCap(sl){
  const cap = $('#heroCap'), p = byId(sl.dataset.id);
  if (!cap || !p) return;
  cap.href = '#produit-' + p.id;
  cap.innerHTML = '<b>' + esc(p.name) + '</b><span>' + money(p.base) + '</span>';
}
function startSliders(){
  stopSliders();
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  $$('[data-slider]').forEach(root => {
    const sl = $$('.slide', root);
    if (sl.length < 2) return;
    let i = 0;
    timers.push(setInterval(() => {
      const prev = sl[i]; i = (i + 1) % sl.length; const nx = sl[i];
      prev.classList.remove('on'); prev.classList.add('out'); nx.classList.add('on');
      setTimeout(() => prev.classList.remove('out'), 1000);
      if (root.dataset.slider === 'main') updateCap(nx);
    }, +root.dataset.ms || 3800));
  });
}
/* Pour les navigateurs sans animation liée au défilement : apparition au passage, avec un filet de sécurité */
function initReveal(){
  if (window.CSS && CSS.supports && CSS.supports('animation-timeline: view()')) return;
  if (!('IntersectionObserver' in window)) return;
  const els = $$('.rv', view);
  els.forEach(e => e.classList.add('pre'));
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .1 });
  els.forEach(e => io.observe(e));
  setTimeout(() => els.forEach(e => e.classList.add('in')), 4000);
}
function burst(el){
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 14; i++){
    const s = document.createElement('i'), an = i / 14 * Math.PI * 2, d = 50 + Math.random() * 60;
    s.className = 'spark pop' + (i % 2 ? ' pk' : '');
    s.style.cssText = 'left:' + (r.left + r.width / 2) + 'px;top:' + (r.top + r.height / 2) + 'px;--dx:' + Math.cos(an) * d + 'px;--dy:' + Math.sin(an) * d + 'px;--s:' + (10 + Math.random() * 12) + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}

/* ---------- Boutique ---------- */
const MINP = Math.floor(Math.min.apply(null, PRODUCTS.map(p => p.base)) / 5000) * 5000;
const MAXP = Math.ceil(Math.max.apply(null, PRODUCTS.map(p => p.base)) / 5000) * 5000;
const LENR = [['court', 'Court · jusqu’à 12"', 0, 12], ['mi', 'Mi-long · 14" à 20"', 13, 20], ['long', 'Long · 22" à 26"', 21, 27], ['xl', 'Très long · 28" et plus', 28, 99]];
let F = null;
function resetF(tok){
  F = { style: new Set(), build: new Set(), color: new Set(), len: '', flag: '', max: MAXP, q: '', sort: 'nouv' };
  if (tok === 'nouveautes') F.flag = 'new';
  else if (tok === 'best') F.flag = 'best';
  else if (STYLES.some(s => s[0] === tok)) F.style.add(tok);
}
const chip = (k, v, l, on) => `<button class="chip" type="button" data-f="${k}" data-v="${v}" aria-pressed="${!!on}">${l}</button>`;
function pageShop(tok){
  resetF(tok);
  const filters = `
    <div class="fgroup"><h4>Rechercher</h4><input id="q" type="search" placeholder="Nom, texture, couleur" aria-label="Rechercher une perruque"></div>
    <div class="fgroup"><h4>Sélection</h4><div class="chips">${chip('flag', 'new', 'Nouveautés', F.flag === 'new')}${chip('flag', 'best', 'Best-sellers', F.flag === 'best')}</div></div>
    <div class="fgroup"><h4>Style</h4><div class="chips">${STYLES.map(s => chip('style', s[0], s[1], F.style.has(s[0]))).join('')}</div></div>
    <div class="fgroup"><h4>Finition</h4><div class="chips">${BUILD_GROUPS.map(g => chip('build', g[0], g[1], false)).join('')}</div></div>
    <div class="fgroup"><h4>Longueur</h4><div class="chips">${LENR.map(r => chip('len', r[0], r[1], false)).join('')}</div></div>
    <div class="fgroup"><h4>Couleur</h4><div class="chips">${Object.keys(COLORS).map(k => `<button class="sw" type="button" style="--c:${COLORS[k].hex2 ? 'linear-gradient(135deg,' + COLORS[k].hex + ' 50%,' + COLORS[k].hex2 + ' 50%)' : COLORS[k].hex}" data-f="color" data-v="${k}" aria-pressed="false" aria-label="${COLORS[k].label}" title="${COLORS[k].label}"></button>`).join('')}</div></div>
    <div class="fgroup"><h4>Prix maximum</h4><input id="max" type="range" min="${MINP}" max="${MAXP}" step="5000" value="${MAXP}" aria-label="Prix maximum"><p class="range-out" id="maxOut">${money(MAXP)}</p></div>
    <button class="btn ghost" type="button" data-act="reset">Réinitialiser</button>`;
  return `
  <section class="wrap">
    <div class="shop-head">
      <div><p class="eyebrow">Perruques</p><h1 class="page-title">La <em>boutique</em></h1><p class="muted" id="count" aria-live="polite"></p></div>
      <div class="sort"><label for="sort">Trier</label><select id="sort"><option value="nouv">Nouveautés</option><option value="pop">Les plus aimées</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option></select></div>
    </div>
    <div class="shop-body">
      <div style="display:contents"><button class="btn ghost filt-toggle" type="button" data-act="filt" aria-expanded="false" aria-controls="filters">Filtres</button>
      <aside class="filters" id="filters" aria-label="Filtres">${filters}</aside></div>
      <div class="grid" id="grid"></div>
    </div>
  </section>`;
}
function filtered(){
  const q = F.q.trim().toLowerCase();
  const L = PRODUCTS.filter(p => {
    if (F.style.size && !F.style.has(styleOf(p))) return false;
    if (F.build.size && !Array.from(F.build).some(g => BUILD_GROUPS.find(x => x[0] === g)[2].indexOf(p.build) > -1)) return false;
    if (F.color.size && !F.color.has(p.color)) return false;
    if (F.flag && !has(p, F.flag)) return false;
    if (F.len){ const r = LENR.find(x => x[0] === F.len); if (!lensOf(p).some(l => l >= r[2] && l <= r[3])) return false; }
    if (p.base > F.max) return false;
    if (q && (p.name + ' ' + SHAPES[p.shape].label + ' ' + BUILDS[p.build].label + ' ' + COLORS[p.color].label + ' ' + styleLabel(styleOf(p))).toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
  if (F.sort === 'nouv') L.sort((a, b) => Number(has(b, 'new')) - Number(has(a, 'new')));
  else if (F.sort === 'pop') L.sort((a, b) => Number(has(b, 'best')) - Number(has(a, 'best')));
  else if (F.sort === 'asc') L.sort((a, b) => a.base - b.base);
  else if (F.sort === 'desc') L.sort((a, b) => b.base - a.base);
  return L;
}
function refreshGrid(){
  const L = filtered();
  $('#count').textContent = L.length + (L.length > 1 ? ' perruques' : ' perruque');
  $('#grid').innerHTML = L.length ? L.map(card).join('') :
    `<div class="empty"><h3>Aucune perruque ne correspond</h3><p class="muted">Élargis tes filtres, ou écris-nous : on cherche le modèle pour toi.</p>
    <div class="cta" style="margin:0;justify-content:center"><button class="btn" type="button" data-act="reset">Réinitialiser</button><a class="btn ghost" href="${waLink('Bonjour, je cherche une perruque : ')}" target="_blank" rel="noopener">Demander sur WhatsApp</a></div></div>`;
}

/* ---------- Fiche produit ---------- */
let S = null;
function pagePdp(id){
  const p = byId(id);
  if (!p) return pageMissing();
  S = { p, len: 0, cap: 'M', qty: 1 };
  const sh = SHAPES[p.shape], bd = BUILDS[p.build], col = COLORS[p.color], lens = lensOf(p);
  const views = p.images.length ? p.images.map((x, i) => i) : [0, 1, 2];
  const thumbs = views.map(i => `<button class="thumb" type="button" data-act="view" data-i="${i}" aria-pressed="${i === 0}" aria-label="Vue ${i + 1}">${visual(p, i)}</button>`).join('');
  const rel = PRODUCTS.filter(x => x.id !== p.id && styleOf(x) === styleOf(p)).concat(PRODUCTS.filter(x => x.id !== p.id && styleOf(x) !== styleOf(p))).slice(0, 4);
  return `
  <section class="wrap">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="#accueil" data-link>Accueil</a> / <a href="#boutique" data-link>Boutique</a> / ${esc(p.name)}</nav>
    <div class="pdp-grid">
      <div class="gallery"><div class="main-img" id="mainImg">${visual(p, 0)}</div><div class="thumbs">${thumbs}</div></div>
      <div class="info">
        <p class="eyebrow">${sh.label} · ${bd.label}</p>
        <h1>${esc(p.name)}</h1>
        <p class="price" id="pPrice"></p>
        <p class="desc">${sh.text} ${bd.text}</p>
        <fieldset class="opt-group"><legend>Longueur</legend><div class="opts">${lens.map((l, i) => `<button class="opt" type="button" data-act="len" data-i="${i}" aria-pressed="${i === 0}">${l}"</button>`).join('')}</div></fieldset>
        <fieldset class="opt-group"><legend><span>Taille de bonnet</span><a href="#guide" data-link>Comment mesurer</a></legend><div class="opts">${CAPS.map(c => `<button class="opt" type="button" data-act="cap" data-v="${c[0]}" aria-pressed="${c[0] === 'M'}">${c[0]}<small>${c[1]}</small></button>`).join('')}</div></fieldset>
        <div class="opt-group"><div class="color-line"><i style="--c:${col.hex2 ? 'linear-gradient(135deg,' + col.hex + ' 50%,' + col.hex2 + ' 50%)' : col.hex}"></i><span>${col.label}</span></div></div>
        <div class="buy">
          <div class="stepper" role="group" aria-label="Quantité"><button type="button" data-act="qminus" aria-label="Moins">−</button><span id="qty">1</span><button type="button" data-act="qplus" aria-label="Plus">+</button></div>
          <button class="btn" type="button" data-act="add">Ajouter au panier</button>
        </div>
        <a class="btn ghost block" id="pWa" href="#" target="_blank" rel="noopener">Commander sur WhatsApp</a>
        <div style="margin-top:32px">
          <details open><summary>Caractéristiques</summary><dl class="specs">
            <dt>Matière</dt><dd>${MATERIAL}</dd><dt>Densité</dt><dd>${sh.dens}</dd><dt>Finition</dt><dd>${bd.label}</dd>
            <dt>Longueurs</dt><dd>${lens.join('", ')}"</dd><dt>Couleur</dt><dd>${col.label}</dd><dt>Bonnet</dt><dd>S, M ou L, avec sangles réglables</dd></dl></details>
          <details><summary>Entretien</summary><p>Shampoing sans sulfate, eau tiède, séchage à l’air sur un support. Chaleur jusqu’à 180 °C avec un protecteur thermique. <a href="#guide" data-link style="text-decoration:underline">Voir le guide</a>.</p></details>
          <details><summary>Livraison et retours</summary><p>Livraison à Douala, Yaoundé et dans tout le Cameroun. Paiement à la livraison, MTN MoMo, Orange Money ou carte. Une perruque portée, lavée ou coupée ne peut pas être reprise.</p></details>
        </div>
      </div>
    </div>
  </section>
  <section class="wrap sec"><div class="sec-head"><h2>Tu aimeras <em>aussi</em></h2></div><div class="grid">${rel.map(card).join('')}</div></section>`;
}
function updatePdp(){
  const p = S.p, lens = lensOf(p), col = COLORS[p.color];
  $('#pPrice').textContent = money(priceFor(p, S.len));
  $$('[data-act="len"]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.i === S.len)));
  $$('[data-act="cap"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === S.cap)));
  $('#qty').textContent = S.qty;
  $('#pWa').href = waLink(`Bonjour ${BRAND.full}, je souhaite commander : ${p.name} (${SHAPES[p.shape].label}, ${BUILDS[p.build].label}), ${lens[S.len]}", bonnet ${S.cap}, ${col.label}, quantité ${S.qty}. Prix : ${money(priceFor(p, S.len) * S.qty)}.`);
}

/* ---------- Panier et commande ---------- */
const PAYOPTS = [
  ['cod', 'Paiement à la livraison', 'Tu paies à la réception de ta perruque.'],
  ['momo', 'MTN Mobile Money', 'Numéro : ' + PAY.momo],
  ['om', 'Orange Money', 'Numéro : ' + PAY.om],
  ['card', 'Carte bancaire', 'Un lien de paiement t’est envoyé sur WhatsApp.']
];
function pageCart(){
  return `
  <section class="wrap">
    <div class="shop-head"><div><p class="eyebrow">Commande</p><h1 class="page-title">Ton <em>panier</em></h1></div></div>
    <div class="cart-grid">
      <div id="lines"></div>
      <aside class="summary" id="aside">
        <div id="sum"></div>
        <form class="form" id="ck">
          <label class="f"><span>Nom</span><input id="ck-name" name="name" autocomplete="name" required></label>
          <label class="f"><span>Téléphone WhatsApp</span><input id="ck-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
          <label class="f"><span>Ville</span><select id="ck-city" name="city" required><option value="">Choisir…</option>${DELIVERY.map(d => `<option value="${d.id}">${d.label}</option>`).join('')}</select></label>
          <label class="f"><span>Quartier et repère</span><input id="ck-addr" name="addr" autocomplete="street-address" required></label>
          <fieldset class="pay"><legend>Paiement</legend>${PAYOPTS.map((o, i) => `<label><input type="radio" name="pay" value="${o[0]}" ${i === 0 ? 'checked' : ''}><span>${o[1]}<small>${o[2]}</small></span></label>`).join('')}</fieldset>
          <label class="f"><span>Remarque (facultatif)</span><textarea id="ck-note" name="note" style="min-height:80px"></textarea></label>
          <button class="btn block" type="submit">Confirmer ma commande</button>
          <p class="notice">La commande est finalisée sur WhatsApp : tu envoies le récapitulatif et on confirme la disponibilité avec toi.</p>
        </form>
        <div class="done" id="ckDone" hidden></div>
      </aside>
    </div>
  </section>`;
}
function totals(){
  const sub = cart.reduce((s, it) => { const p = byId(it.id); return p ? s + priceFor(p, it.len) * it.qty : s; }, 0);
  const c = $('#ck-city'), d = c && DELIVERY.find(x => x.id === c.value);
  return { sub, fee: d ? d.fee : null, city: d ? d.label : '', total: sub + (d ? d.fee : 0) };
}
function renderCart(){
  const lines = $('#lines'), aside = $('#aside');
  if (!cart.length){
    lines.innerHTML = `<div class="empty" style="margin-top:0"><h3>Ton panier est vide</h3><p class="muted">Choisis une perruque, longueur et bonnet compris, puis reviens ici.</p><a class="btn" href="#boutique" data-link>Voir la boutique</a></div>`;
    aside.hidden = true; return;
  }
  aside.hidden = false;
  lines.innerHTML = cart.map((it, i) => {
    const p = byId(it.id), L = lensOf(p)[it.len] || lensOf(p)[0];
    return `<div class="line"><a class="line-img" href="#produit-${p.id}" data-link>${visual(p, 0)}</a>
      <div><h3>${esc(p.name)}</h3><p class="meta">${L}" · Bonnet ${it.cap} · ${COLORS[p.color].label}</p><button class="link" type="button" data-act="rm" data-i="${i}">Retirer</button></div>
      <div class="stepper"><button type="button" data-act="dec" data-i="${i}" aria-label="Moins">−</button><span>${it.qty}</span><button type="button" data-act="inc" data-i="${i}" aria-label="Plus">+</button></div>
      <p class="line-price">${money(priceFor(p, it.len) * it.qty)}</p></div>`;
  }).join('');
  renderSum();
}
function renderSum(){
  const t = totals(), el = $('#sum'); if (!el) return;
  el.innerHTML = `<h2 style="font-size:24px">Récapitulatif</h2>
    <div class="sum-row"><span>Sous-total</span><span>${money(t.sub)}</span></div>
    <div class="sum-row"><span>Livraison${t.city ? ' · ' + t.city : ''}</span><span>${t.fee === null ? 'Choisis ta ville' : money(t.fee)}</span></div>
    <div class="sum-row total"><span>Total</span><span>${money(t.total)}</span></div>`;
}
function orderText(f){
  const t = totals(), pay = PAYOPTS.find(o => o[0] === f.pay);
  const items = cart.map(it => { const p = byId(it.id); return `• ${p.name} — ${lensOf(p)[it.len]}" — bonnet ${it.cap} — ${COLORS[p.color].label} — x${it.qty} — ${money(priceFor(p, it.len) * it.qty)}`; }).join('\n');
  return `Bonjour ${BRAND.full}, je souhaite commander :\n${items}\n\nSous-total : ${money(t.sub)}\nLivraison (${t.city}) : ${money(t.fee || 0)}\nTotal : ${money(t.total)}\nPaiement : ${pay ? pay[1] : ''}\n\nNom : ${f.name}\nTéléphone : ${f.phone}\nAdresse : ${f.addr}${f.note ? '\nRemarque : ' + f.note : ''}`;
}
function copyText(text, btn){
  const done = () => { btn.textContent = 'Copié'; setTimeout(() => { btn.textContent = 'Copier le récapitulatif'; }, 2000); };
  const fallback = () => { const pre = $('#ckMsg'); if (pre){ const r = document.createRange(); r.selectNodeContents(pre); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); } btn.textContent = 'Sélectionné, copie-le'; };
  try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
}

/* ---------- À propos ---------- */
function pageAbout(){
  return `
  <section class="wrap about-hero">
    <div class="arch">${wig(byId('satin'))}</div>
    <div>
      <p class="eyebrow">À propos</p>
      <h1>Une perruque doit <em>te ressembler.</em></h1>
      <div class="prose">
        <p><strong>${esc(BRAND.full)}</strong> est une boutique en ligne de perruques haut de gamme, pensée pour les femmes du Cameroun qui veulent un résultat naturel, élégant et facile à vivre.</p>
        <p>Chaque modèle est sélectionné pour sa matière, sa densité et la finesse de sa dentelle. Tu peux commander en ligne, ou écrire directement sur WhatsApp : on t’aide à choisir la longueur, la taille de bonnet et la couleur avant que tu paies.</p>
        <p><a class="btn" href="#boutique" data-link style="justify-self:start">Voir la boutique</a></p>
      </div>
    </div>
  </section>
  <section class="wrap sec">
    <div class="values rv">
      <div><h3>Choisies</h3><p class="muted">Chaque perruque est sélectionnée pour sa matière, sa densité et la qualité de sa dentelle, puis décrite avec ses vraies caractéristiques.</p></div>
      <div><h3>Naturelles</h3><p class="muted">Du noir naturel au blond 613, les coloris et les textures restent crédibles et se fondent avec ta peau.</p></div>
      <div><h3>Accompagnées</h3><p class="muted">Longueur, bonnet, pose, entretien : on répond sur WhatsApp, avant et après ton achat.</p></div>
    </div>
  </section>
  <section class="wrap sec" style="padding-top:8px">
    <div class="sec-head rv"><h2>Ce qu’il faut <em>regarder</em></h2></div>
    <ul class="crit rv">
      <li><h3>Les cheveux</h3><p>Des cuticules toutes dans le même sens, sans mélange de fibres. C’est ce qui évite les nœuds et le frisottis.</p></li>
      <li><h3>La dentelle</h3><p>Transparente ou HD, fine, bien blanchie aux points d’implantation : elle disparaît sur la peau.</p></li>
      <li><h3>Le bonnet</h3><p>Élastique, sangles réglables et peignes : la perruque tient sans serrer.</p></li>
      <li><h3>La densité</h3><p>150 % pour un volume naturel, 180 % pour du corps, 200 % pour un effet glamour.</p></li>
    </ul>
  </section>`;
}

/* ---------- Guide et FAQ ---------- */
function pageGuide(){
  const care = [
    ['Démêle', 'Commence par les pointes avec un peigne à grandes dents, puis remonte. Sur des boucles, vaporise un peu d’eau ou de leave-in avant.'],
    ['Lave', 'Une à deux fois par mois selon le port. Shampoing sans sulfate, eau tiède, geste de haut en bas. Ne frotte pas.'],
    ['Hydrate', 'Après-shampoing sur les longueurs, pas sur la dentelle. Laisse poser cinq minutes puis rince à l’eau fraîche.'],
    ['Sèche', 'À l’air libre sur un support, ou en tamponnant avec une serviette. Évite de tordre les cheveux.'],
    ['Coiffe', 'Cheveux naturels : fer ou boucleur jusqu’à 180 °C avec un protecteur thermique. Les fibres synthétiques supportent beaucoup moins la chaleur.'],
    ['Range', 'Sur un support à perruque, ou dans un sac en satin, à l’abri de la poussière.']
  ];
  const pose = [
    ['Mesure', 'Prends ton tour de tête et choisis le bonnet S, M ou L.'],
    ['Prépare', 'Nettoie et sèche la peau du front et des tempes. Fais un test de tolérance si tu utilises de la colle.'],
    ['Place', 'Enfile la perruque, règle les sangles et pose la dentelle sur ta ligne de naissance naturelle.'],
    ['Découpe', 'Coupe l’excédent de dentelle au plus près de la ligne. Les modèles glueless n’en ont pas besoin.'],
    ['Fixe', 'Bande ou colle adaptée, puis laisse prendre une à deux minutes avant de lisser la dentelle.'],
    ['Coiffe', 'Peigne la naissance des cheveux et ajuste la raie. Un peu de poudre sur la dentelle l’estompe encore.']
  ];
  const stepList = a => a.map(s => `<li><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('');
  const faq = [
    ['Combien de temps pour être livrée ?', 'Douala : 24 à 48 h. Yaoundé : 2 à 4 jours. Autres villes : 3 à 7 jours. Les frais s’affichent dans ton panier.'],
    ['Comment payer ?', 'À la livraison, par MTN Mobile Money, Orange Money, ou par carte avec un lien de paiement envoyé sur WhatsApp. Pour les autres villes, on confirme le mode de paiement avec toi.'],
    ['Puis-je rendre ma perruque ?', 'Une perruque portée, lavée ou coupée ne peut pas être reprise, pour des raisons d’hygiène. Si elle arrive abîmée ou ne correspond pas à ta commande, écris-nous dans les 48 h avec des photos.'],
    ['Comment choisir ma taille ?', 'Mesure ton tour de tête : S de 52 à 54 cm, M de 55 à 57 cm, L de 58 à 60 cm. Entre deux tailles, prends la plus petite et règle les sangles.'],
    ['Quelle différence entre frontal et closure ?', 'Un frontal (13x4 ou 13x6) couvre toute la ligne de naissance, d’une oreille à l’autre, et permet plusieurs raies. Une closure (4x4 ou 5x5) ne couvre que le dessus du front : plus simple et plus stable, avec moins de choix de raie.'],
    ['Puis-je couper ou colorer ma perruque ?', 'Oui, les cheveux naturels se coupent et se colorent. Confie-la à un coiffeur qui connaît les perruques, et préfère l’éclaircir par étapes.'],
    ['Combien de temps dure une perruque ?', 'Avec un bon entretien, souvent un à deux ans, parfois plus. Le lavage régulier et le rangement sur support font la différence.'],
    ['Et si un modèle n’est pas en stock ?', 'On te le dit avant que tu paies et on te propose un modèle proche, ou une date de retour.']
  ];
  return `
  <section class="wrap">
    <div class="shop-head"><div><p class="eyebrow">Guide</p><h1 class="page-title">Entretien, pose <em>et questions</em></h1></div></div>
    <div class="sec" style="padding-top:24px"><div class="sec-head"><h2>Prendre soin de <em>sa perruque</em></h2></div><ol class="steps">${stepList(care)}</ol></div>
    <div class="sec" style="padding-top:8px"><div class="sec-head"><h2>Poser une <em>lace</em></h2></div><ol class="steps">${stepList(pose)}</ol></div>
    <div class="sec" style="padding-top:8px"><div class="split">
      <div><p class="eyebrow">Taille de bonnet</p><h2>Mesurer <em>sa tête</em></h2><div class="prose"><p>Avec un mètre ruban souple, fais le tour de la tête : de la naissance des cheveux sur le front, au-dessus des oreilles, puis par la nuque. Ne serre pas.</p></div></div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th scope="col">Bonnet</th><th scope="col">Tour de tête</th></tr></thead><tbody>${CAPS.map(c => `<tr><td>${c[0]}</td><td>${c[1]}</td></tr>`).join('')}</tbody></table></div>
    </div></div>
    <div class="sec" style="padding-top:8px;padding-bottom:96px"><div class="sec-head"><h2>Questions <em>fréquentes</em></h2></div>
      <div class="faq">${faq.map(q => `<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}</div>
    </div>
  </section>`;
}

/* ---------- Contact ---------- */
function pageContact(){
  return `
  <section class="wrap">
    <div class="shop-head"><div><p class="eyebrow">Contact</p><h1 class="page-title">Parlons de <em>ta perruque</em></h1></div></div>
    <div class="contact-grid" style="padding-top:8px">
      <dl class="contact-list">
        <div><dt>WhatsApp</dt><dd>${esc(BRAND.phone)}</dd><p style="margin-top:12px"><a class="btn" href="${waLink('Bonjour ' + BRAND.full + ', ')}" target="_blank" rel="noopener">Ouvrir WhatsApp</a></p></div>
        <div><dt>E-mail</dt><dd><a href="mailto:${esc(BRAND.email)}">${esc(BRAND.email)}</a></dd></div>
        <div><dt>Instagram</dt><dd><a href="${igLink}" target="_blank" rel="noopener">@${esc(BRAND.instagram)}</a></dd></div>
        <div><dt>Ville</dt><dd>${esc(BRAND.city)}</dd></div>
        <div><dt>Horaires</dt><dd>${esc(BRAND.hours)}</dd></div>
      </dl>
      <div>
        <form class="form" id="cf">
          <div class="row2">
            <label class="f"><span>Nom</span><input id="cf-name" name="name" autocomplete="name" required></label>
            <label class="f"><span>Téléphone</span><input id="cf-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></label>
          </div>
          <label class="f"><span>Sujet</span><select id="cf-topic" name="topic"><option>Question sur un modèle</option><option>Suivi de commande</option><option>Conseil de pose</option><option>Autre demande</option></select></label>
          <label class="f"><span>Message</span><textarea id="cf-msg" name="msg" required></textarea></label>
          <button class="btn" type="submit">Préparer mon message</button>
        </form>
        <div class="done" id="cfDone" hidden></div>
      </div>
    </div>
  </section>`;
}
/* ---------- Partenaires et professionnels ---------- */
function pagePartners(){
  const tiers = PARTNER.tiers.map(t => `<li><b>${esc(t[1])}</b><span>${esc(t[0])}</span></li>`).join('');
  const who = [
    ['Boutiques et revendeurs', 'Renouvelle ton stock avec des modèles qui se vendent : lisses, ondulées, bouclées, bobs et glueless, en plusieurs longueurs et couleurs.'],
    ['Salons de coiffure et de beauté', 'Propose la vente et la pose à ta clientèle, avec des finitions adaptées : lace frontal, closure, glueless.'],
    ['Entreprises, événements et production', 'Perruques pour shootings, défilés, tournages, spectacles et campagnes, avec un calendrier confirmé à l’avance.'],
    ['Associations et institutions', 'Commandes groupées pour des opérations de dotation, avec devis détaillé et facture.']
  ].map(w => `<li><h3>${w[0]}</h3><p>${w[1]}</p></li>`).join('');
  const steps = [
    ['Tu nous écris', 'Modèles, longueurs, couleurs, quantités et date souhaitée. Un message ou un e-mail suffit.'],
    ['On te répond', PARTNER.reply + ', avec disponibilités, prix et délais.'],
    ['Tu valides', 'Confirmation écrite du devis' + (PARTNER.deposit ? ', puis acompte de ' + PARTNER.deposit : '') + '.'],
    ['On livre', 'Contrôle de chaque pièce, puis livraison à Douala, Yaoundé ou dans tout le pays.']
  ].map(x => `<li><h3>${x[0]}</h3><p>${x[1]}</p></li>`).join('');
  return `
  <section class="wrap about-hero">
    <div class="arch">${wig(byId('ambre'))}</div>
    <div>
      <p class="eyebrow">Partenaires et professionnels</p>
      <h1>Des perruques pour <em>les professionnels.</em></h1>
      <div class="prose">
        <p>Boutiques, salons, entreprises, productions et associations : commande en volume, avec des remises selon la quantité, un interlocuteur unique et un devis écrit.</p>
        <p>Commande minimale : <strong>${PARTNER.minOrder} pièces</strong>. ${esc(PARTNER.reply)}.</p>
      </div>
      <div class="cta" style="margin:28px 0 0">
        <button class="btn" type="button" data-act="toform">Demander un devis</button>
        <a class="btn ghost" href="${waLink('Bonjour ' + BRAND.full + ', je suis intéressé(e) par un partenariat professionnel.')}" target="_blank" rel="noopener">Écrire sur WhatsApp</a>
      </div>
    </div>
  </section>

  <section class="wrap sec" style="padding-top:24px">
    <div class="sec-head rv"><h2>Remises selon <em>la quantité</em></h2></div>
    <ul class="tiers rv">${tiers}</ul>
  </section>

  <section class="wrap sec" style="padding-top:8px">
    <div class="sec-head rv"><h2>Pour <em>qui ?</em></h2></div>
    <ul class="who rv">${who}</ul>
  </section>

  <section class="wrap sec" style="padding-top:8px">
    <div class="sec-head rv"><h2>Comment <em>ça se passe</em></h2></div>
    <ol class="steps four rv">${steps}</ol>
  </section>

  <section class="wrap sec" style="padding-top:8px">
    <div class="contact-grid">
      <div class="rv rv-l">
        <p class="eyebrow">Demande de devis</p>
        <h2 style="font-size:clamp(26px,3.4vw,40px);line-height:1.12;margin-bottom:18px">Parle-nous de <em>ton projet</em></h2>
        <dl class="contact-list">
          <div><dt>WhatsApp</dt><dd>${esc(BRAND.phone)}</dd></div>
          <div><dt>E-mail</dt><dd><a href="mailto:${esc(BRAND.email)}">${esc(BRAND.email)}</a></dd></div>
          <div><dt>Horaires</dt><dd>${esc(BRAND.hours)}</dd></div>
        </dl>
      </div>
      <div class="rv rv-r">
        <form class="form" id="pf">
          <div class="row2">
            <label class="f"><span>Structure</span><input name="org" autocomplete="organization" required></label>
            <label class="f"><span>Type</span><select name="type"><option>Boutique ou revendeur</option><option>Salon de coiffure ou de beauté</option><option>Entreprise, événement ou production</option><option>Association ou institution</option><option>Autre</option></select></label>
          </div>
          <div class="row2">
            <label class="f"><span>Nom du contact</span><input name="name" autocomplete="name" required></label>
            <label class="f"><span>Téléphone WhatsApp</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
          </div>
          <div class="row2">
            <label class="f"><span>E-mail (facultatif)</span><input name="mail" type="email" autocomplete="email"></label>
            <label class="f"><span>Quantité estimée</span><select name="qty"><option>Moins de ${PARTNER.minOrder} pièces</option>${PARTNER.tiers.map(t => `<option>${esc(t[0])}</option>`).join('')}</select></label>
          </div>
          <label class="f"><span>Ton besoin</span><textarea name="msg" required placeholder="Modèles, longueurs, couleurs, date de livraison…"></textarea></label>
          <button class="btn" type="submit">Préparer ma demande de devis</button>
        </form>
        <div class="done" id="pfDone" hidden></div>
      </div>
    </div>
  </section>`;
}
function pageMissing(){
  return `<section class="wrap sec"><div class="empty"><h3>Cette page n’existe pas</h3><p class="muted">La perruque ou la page demandée est introuvable.</p><a class="btn" href="#boutique" data-link>Voir la boutique</a></div></section>`;
}

/* =====================================================================
   ROUTEUR
   ===================================================================== */
const view = $('#view');
let current = '';
function render(raw){
  let h = String(raw || 'accueil').replace(/^#/, '') || 'accueil';
  current = h;
  stopSliders();
  let html, after, nav = h;
  if (h.indexOf('produit-') === 0){ html = pagePdp(h.slice(8)); after = () => { if (S) updatePdp(); }; nav = 'boutique'; }
  else if (h.indexOf('boutique') === 0){ const tok = h.slice(9); html = pageShop(tok); after = () => { refreshGrid(); const s = $('#sort'); if (s) s.value = F.sort; }; nav = tok === 'nouveautes' ? 'nouveautes' : 'boutique'; }
  else if (h === 'panier'){ html = pageCart(); after = renderCart; }
  else if (h === 'a-propos') html = pageAbout();
  else if (h === 'guide') html = pageGuide();
  else if (h === 'contact') html = pageContact();
  else if (h === 'partenaires') html = pagePartners();
  else if (h === 'accueil'){ html = pageHome(); nav = 'accueil'; }
  else html = pageMissing();
  view.innerHTML = html;
  setTitle(h);
  view.classList.remove('enter'); void view.offsetWidth; view.classList.add('enter');
  if (after) after();
  if (h === 'accueil') startSliders();
  initReveal();
  $$('[data-nav]').forEach(a => { if (a.dataset.nav === nav) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  closeMenu();
  window.scrollTo(0, 0);
}
function setTitle(h){
  const T = { accueil: '', boutique: 'Boutique', 'a-propos': 'À propos', guide: 'Guide et FAQ', contact: 'Contact', panier: 'Panier', partenaires: 'Partenaires et professionnels' };
  let t = '';
  if (h.indexOf('produit-') === 0){ const p = byId(h.slice(8)); t = p ? p.name : 'Page introuvable'; }
  else if (h.indexOf('boutique') === 0){ const k = h.slice(9); t = k === 'nouveautes' ? 'Nouveautés' : k === 'best' ? 'Best-sellers' : STYLES.some(x => x[0] === k) ? styleLabel(k) : 'Boutique'; }
  else t = (h in T) ? T[h] : 'Page introuvable';
  document.title = t ? t + ' · ' + BRAND.full : BRAND.full + ' · Perruques haut de gamme au Cameroun';
}
function go(h){
  h = String(h).replace(/^#/, '');
  render(h);
  try { if (location.hash !== '#' + h) location.hash = h; } catch (e) {}
}
window.addEventListener('hashchange', () => {
  const h = location.hash.replace(/^#/, '') || 'accueil';
  if (h !== current) render(h);
});

/* =====================================================================
   INTERACTIONS
   ===================================================================== */
function setMenu(o){
  $('#nav').classList.toggle('open', o);
  $('#scrim').classList.toggle('on', o);
  document.body.classList.toggle('lock', o);
  $('#menuBtn').setAttribute('aria-expanded', String(o));
}
function closeMenu(){ setMenu(false); }
$('#menuBtn').addEventListener('click', () => {
  const o = !$('#nav').classList.contains('open'); setMenu(o);
  if (o){ const a = $('#nav a'); if (a) a.focus(); }
});
$('#scrim').addEventListener('click', closeMenu);
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeMenu();
  const a = document.activeElement;
  if (a && a.closest && a.closest('.has-sub')) a.blur();
});
window.addEventListener('resize', () => { if (window.innerWidth > 1100) closeMenu(); });
function buildMenu(){
  const cnt = s => PRODUCTS.filter(p => styleOf(p) === s).length;
  $('#subMenu').innerHTML = STYLES.map(x => `<a href="#boutique-${x[0]}" data-link>${x[1]}<small>${cnt(x[0])}</small></a>`).join('') +
    `<a href="#boutique-nouveautes" data-link>Nouveautés<small>${PRODUCTS.filter(p => has(p, 'new')).length}</small></a>` +
    `<a href="#boutique-best" data-link>Best-sellers<small>${PRODUCTS.filter(p => has(p, 'best')).length}</small></a>` +
    `<a class="all" href="#boutique" data-link>Voir toute la boutique <span aria-hidden="true">→</span></a>`;
}

const root = document.documentElement;
function curTheme(){ return root.getAttribute('data-theme') || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
try { const t = localStorage.getItem('gbn-theme'); if (t === 'dark' || t === 'light') root.setAttribute('data-theme', t); } catch (e) {}
$('#themeBtn').addEventListener('click', () => {
  const n = curTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', n);
  try { localStorage.setItem('gbn-theme', n); } catch (e) {}
});

document.addEventListener('click', e => {
  const a = e.target.closest('[data-link]');
  if (a){ e.preventDefault(); go(a.getAttribute('href')); return; }
  const f = e.target.closest('[data-f]');
  if (f && F){
    const k = f.dataset.f, v = f.dataset.v;
    if (k === 'len' || k === 'flag'){
      F[k] = F[k] === v ? '' : v;
      $$('[data-f="' + k + '"]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.v === F[k])));
    } else {
      F[k].has(v) ? F[k].delete(v) : F[k].add(v);
      f.setAttribute('aria-pressed', String(F[k].has(v)));
    }
    refreshGrid(); return;
  }
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act, i = +b.dataset.i;
  if (act === 'closemenu'){ closeMenu(); }
  else if (act === 'search'){
    go('boutique');
    const fl = $('#filters'); if (fl) fl.classList.add('open');
    const ft = $('[data-act="filt"]'); if (ft) ft.setAttribute('aria-expanded', 'true');
    const q = $('#q'); if (q) q.focus();
  }
  else if (act === 'toform'){ const f = $('#pf'); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  else if (act === 'reset'){ render('boutique'); }
  else if (act === 'filt'){ const o = $('#filters').classList.toggle('open'); b.setAttribute('aria-expanded', String(o)); }
  else if (act === 'len'){ S.len = i; updatePdp(); }
  else if (act === 'cap'){ S.cap = b.dataset.v; updatePdp(); }
  else if (act === 'qminus'){ S.qty = Math.max(1, S.qty - 1); updatePdp(); }
  else if (act === 'qplus'){ S.qty = Math.min(9, S.qty + 1); updatePdp(); }
  else if (act === 'view'){ $('#mainImg').innerHTML = visual(S.p, i); $$('[data-act="view"]').forEach(x => x.setAttribute('aria-pressed', String(+x.dataset.i === i))); }
  else if (act === 'add'){
    const ex = cart.find(c => c.id === S.p.id && c.len === S.len && c.cap === S.cap);
    if (ex) ex.qty = Math.min(9, ex.qty + S.qty); else cart.push({ id: S.p.id, len: S.len, cap: S.cap, qty: S.qty });
    burst(b); saveCart(); toast('<span>Ajouté au panier</span><a href="#panier" data-link>Voir le panier</a>');
  }
  else if (act === 'inc'){ cart[i].qty = Math.min(9, cart[i].qty + 1); saveCart(); renderCart(); }
  else if (act === 'dec'){ cart[i].qty = Math.max(1, cart[i].qty - 1); saveCart(); renderCart(); }
  else if (act === 'rm'){ cart.splice(i, 1); saveCart(); renderCart(); }
});
document.addEventListener('input', e => {
  if (!F) return;
  if (e.target.id === 'q'){ F.q = e.target.value; refreshGrid(); }
  else if (e.target.id === 'max'){ F.max = +e.target.value; $('#maxOut').textContent = money(F.max); refreshGrid(); }
});
document.addEventListener('change', e => {
  if (e.target.id === 'sort' && F){ F.sort = e.target.value; refreshGrid(); }
  else if (e.target.id === 'ck-city') renderSum();
});
document.addEventListener('submit', e => {
  const id = e.target.id;
  if (id === 'ck'){
    e.preventDefault();
    const d = new FormData(e.target), f = { name: d.get('name'), phone: d.get('phone'), addr: d.get('addr'), note: d.get('note'), pay: d.get('pay') };
    const msg = orderText(f), pay = PAYOPTS.find(o => o[0] === f.pay);
    const box = $('#ckDone');
    box.innerHTML = `<h2 style="font-size:24px">Dernière étape</h2><p>Envoie ce récapitulatif sur WhatsApp pour que ta commande soit confirmée. Mode de paiement choisi : <strong>${pay[1]}</strong>.</p><pre id="ckMsg"></pre>
      <a class="btn block" id="ckWa" target="_blank" rel="noopener">Envoyer sur WhatsApp</a><button class="btn ghost block" type="button" id="ckCopy">Copier le récapitulatif</button><p class="notice">WhatsApp s’ouvre avec le message prêt. Pense à appuyer sur envoyer.</p>`;
    $('#ckMsg').textContent = msg; $('#ckWa').href = waLink(msg);
    $('#ckCopy').addEventListener('click', ev => copyText(msg, ev.currentTarget));
    e.target.hidden = true; box.hidden = false; box.scrollIntoView({ block: 'nearest' });
  } else if (id === 'cf'){
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = `Bonjour ${BRAND.full}, c’est ${d.get('name')}${d.get('phone') ? ' (' + d.get('phone') + ')' : ''}.\nSujet : ${d.get('topic')}\n\n${d.get('msg')}`;
    const box = $('#cfDone');
    box.innerHTML = `<h2 style="font-size:24px">Ton message est prêt</h2><p>Ouvre WhatsApp pour l’envoyer. Il est déjà rédigé.</p><pre id="cfMsg"></pre><a class="btn block" id="cfWa" target="_blank" rel="noopener">Envoyer sur WhatsApp</a>`;
    $('#cfMsg').textContent = msg; $('#cfWa').href = waLink(msg);
    e.target.hidden = true; box.hidden = false;
  } else if (id === 'pf'){
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = `Bonjour ${BRAND.full}, demande de devis partenaire.\nStructure : ${d.get('org')} (${d.get('type')})\nContact : ${d.get('name')}, ${d.get('phone')}${d.get('mail') ? ', ' + d.get('mail') : ''}\nQuantité estimée : ${d.get('qty')}\n\n${d.get('msg')}`;
    const box = $('#pfDone');
    box.innerHTML = `<h2 style="font-size:24px">Ta demande est prête</h2><p>Envoie-la par WhatsApp ou par e-mail : elle est déjà rédigée.</p><pre id="pfMsg"></pre><a class="btn block" id="pfWa" target="_blank" rel="noopener">Envoyer sur WhatsApp</a><a class="btn ghost block" id="pfMail">Envoyer par e-mail</a>`;
    $('#pfMsg').textContent = msg; $('#pfWa').href = waLink(msg);
    $('#pfMail').href = 'mailto:' + BRAND.email + '?subject=' + encodeURIComponent('Demande de devis partenaire : ' + d.get('org')) + '&body=' + encodeURIComponent(msg);
    e.target.hidden = true; box.hidden = false;
  }
});

/* =====================================================================
   DÉMARRAGE
   ===================================================================== */
$('#waFloat').href = waLink('Bonjour ' + BRAND.full + ', j’ai une question.');
$$('.bn').forEach(e => { e.textContent = BRAND.name; });
$$('.bs').forEach(e => { e.textContent = BRAND.sub; });
$$('.bf').forEach(e => { e.textContent = BRAND.full; });
$$('.logo').forEach(e => e.setAttribute('aria-label', BRAND.full + ', accueil'));
const tp = $('#tbPhone'); tp.href = waLink('Bonjour ' + BRAND.full + ', '); tp.textContent = BRAND.phone;
const ti = $('#tbInsta'); ti.href = igLink; ti.textContent = '@' + BRAND.instagram;
const fm = $('#footMail'); fm.href = 'mailto:' + BRAND.email; fm.textContent = BRAND.email;
$('#drawerWa').href = waLink('Bonjour ' + BRAND.full + ', j’aimerais être conseillée.');
buildMenu();
$('#footPhone').textContent = BRAND.phone;
$('#footCity').textContent = BRAND.city;
const fi = $('#footInsta'); fi.href = igLink; fi.textContent = '@' + BRAND.instagram;
$('#yr').textContent = new Date().getFullYear();
saveCart();
render(location.hash.replace(/^#/, '') || 'accueil');

})();
