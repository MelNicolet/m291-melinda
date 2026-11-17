# Les étiquettes de la location d'instruments

Une ligne par étiquette. La colonne « Sert à » répond aux questions 2, 3 et 4 de la méthode : afficher, filtrer, trier. Une étiquette qui ne sert à rien de tout cela n'entre pas dans le fichier, sauf `id`.

| Étiquette | Écran | Sert à (afficher, filtrer, trier) | Sorte de valeur | Unique ? | Exemple |
| --- | --- | --- | --- | --- | --- |
| nom | Liste | afficher | texte | non | Violon 3/4 |
| famille | Liste | afficher, filtrer | texte | non | cordes, vents, percussions |
| prixMensuel | Liste | afficher, trier | nombre | non | 25 |
| disponible |  | filtrer | vrai/faux | non | true ou false |
| taille | Détail | afficher | texte | non | enfant, adulte |
| description | Détail | afficher | texte | non | Avec étui et archet. |
| id |  |  | nombre | oui | 1, 2, 3 |

Pourquoi le nom de l'instrument ne suffit pas à distinguer les fiches (une phrase) :
Les deux instruments nommés « Violon 3/4 » sont différents : l'un est disponible et l'autre est déjà loué, donc un id unique est nécessaire pour les distinguer.

Suggestion de l'IA que j'ai refusée, et pourquoi :
