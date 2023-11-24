# Projet Dome 3D sans connecteur

Usinage en GoodKarma & le plus abouti et pratique

## Lexique

* Largeur : profondeur des montants (vers le point de fuite)
* Epaisseur des montants : thickness
* GoodKarma : sens horaire / antihoraire
* Point de fuite : ground 0 | centroid

## Algo 

Partir des sommets du Zome vers le point de fuite (centroid | 0)


Dessin de la charpente avec les montants à 90° 
(pas de découpe des angles dièdres sur le dessin de la charpente)
ça permettra de relever les côte sur sketchup


Goodkarma seulement pour le moment

## Evos

* Rajouter les réglages de dimensionnement (DONE)
* Export modèle à l'échelle (DONE)
* Clean de la lib geom.js => core.js
* Dessiner les montants en  goodkarma (intersection des plans)
* Ajouter le mode horaire/anti_horaire pour le goodkarma
* Ajoût des autres méthodes de contructions (Semicone)
* Validation de nos modèles

## A faire 


* Rajouter les montants de renforts horizontal/vertical (1, 2, 3)

* Et enfin dessiner les côtes (mode acidome) de chaque montants
* Mandala : export en 3D : .obj

* Raccourci clavier à afficher

* Construire la base (Env et Montants séparement)
* Ajoût des méthodes 
  *  Russian Dolls
  *  Beveled GoodKarma
  *  Piped : Faire seulement N-1 montans centrés sur la largeur

* Wizzdome HR => WR width ratio::: plus compliqué mais faisable
* Couleur par triangle qui sont les mêmes
  
* Sauver et revenir à l'état d'origine pour éviter le rafraichissement de la page.
* Url parametrée et Lien de partage de l'URL qui copie colle dans le presse papier. 
* Affichage de message (toast: https://getbootstrap.com/docs/5.2/components/toasts/) pour   
    * Copier/Coller
    * Sauvegarde du lien
    * Téléchargement d'un fichier 3D ou PRINT


