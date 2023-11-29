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

## A faire


* Sens Inward / Outward qui remplace la méthode .... Jean Soum ?

  
* Utiliser le LRU Cache 
```
const ANGLES2COLOR_CACHE = new LRU(10);
[Math.PI, TAU].forEach(a => ANGLES2COLOR_CACHE.set(a, Color.from_angles(a)));
ANGLES2COLOR_CACHE.get(TAU);
```
  
* Grouper les montants (en fonction de leur aire / simple)

```js
const grouped_skeleton_prisms = _.groupBy(skeleton_spiral, (crown) => to_decimal(crown.obj.area, FLOAT_2_STR_PRECISION));
console.log(grouped_skeleton_prisms);
```
  
* Attribuer les couleurs en fonction du hash/area : num2color
  
* Option des couleurs : Slope/Rotation Angle or Group by Area

  // Group polygons by hash
  const grouped_env_polygons = _.groupBy(env_spiral, (crown) => to_decimal(crown.obj.area, FLOAT_2_STR_PRECISION));
  console.log(grouped_env_polygons);

* Rajouter les montants de renforts horizontal/vertical (1, 2, 3)
* Et enfin dessiner les côtes (mode acidome) de chaque montants
  
* Raccourci clavier à afficher

* Wizzdome HR => WR width ratio::: plus compliqué mais faisable

* Couleur par montants qui sont les mêmes

* Affichage de message :
    * Téléchargement d'un fichier 3D ou PRINT
  