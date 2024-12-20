# montpelier-search-engine

Iddée du projet :

Un moteur de recherche pour trouver des activité à Montpelier

Comment lancé le programme ?

Vous pouvez soit clone le projet, soit télécharger le zip pour ensuite l'extraire.

Je vous conseil de lancé la partie front via un serveur web (Apache, Python etc)

Coté back pour que le programme se lance bien, vérifiez si Beautifulsoup, Fastapi, requests et html5lib soient bien installé.

Vous pouvez installer touts les packages avec la commande suivante :

"pip install  fastapi beautifulsoup4 requests html5lib"

Lancez ensuite le serveur avec la commande "uvicorn main:app --port 8001"



Coté front :

Page web un peu comme indeed qui affiche une partie des activités à faire à Montpelier.

Il y aura un input de recherche qui permettra de filtrer les activités par catégories. On affichera la liste des catégories disponible

Il y aura aussi la possibilité de rechercher une activité en particulier

Pour chaque activité il faut que j'affiche:
    - le lien de l'activité (optionnel)
    - une photo de l'activité
    - le titre de l'activité
    - une description de l'activité


Au chargement de la page, une liste d'activité par default avec tout les type d'activité s'affiche

Il faut que lorsque je séléctionne un type d'activité cela m'affiche la liste d'activité qui à seulement ce type

Si je tape le nom d'une activité dans la barre de recherche et que je clique sur 'rechercher', seul l'activité que j'ai recherché doit apparaitre.

Cette activité se trouve dans la liste d'activités actuel que le client a récupéré.


Coté back:

Pour récupérer les donnés des activités près de Montpelier j'ai décidé de faire du scrapping.

Avec les packages Beautifulsoup et requests je collecte les données des sites ci-dessous : 

        - https://generationvoyage.fr/autour-montpellier-faire-voir/

        - https://afmontpellier.fr/activites-sportives/

        - https://www.sitesdexception.fr/que-visiter-dans-lherault-les-sites-incontournables/