# Glow by Nell — site e-commerce

Site statique (HTML, CSS, JavaScript) : aucun serveur à installer.

## Contenu du dossier

- `index.html` : la page unique du site
- `assets/styles.css` : couleurs, polices, mise en page
- `assets/app.js` : réglages, catalogue et fonctionnement du site
- `assets/logo-glow-by-nell.svg` : le logo
- `vercel.json` : réglages d'hébergement (sécurité)

## Ce que tu modifies

Ouvre `assets/app.js`. Tout en haut, le bloc **RÉGLAGES À MODIFIER** contient :

- le nom de la marque (`BRAND.name`, `BRAND.sub`, `BRAND.full`), le numéro WhatsApp, l'e-mail, Instagram, la ville ;
- les conditions de la page Partenaires (`PARTNER`) ;
- les numéros MTN MoMo et Orange Money, les frais de livraison, les avis clientes ;
- le catalogue (`PRODUCTS`) : une ligne par perruque, avec son prix de base en FCFA.

Photos : crée un dossier `photos/` à côté de `index.html`, puis ajoute à la ligne d'un produit
`{ images: ['photos/soyeuse-1.jpg', 'photos/soyeuse-2.jpg'] }`.

## Mettre en ligne sur Vercel

**Avec GitHub (recommandé)**
1. Crée un dépôt GitHub et envoie-y le contenu de ce dossier.
2. Sur vercel.com : *Add New → Project*, choisis le dépôt.
3. Framework Preset : **Other**. Laisse *Build Command* et *Output Directory* vides. Clique sur *Deploy*.
4. Chaque modification envoyée sur GitHub met le site à jour automatiquement.

**Sans GitHub**
1. Installe Node.js, puis dans ce dossier : `npx vercel --prod`.

**Nom de domaine :** *Project → Settings → Domains*, puis ajoute le domaine et suis les indications DNS.

## Alternatives

- **Render** : *New → Static Site*, choisis le dépôt, *Build Command* vide, *Publish Directory* : `.`
- **Netlify Drop** (le plus simple, sans compte GitHub) : glisse le dossier sur app.netlify.com/drop.

## Limites à connaître

- Les commandes sont envoyées par WhatsApp : il n'y a pas de paiement en ligne ni de gestion de stock. Pour une grande structure, il faudra brancher un prestataire de paiement et une base de produits.
- Les pages utilisent des adresses avec `#` : Google n'indexe bien que la page d'accueil. Pour un meilleur référencement, le site devra passer à un framework comme Next.js.
- Les polices viennent de Google Fonts : le site reste lisible hors connexion avec la police du système.
