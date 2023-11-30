## Evos

* Rajouter les réglages de dimensionnement (DONE)
* Export modèle à l'échelle (DONE)
* Clean de la lib geom.js => core.js
* Dessiner les montants en  goodkarma (intersection des plans)
* Ajouter le mode horaire/anti_horaire pour le goodkarma
* Ajoût des autres méthodes de contructions (Semicone)
* Validation de nos modèles
* Ajoût du "BizeledLength" 
* Contraindre les limites de timber width/thickness
* Url parametrée
* Sauver et revenir à l'état d'origine pour éviter le rafraichissement de la page.
* Lien de partage de l'URL qui copie colle dans le presse papier.
* Affichage de message (toast: https://getbootstrap.com/docs/5.2/components/toasts/) pour
  * Copier/Coller
  * Save settings
  * reset settings
* Mandala : export en 3D : .obj
* rajout de la méthode jeam soum 
* Ajouter les lignes pour chaque polygone (bug sur les mediane en beveled et aussi sur zomandala)
* Grouper les montants: abandonnée car trop lent pour le rendu
* Fix edge line segments
* Supprimer les circular distribution
* Grouper les montants (en fonction de leur aire / simple)
* Attribuer les couleurs en fonction du hash/area : Color.from_index
* Option des couleurs : Slope/Rotation Angle or Group by Area
* Rajouter le mode plein écran pour la 3D
* Raccourci clavier à afficher


## A faire

* Et enfin dessiner les côtes (mode acidome) de chaque montants
  * Commencer à dessiner la premier polygone (vue de dessus)
  * La hauteur du dessin est fixe
  * Sa largeur est donc relative.... on peut la tronquer avec des pointillés
  * l'angle de coupe arrière est dessinée en pointillés
  * Ajouter les indexs des montants/faces sur la 3D

* Utiliser le LRU Cache ?? je sais trop si c'est nécessaire.... 
```
const ANGLES2COLOR_CACHE = new LRU(10);
[Math.PI, TAU].forEach(a => ANGLES2COLOR_CACHE.set(a, Color.from_angles(a)));
ANGLES2COLOR_CACHE.get(TAU);
```

* Rajouter les montants de renforts horizontal/vertical (1, 2, 3)
  
* Wizzdome HR => WR width ratio::: plus compliqué mais faisable

* Couleur par montants qui sont les mêmes

* Affichage de message :
    * Téléchargement d'un fichier 3D ou PRINT
  