# TODO-LIST

* [ ] Inverser le quaternion et l'appliquer au mesh du timber profile ...impeccable

* [ ] Ajouter le zomandala (Différent du mandala)
  https://docplayer.fr/188531290-Calculer-un-zome-selon-la-methode-zomandala-sans-logiciel-ni-ordinateur.html
  
* [ ] Dessiner les crowns à plat avec les timbers profiles pour mieux comprendre le schéma de montage

* [ ] Utiliser la css sticky pour afficher les crowns à côté des timbers profiles

* [ ] Ajouter l'angle diedre au niveau du dessing des faces avec les timbers profiles

* [ ] Revoir la terminologie de assembly method et de assembly direction pour plus de clarté (coupe des angles, methode de coupe)

* [ ] Grouper les montants lors de l'export
  
* [ ] Comme pour les timbers profiles dessiner les losanges à plat en 3D

* [ ] Ajouter les languettes pour l'origami, et coller les pointes du zome.

* [ ] Ajouter les labels et angles sur la 3D grace au canvastexture

  https://threejs.org/docs/#api/en/textures/CanvasTexture
  
  const cv = document.createElement( 'canvas' );
  cv.width = 1536 //  3 * 512   // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  cv.height = 512;// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const ctx = cv.getContext( '2d' );
  
  const txtGeometry = new THREE.BoxGeometry( 2.4, 0.8, 0.1 ); // w 3 : h 1 // <<<<<<<<<
  const cvTexture = new THREE.Texture( cv );

* [ ] Mettre à jour les autres traductions avec les termes manquants

  * Commencer à dessiner la premier polygone (vue de dessus)
  * La hauteur du dessin est fixe
  * Sa largeur est donc relative.... on peut la tronquer avec des pointillés
  * l'angle de coupe arrière est dessinée en pointillés
  * Ajouter les indexs des montants/faces sur la 3D
  
* [ ] Ajouter la direction d'assemblage automatique pour éviter les découpes trop aigus
  
* [ ] Changer l'aide de ZH "visible part  of zome" ???  

* [ ] Coller la base du zome au sol => vanishing pt is 0 for last part
  
* [ ] Rajouter les essences de bois pour calculer le poids total du zome
  
  * https://www.warmaths.fr/SCIENCES/densiteCatalogue..htm
  * https://www.cndb.org/site/wp-content/uploads/2019/01/Le_Guide_des_Essences_de_Bois_Yves_Benoit_FCBA_Eyrolles.pdf


* [ ] S'inspirer des nommages de l'application acidome 
  
  * base => platform / floor

* [ ] Sur le renforcement des tasseaux,
  pouvoir avec un multiselect choisir les niveaux auquel les ajouter.

* [ ] Rajouter une semelle pour mettre de niveau à la base.

* [ ] Rajouter un paramètre d'aire qui switche la hauteur

* [ ] HR devient un boutton de switch avec M pour éviter de perturber les gens

* [ ] L'aide switche avec le click bouton si plusieurs params

* [ ] Ajouter une page wikipedia avec des vidéos pour l'apprentissage de la construction zome

* [ ] Et une page community pour les gens qui n'auraient pas facebook

* [ ] Rajouter une option pour surelever le zome. avec des murs

* [ ] Wizzdome HR => WR width ratio::: plus compliqué mais faisable

* [ ] Attention aux exports, verifier que les axes ou vanishing lines ne soient pas exportés
