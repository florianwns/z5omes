# TODO-LIST

* [x] Améliorer la fonction planar pour aligner verticalement ou horizontalement la figure
* [x] Refonte du code : les planar points deviennent une variable de polygone flattened
* [x] Trouver pourquoi l'axe y est inversé sur certains prism
* [x] Faire la différence entre external_faces/internal_faces
* [x] Donner à chaque montant le label de la figure dont il provient
* [x] Construire/ Indexer les montants du bas vers le haut => utiliser average des points en Y

* [ ] Les external/internal faces ne doivent plus se diviser en triangle si renfort horizontal/vertical

* [ ] Reconstruire le sol à partir des external faces

* [ ] Mettre à jour les traductions avec les termes manquants

* [ ] Ajouter les dimensions aux flattened points
  
* [ ] Ajouter la direction d'assemblage automatique pour éviter les découpes trop aigus
  
* [ ] Changer l'aide de ZH "visible part  of zome" ???  
* [ ] Coller la base du zome au sol => vanishing pt is 0 for last part
  
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

* [ ] S'inspirer des nommages de l'application acidome 
  
  * base => platform / floor

* [ ] Sur le renforcement des tasseaux,
  pouvoir avec un multiselect choisir les niveaux auquel les ajouter.

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

* [ ] Ajouter une page wikipedia avec des vidéos pour l'apprentissage de la construction zome

* [ ] Et une page community pour les gens qui n'auraient pas facebook

* [ ] Rajouter une option pour surelever le zome. avec des murs

* [ ] Ajouter les languettes pour l'origami, et coller les pointes du zome.

* [ ] Wizzdome HR => WR width ratio::: plus compliqué mais faisable

* [ ] Attention aux exports, verifier que les axes ou vanishing lines ne soient pas exportés
