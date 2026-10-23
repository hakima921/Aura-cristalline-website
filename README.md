Titre du Projet : Aura Cristalline - Gestion des Commandes
 Description: Application web modulaire permettant la gestion et l'affichage dynamique des commandes clients à partir de données JSON.
  la structure générale : 
  
  tp4/
|
|-- index.html
|
|-- css/
| ‘-- style.css
|
|-- data/
| |-- customers.json
| |-- products.json
| ‘-- orders.json
|
‘-- js/
|-- app.js
|-- state.js
|-- dataService.js
|-- selectors.js
‘-- view.js

 les fonctionnalités principales :
- Chargement asynchrone: Récupération dynamique des données JSON avec l'API `fetch` (`async/await`).
- Gestion de l'état centralisé: Initialisation et mise à jour synchronisée des données de l'application.
- Jointures et calculs: Association des clients et produits aux commandes correspondantes avec calcul automatique des sous-totaux et du montant total.
- Rendu dynamique et filtres: Filtrage interactif par statut/client et mise à jour directe dans le DOM.
- Vue détaillée: Affichage interactif des détails d'une commande au clic dans une modale Bootstrap.

  les instructions pour lancer le projet:
  - on utilise open with live server .
  - Cloner le dépôt GitHub:
   ```bash
   git clone [https://github.com/hakima921/Aura-cristalline-website.git](https://github.com/hakima921/Aura-cristalline-website.git)

   
