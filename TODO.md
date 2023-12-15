# TODO-LIST

* [x] Rajouter les réglages de dimensionnement (DONE)
* [x] Export modèle à l'échelle (DONE)
* [x] Clean de la lib geom.js => core.js
* [x] Dessiner les montants en  goodkarma (intersection des plans)
* [x] Ajouter le mode horaire/anti_horaire pour le goodkarma
* [x] Ajoût des autres méthodes de contructions (Semicone)
* [x] Validation de nos modèles
* [x] Ajoût du "BizeledLength" 
* [x] Contraindre les limites de timber width/thickness
* [x] Url parametrée
* [x] Sauver et revenir à l'état d'origine pour éviter le rafraichissement de la page.
* [x] Lien de partage de l'URL qui copie colle dans le presse papier.
* [x] Affichage de message (toast: https://getbootstrap.com/docs/5.2/components/toasts/) pour
  * Copier/Coller
  * Save settings
  * reset settings
* [x] Mandala : export en 3D : .obj
* [x] rajout de la méthode jeam soum 
* [x] Ajouter les lignes pour chaque polygone (bug sur les mediane en beveled et aussi sur zomandala)
* [x] Fix edge line segments
* [x] Supprimer les circular distribution
* [x] Grouper les montants (en fonction de leur aire / simple) pour les colorier
* [x] Attribuer les couleurs en fonction du hash/area : Color.from_index
* [x] Option des couleurs : Slope/Rotation Angle or Group by Area
* [x] Rajouter le mode plein écran pour la 3D
* [x] Raccourci clavier à afficher
* [x] Réparer la méthode beveled 
* [x] Rajouter les montants de renforts horizontal/vertical
* [x] Couleur par montants qui sont les mêmes
* [x] Faire fonctionner les tooltips avec le système de traduction
* [x] ZooOoomes devient le lien de l'appli
* [x] Finir de traduire l'appli en français
* [x] Envelop => coverage
* [x] Corriger le padding du container en mode telephone

* [ ] Préindexer les polygons/figures avec un label
* [ ] Donner à chaque montant le label de la figure dont il provient
* [ ] Construire/ Indexer les montants du bas vers le haut.
  
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
  
* [ ] Les dessins de profils sont toujours fais de la même façon :
  
  * La largeur est fixe (équivalent à la longueur du montant)
  * La face de devant est dessiné au trait plein
  * Celle de derrière en pointillés.

* [ ] Rajouter les essences de bois pour calculer le poids total du zome
  
  * https://www.warmaths.fr/SCIENCES/densiteCatalogue..htm
  * https://www.cndb.org/site/wp-content/uploads/2019/01/Le_Guide_des_Essences_de_Bois_Yves_Benoit_FCBA_Eyrolles.pdf

* [ ] Grouper les montants lors de l'export

* [ ] Intersection avec le modèle sketchup à regarder.

* [ ] Différencier les couvertures intérieur et extérieur. 

* [ ] Habillage intérieur : Plafond == couverture intérieur

* [ ] Couveture extérieure et intérieur
  
  * Prendre chaque A ou E point des prismes

* [ ] S'inspirer des nommages de l'application acidome 
  
  * base => platform / floor

* [ ] Rajouter les limites de renforts avec un slider double :
  
  * https://tailwindcomponents.com/component/multi-range-slider
  * faire la même avec les classes bootstrap ??

* [ ] Rajouter une semelle pour mettre de niveau à la base.

* [ ] Rajouter un paramètre d'aire qui switche la hauteur

* [ ] HR devient un boutton de switch avec M pour éviter de perturber les gens

* [ ] L'aide switche avec le click bouton si plusieurs params

* [ ] Et enfin dessiner les côtes (mode acidome) de chaque montants
  
  * Commencer à dessiner la premier polygone (vue de dessus)
  * La hauteur du dessin est fixe
  * Sa largeur est donc relative.... on peut la tronquer avec des pointillés
  * l'angle de coupe arrière est dessinée en pointillés
  * Ajouter les indexs des montants/faces sur la 3D

* [ ] Utiliser le LRU Cache ?? je sais trop si c'est nécessaire.... 
  
  ```
  const ANGLES2COLOR_CACHE = new LRU(10);
  [Math.PI, TAU].forEach(a => ANGLES2COLOR_CACHE.set(a, Color.from_angles(a)));
  ANGLES2COLOR_CACHE.get(TAU);
  ```

* [ ] Ajouter une page wikipedia avec des vidéos pour l'apprentissage de la construction zome

* [ ] Et une page community pour les gens qui n'auraient pas facebook

* [ ] Rajouter une option pour surelever le zome. avec des murs

* [ ] Ajouter une devanture 

* [ ] Wizzdome HR => WR width ratio::: plus compliqué mais faisable
