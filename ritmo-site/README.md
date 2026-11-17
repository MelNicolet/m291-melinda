# Ritmo — Piste B (chaleureuse) — site fonctionnel

Ouvrir `index.html` dans un navigateur. Aucune installation, aucun serveur, aucun framework.

| Page | Fichier | Reliée à |
|---|---|---|
| Accueil | index.html | Quiz, Historique, Ma playlist, Favoris, Connexion |
| Quiz (4 questions) | quiz.html | Accueil, Résultat |
| Résultat | resultat.html | Chanson, Ma playlist, Quiz, Accueil |
| Chanson | chanson.html | Favoris, Ma playlist, morceau précédent/suivant |
| Connexion | connexion.html | Accueil |
| Historique | historique.html | Résultat |
| Ma playlist | playlist.html | Chanson |
| Favoris | favoris.html | Chanson |

Notes
- Les boutons du lecteur lisent les aperçus musicaux Apple Music disponibles (jusqu'à 30 secondes), recherchés par titre et artiste auprès de l'API publique d'iTunes. Aucun identifiant vidéo ni aucune clé n'est stocké dans le site. Les titres sans aperçu vérifié sont signalés et le lien Spotify permet d'effectuer une recherche manuelle. L'accès Internet est nécessaire ; les extraits peuvent varier selon le pays et les droits. Une navigation vers une autre page interrompt la lecture, comme pour les autres lecteurs intégrés sans serveur.
- Les données (historique, favoris, connexion de démonstration) restent dans le navigateur (localStorage).
- `build.py` régénère les pages HTML ; `css/style.css` et `js/app.js` contiennent le style et la logique.
