## Evolutions

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
* Fix edge line segments
* Supprimer les circular distribution
* Grouper les montants (en fonction de leur aire / simple) pour les colorier
* Attribuer les couleurs en fonction du hash/area : Color.from_index
* Option des couleurs : Slope/Rotation Angle or Group by Area
* Rajouter le mode plein écran pour la 3D
* Raccourci clavier à afficher
* Réparer la méthode beveled 
* Rajouter les montants de renforts horizontal/vertical
* Couleur par montants qui sont les mêmes
* Faire fonctionner les tooltips avec le système de traduction
* ZooOoomes devient le lien de l'appli
* Finir de traduire l'appli en français
* Envelop => coverage


## Reste à faire

* Préindexer les polygons/figures avec un label
* Donner à chaque montant le label de la figure dont il provient
* Construire/ Indexer les montants du bas vers le haut.
  ```js
    const timber_profile = {
      num : 4,
  
      // for profile 1
      label: 'P1', 
  
      // Figure from which the timber comes
      figures: ['F1', 'F2', 'F3'], 
    }
  ```

  * En partant de la courounne la base.
  * Si le hash du prism a déjà été affiché,
    on compte le nombre de fois où la pièce est présente et on continue
    on continue sur la pièce suivante.
  
  

* Les dessins de profils sont toujours fais de la même façon :
  * La largeur est fixe (équivalent à la longueur du montant)
  * La face de devant est dessiné au trait plein
  * Celle de derrière en pointillés.
  *  
  




* Rajouter les matériaux pour calculer le poids total du zome

* Grouper les montants lors de l'export
  
* Intersection avec le modèle sketchup à regarder.

* Différencier les couvertures intérieur et extérieur. 

* Habillage intérieur : Plafond == couverture intérieur
  
* Couveture extérieure et intérieur
  * Prendre chaque A ou E point des prismes
  
* S'inspirer des nommages de l'application acidome 
  * base => platform / floor
  
* Rajouter les limites de renforts avec un slider double :
  * https://tailwindcomponents.com/component/multi-range-slider
  * faire la même avec les classes bootstrap ??
  
* Rajouter une semelle pour mettre de niveau à la base.
  
* Rajouter un paramètre d'aire qui switche la hauteur

* HR devient un boutton de switch avec M pour éviter de perturber les gens

* L'aide switche avec le click bouton si plusieurs params
  
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

* Ajouter une page wikipedia avec des vidéos pour l'apprentissage de la construction zome

* Et une page community pour les gens qui n'auraient pas facebook

* Rajouter une option pour surelever le zome. avec des murs

* Ajouter une devanture 
  
* Wizzdome HR => WR width ratio::: plus compliqué mais faisable
