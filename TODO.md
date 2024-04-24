# TODO-LIST

* On imagine moins de catégories pour la 3D
 Skeleton
 Flattened Skeleton 
 Timber Profiles
 Mandala
  
 Dans les vue du skeleton, un bouton pour afficher : 
  les timbers profiles
  les faces interne
  les faces externes
 |<-    ->|   =

cela risque d'alourdir la vue 3D 
mais permettra de grandement mieux comprendre
l'emboitement des faces et de la charpente

On appliquer donc le quaternion des faces internes à l'ensemble du chose

On va donc avoir un groupe d'objets 3D que nous allons mettre à plat
avec un quaternion et une translation pour l'ensemble des objets.


------


Si le flattened faisait déjà le fit point 
et qu'au lieu de fitted_points on ai un centered_points
qui calcule les boundaries 
  

------

* [ ] Ne pas créer d'objets flattened array, mais qu'ils soient généré 
  par les collections au moment du process 3D
  
    ex : skeleton_3D_collections + flatten => timber_profiles_3D flatten
    donc pas besoin de créer des objets inutilements.
  
    

* [ ] Copier le hash des zome_faces dans inner 
  outer faces pour éviter de le recalculer et du coup de recalculer toute la géometrie


* [ ] Dessiner les crowns à plat en 2D avec les timbers profiles pour mieux comprendre le schéma de montage

* [ ] Ajouter l'export ZIP (svgs) et PDF pour les figures des timber profiles

* [ ] Revoir la méthode d'expansion quand le bindu est supérieur à 1, 
  car le montant du haut du triangle bas rentre dans le montat bas du triangle haut 
  
* [ ] Ajouter le bounding box sur le selected crown et mettre un bouton d'affichage
  seulement sur les faces et les montants

* [ ] Ajouter les renforts en plus de la division des polygones

* [ ] Ajouter le zomandala (Différent du mandala)
  https://docplayer.fr/188531290-Calculer-un-zome-selon-la-methode-zomandala-sans-logiciel-ni-ordinateur.html

* [ ] Comme pour les timbers profiles dessiner les losanges à plat en 3D

* [ ] Corriger bug sur les vues de côtés haut bas quand on se déplace dans la caméra. -> resetter avant de faire les vue
  de côté

* [ ] Renommer origami en 2D View
    * Mandala => All
    * Spiral =>
    * Zomandala ?? à Ajouter


* [ ] Corriger les points de la semelle de la méthode goodkarma
    * Sans doute dû aux inner/outer faces qui sont mal calculées pour le goodkarma

* [ ] Ajouter les boutons de navigation dans la 3D (home, <-, ->, etc....)

* [ ] Dans le flattened du trapezoidalPrism Ne pas renvoyer une polygone avec la face opposé pour éviter de lever
  l'exception de coplanarité

* [ ] Utiliser la css sticky pour afficher les crowns à côté des timbers profiles

* [ ] Revoir la terminologie de assembly method et de assembly direction pour plus de clarté (coupe des angles, methode
  de coupe)

* [ ] Ajouter les languettes pour l'origami, et coller les pointes du zome.

* [ ] Mettre à jour les autres traductions avec les termes manquants

* [ ] Ajouter la direction d'assemblage automatique pour éviter les découpes trop aigus

* [ ] Ajouter une page wikipedia avec les vidéos youtube pour l'apprentissage de la construction zome
