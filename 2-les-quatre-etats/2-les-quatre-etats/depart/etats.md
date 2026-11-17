# Les quatre états de Phare

Remplissez une ligne par test, avec ce que vous **voyez**, pas ce que vous attendiez. Recopiez les messages de la console tels quels, même en anglais.

| Test | Ce que montre la page | Ce que dit la console | Onglet Réseau : fichier et code |
| --- | --- | --- | --- |
| 1. `data.json`, réseau lent (3G) | La page affiche « Chargement des lieux… », puis la liste des lieux apparaît. | Aucune erreur. | Fichier `data.json`, code `200 OK`. |
| 2. `data-absent.json`, sans `.catch` | Le texte « Chargement des lieux… » reste affiché et la page ne se met jamais à jour. | Erreur non gérée / promesse rejetée (ex. `Failed to fetch` ou `Unhandled promise rejection`). | Fichier manquant, code `404 Not Found`. |
| 3. `data-absent.json`, avec `.catch` | La page affiche un message d’erreur, par exemple « Erreur lors du chargement des lieux. » | Le `.catch` récupère l’erreur et l’envoie dans la console. | Fichier manquant, code `404 Not Found`. |
| 4. `data-absent.json`, avec le contrôle `reponse.ok` | La page affiche un message d’erreur et ne tente pas de lire le JSON. | Le code peut afficher `Impossible de charger data.json (404)` avant de lancer le `.catch`. | Fichier manquant, code `404 Not Found`. |
| 5. `casse.json` | La page reste bloquée sur le message de chargement ou n’affiche rien, car le JSON est invalide. | `JSON.parse` échoue : syntaxe invalide, virgule en trop, etc. | Fichier trouvé, code `200 OK`, mais contenu cassé. |
| 6. `vide.json`, avant le contrôle de la liste vide | La page semble « chargée », mais elle affiche une liste vide : le conteneur est vidé et rien n’indique qu’il n’y a pas de lieux. | Aucune erreur, car le JSON est valide mais vide (`[]`). | Fichier trouvé, code `200 OK`, contenu `[]`. |

## Deux questions

1. Dans quel test l'onglet Réseau dit-il `200` alors que la page échoue ? Pourquoi ?

   Réponse : Le test 5 (`casse.json`). Le serveur répond bien `200 OK`, mais le fichier contient un JSON invalide. Le navigateur reçoit le fichier, puis `JSON.parse()` plante à cause d’une erreur de syntaxe. La page échoue donc malgré le `200`.

2. Au test 2, que devient le message « Chargement des lieux… » ? Qu'est-ce que la personne qui attend en conclut ?

   Réponse : Le message ne change pas : il reste affiché indéfiniment. La personne qui attend conclut que le chargement est bloqué, que le serveur ne répond pas, ou que l’application ne fonctionne pas. En réalité, l’erreur est simplement non gérée : le rejet de la promesse est ignoré.
