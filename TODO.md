# TODO-LIST

* [x] Améliorer la fonction planar pour aligner verticalement ou horizontalement la figure
* [x] Refonte du code : les planar points deviennent une variable de polygone flattened
  

* [ ] faire la différence entre outer_cover_3D/inner_cover_3D et vertices
* [ ] changer l'aide de ZH "visible part  of zome" ???  
* [ ] Coller la base du zome au sol => vanishing pt is 0 for last part
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

* [ ] Ajouter les languettes pour l'origami, et coller les pointes du zome.

* [ ] Wizzdome HR => WR width ratio::: plus compliqué mais faisable

* [ ] Attention aux exports, verifier que les axes ou vanishing lines ne soient pas exportés

* [ ] Sur le renforcement des tasseaux, 
  pouvoir avec un multiselect choisir les niveaux auquel les ajouter.