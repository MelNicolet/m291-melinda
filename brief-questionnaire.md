# Brief Client — Projet « Ritmo »
## Application de découverte de playlist latine personnalisée via questionnaire interactif

---

## 0. Pitch d'intention (3 phrases)

Ritmo est une application qui fait découvrir sa **playlist latine parfaite** à l'utilisateur grâce à un court questionnaire interactif (humeur, pays préféré, ambiance recherchée, niveau d'énergie). À partir des réponses, l'application génère une playlist personnalisée composée de morceaux issus des cultures espagnole, italienne, portugaise et latino-américaine. L'utilisateur peut ensuite écouter directement cette playlist dans l'application ou relancer le questionnaire pour en obtenir une nouvelle.

---

## 1. Le Persona

| Champ | Détail |
|---|---|
| **Prénom, âge** | Elena Rossi, 27 ans |
| **Profession** | Graphiste indépendante, basée à Lausanne |
| **Contexte** | D'origine italo-suisse, elle aime la musique latine mais ne connaît pas toujours les noms précis des genres ou artistes ; elle préfère qu'on lui propose une sélection plutôt que de devoir chercher elle-même |
| **Motivation majeure** | Obtenir rapidement une playlist qui correspond à son humeur du moment, sans effort de recherche |
| **Freins / frustrations** | Se sent perdue face à un catalogue musical trop vaste ; n'aime pas remplir de longs formulaires |
| **Compétences numériques** | Bonnes — utilise smartphone et ordinateur quotidiennement, apprécie les interfaces ludiques et rapides |
| **Appareil utilisé** | Smartphone (iOS), en mobilité et au bureau |
| **Citation représentative** | « Je n'ai pas envie de chercher, je veux juste répondre à deux-trois questions et qu'on me trouve la bonne ambiance. » |

---

## 2. Le User Flow (4 jalons, sans impasse)

1. **Entrée en scène**
   L'utilisateur ouvre l'application et arrive sur un écran d'accueil invitant à démarrer le questionnaire : « Découvre ta playlist latine parfaite » avec un bouton « Commencer ».

2. **Consultation / Recherche**
   L'utilisateur répond à 3-4 questions successives à choix illustrés (ex : « Quelle humeur aujourd'hui ? » — énergique / romantique / festive / posée ; « Quel pays t'attire ? » — Espagne / Italie / Portugal / Amérique latine). Une barre de progression indique l'avancement, et un bouton retour permet de revenir à la question précédente.

3. **Sélection / Décision**
   À la fin du questionnaire, l'application affiche un écran de résultat présentant la playlist générée (titre évocateur, ex : « Soirée flamenco » ou « Dimanche bossa nova »), avec la liste des morceaux et un bouton « Écouter la playlist ».

4. **Conclusion gratifiante**
   La lecture démarre automatiquement dans un mini-lecteur persistant. Un message de confirmation apparaît (« Ta playlist "Soirée flamenco" est prête ! ») et l'utilisateur peut la sauvegarder dans ses favoris ou relancer un nouveau questionnaire.

**Contre-épreuve de l'impasse :** chaque question dispose d'un bouton retour ; l'écran de résultat propose toujours un bouton « Recommencer le questionnaire » et un retour à l'accueil. Le parcours complet (questionnaire + écoute) se fait en moins de 4 interactions principales.

---

## 3. Le Brief Client — Méthode des 4 piliers

### Pilier 1 — Contexte & Objectifs
Ritmo répond à un besoin de découverte musicale **sans effort de recherche active** : plutôt que de taper un genre, l'utilisateur se laisse guider par un questionnaire ludique qui traduit son humeur en recommandations musicales latines. L'objectif principal est de générer une playlist personnalisée pertinente en moins d'une minute, puis de permettre son écoute immédiate.

### Pilier 2 — Utilisateurs & Persona
Public cible : personnes qui aiment la musique latine mais ne maîtrisent pas le vocabulaire des genres, avec un niveau numérique moyen à bon, utilisant principalement un smartphone. Persona de référence : Elena Rossi (voir section 1). L'interface doit privilégier des choix visuels et illustrés plutôt que du texte technique.

### Pilier 3 — Fonctionnalités & Parcours
- Questionnaire interactif de 3 à 4 questions à choix illustrés (humeur, pays, énergie, ambiance)
- Barre de progression et bouton retour à chaque étape
- Génération automatique d'une playlist personnalisée à l'issue du questionnaire
- Écran de résultat avec titre évocateur et liste des morceaux
- Lecteur audio intégré avec mini-lecteur persistant
- Sauvegarde de la playlist en favoris et possibilité de relancer le questionnaire
- Parcours complet en 4 étapes maximum, sans impasse (voir User Flow)

### Pilier 4 — Contraintes techniques & ergonomiques
- Interface mobile-first (iOS/Android)
- Génération de la playlist en moins de 2 secondes après la dernière réponse
- Accessibilité : contrastes suffisants, taille de police ajustable, cibles tactiles larges, navigation au clavier/lecteur d'écran (viser WCAG AA)
- Chaque écran (y compris chaque question) doit offrir un retour arrière explicite
- Chaque réponse sélectionnée doit produire un feedback visuel immédiat (ex : surbrillance du choix)

---

## 4. Exercice supplémentaire 1 (e2-9) — Scénario alternatif d'échec

**Scénario : questionnaire abandonné en cours de route**

1. L'utilisateur ferme l'application ou revient à l'accueil avant d'avoir terminé le questionnaire.
2. À sa prochaine ouverture, l'application propose : « Tu n'as pas terminé ton questionnaire, veux-tu reprendre où tu t'étais arrêté ? » avec deux boutons clairs (« Reprendre » / « Recommencer »).
3. Aucune perte de progression n'est imposée à l'utilisateur ; l'action reste réversible à tout moment.

**Scénario : coupure réseau pendant la génération de la playlist**

1. La connexion est perdue juste après la dernière réponse au questionnaire, empêchant la génération de la playlist.
2. L'application affiche un état clair : « Connexion perdue — nouvelle tentative automatique » avec une icône de chargement, plutôt qu'un écran figé ou une erreur brute.
3. Dès que le réseau revient, la génération reprend automatiquement ; un bouton « Réessayer » reste disponible en cas d'échec persistant.

---

## 5. Exercice supplémentaire 2 (e2-10) — Persona secondaire antagoniste & matrice d'arbitrage

### Persona secondaire

| Champ | Détail |
|---|---|
| **Prénom, âge** | Giuseppe Bernasconi, 68 ans |
| **Profession** | Retraité, ancien enseignant, habite à Yverdon |
| **Contexte** | Peu à l'aise avec les smartphones récents, utilise surtout une tablette avec de grandes icônes |
| **Motivation** | Retrouver facilement une ambiance musicale familière sans remplir de longs formulaires |
| **Freins** | Vue diminuée, difficulté à lire de petits textes ou à faire des choix trop nombreux/rapides |
| **Besoins d'accessibilité** | Contrastes élevés, texte agrandi, questions formulées simplement, peu de choix par écran, cibles tactiles larges (min. 44×44 px) |

### Matrice d'arbitrage (Elena vs Giuseppe)

| Critère | Elena (persona principal) | Giuseppe (persona secondaire) | Arbitrage retenu |
|---|---|---|---|
| Nombre de questions | Accepte 4-5 questions rapides | Préfère un minimum de questions (2-3) | Questionnaire court fixé à 3-4 questions maximum, avec formulation simple |
| Type de choix | À l'aise avec icônes et texte court | A besoin d'images larges et explicites | Chaque option combine une grande icône illustrée + un mot simple (pas d'abréviation) |
| Taille des éléments tactiles | Standard | Larges (min. 44×44 px, conforme WCAG AA) | Cibles tactiles agrandies pour tout le questionnaire (bénéfice pour tous) |
| Rythme d'interaction | Aime avancer vite, sans confirmation | A besoin de temps et de confirmations claires | Bouton « Suivant » explicite à chaque question, jamais de sélection automatique au clic |

**Conclusion :** le questionnaire est conçu avec un nombre réduit de questions, des choix illustrés et de grandes cibles tactiles — des standards d'accessibilité pensés pour Giuseppe qui bénéficient aussi à Elena en rendant le parcours plus rapide et plus clair pour tous.
