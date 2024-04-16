# TODO-LIST

* [ ] ma première methode de division ne fonctionne pas totalement.
  Il faut revoir l'approche en utilisant la théorie des graphes et l'exploration par noeud.
  en gardant l'idée que si un noeud a un angle de 180 degree on ne l'ajoute pas.

* [ ] 🚿 La douche portant conseil, on peut imaginer changer la couleur des montants au clic souris
  passant du bleu au vert et devenant des renfort plutôt que des divisions.
  cela remplirait deux tableaux distincts (un pour la disivion des polygons et l'autre pour le renfort de montants)
  sachant qu'on ne peut avoir une division et un renfort au même endroit.
  un seul tableau sera sans doute plus logique du coup



```
Tableau pouvant representer la division d'un losange
1 => Point du losange
2 => Milieu d'un segment externe du losange
3 => Milieu d'un segment vers le centroid
c => pour centroid 

0 0 0 0 1 0 0 0 0
0 0 0 / 0 \ 0 0 0
0 0 2 0 3 0 2 0 0
0 / 0 0 0 x 0 \ 0
1 0 3 0 c 0 3 0 1
0 \ 0 0 0 0 0 / 0
0 0 2 0 3 0 2 0 0
0 0 0 \ 0 / 0 0 0
0 0 0 0 1 0 0 0 0

Indices des points une fois mergés

        0 
      /   \ 
    1   8   7 
  /          \ 
2   9   12  11 6
  \          / 
    3   10  5 
      \   / 
        4 
        
ex : 

        0 
      / | \ 
    1   8   7 
  /   \ |    \ 
2 - 9 - 12-11-6
  \     |    / 
    3   10  5 
      \ | / 
        4
        

On part de 0-1 et on essaye de trouver le chemin le plus court.
En principentrouve 0-1-12-8-0 puis on créer un polygone avec ses points
auquel on retire les points dont l'angle est à 180°.

        A 
      / | \ 
    B   I   H 
  /   \ |    \ 
 C- J - M - L-G
  \     |    / 
    D   K  F 
      \ | / 
        E
        
à partir du graphe ci dessous :

const graph = {
    A: { B: 1, I: 1, H: 1},              
    B: { A: 1, C: 1, M: 1},        
    C: { B: 1, J: 1, D: 1},
    D: { C: 1, E: 1},
    E: { D: 1, K: 1, F: 1},
    F: { E: 1, G: 1},
    G: { F: 1, L: 1, H: 1},
    H: { G: 1, A: 1},
    I: { A: 1, M: 1},
    J: { C: 1, M: 1},
    K: { E: 1, M: 1},
    L: { G: 1, M: 1},
    M: { I: 1, J: 1, K: 1, L: 1},
};

const graph = {
    A: [ "B", "I", "H" ],
    B: [ "A", "C", "M" ],
    C: [ "B", "J", "D" ],
    D: [ "C", "E" ],
    E: [ "D", "K", "F"],
    F: [ "E", "G"],
    G: [ "F", "L", "H"],
    H: [ "G", "A"],
    I: [ "A", "M"],
    J: [ "C", "M"],
    K: [ "E", "M"],
    L: [ "G", "M"],
    M: [ "I", "J", "K", "L"],
};



peux tu trouver l'ensemble des chemins qui partent d'un point de départ, 
qui reviennent au même point en passant par au minimum 3 noeuds mais qui ne passe pas deux fois au même endroit  ?




```


* [ ] un fois la matrice en place, il faut pouvoir diviser le losange à partir de ça
  <br>.... trouver l'algo pour ça
  
* [ ] pour le flattened mandala avec le bindu zome, 
  pas de rotate sur le même crown_index

* [ ] Essayer de faire un zome bindu

* [ ] Ajouter le zomandala (Différent du mandala)
  https://docplayer.fr/188531290-Calculer-un-zome-selon-la-methode-zomandala-sans-logiciel-ni-ordinateur.html

* [ ] Dessiner les crowns à plat avec les timbers profiles pour mieux comprendre le schéma de montage

* [ ] Comme pour les timbers profiles dessiner les losanges à plat en 3D


* [ ] Utiliser le clic droit Three js pour modifier des faces
  https://github.com/timoxley/threejs/blob/master/examples/webgl_interactive_cubes.html
  
  Le raycasting ne marche pas bien sur les meshs clonés,
    il faut donc ne pas cloner les mesh, mais le polygon/prism qui aura son propre mesh
    la rotation ne se fait plus au niveau de la 3D et du mandala, 
    mais au niveau de la création du zome, 
    le polygon prendra aussi un uuid afin d'être identifié, via son mesh dans le userData.uuid
    le compte des pièce ne sera plus multiplié par N puisque les pièce existeront bel et bien
    pour cela il vaut mieux créer une branche.
    
* [ ] Au clic souris sur un element, à partir de sa position (i, j)
  sélectionne le type de l'element de la face au sein de la matrice
  
  Ajouter un bouding box autour de tout les elements portant le même couple i, j
  
  Commencer avec les losanges plein, faire les moitiés de losanges plus tard
  Sauvegarder la matrice dans les paramètres.
  

* [ ] Corriger bug sur les vues de côtés haut bas quand on se déplace dans la caméra.
  -> resetter avant de faire les vue de côté 
  
* [ ] Renommer origami en 2D View
  * Mandala => All
  * Spiral => 
  * Zomandala ?? à Ajouter 
  
* [ ] Renommed mandala par flattened

* [ ] Corriger les points de la semelle de la méthode goodkarma
  * Sans doute dû aux inner/outer faces qui sont mal calculées pour le goodkarma
    
* [ ] Ajouter les boutons de navigation dans la 3D (home, <-, ->, etc....)

* [ ] Ajouter l'export SVG et PDF 
   
* [ ] Dans le flattened du trapezoidalPrism Ne pas renvoyer une polygone avec la face opposé pour éviter de lever l'exception de coplanarité
  
* [ ] Utiliser la css sticky pour afficher les crowns à côté des timbers profiles

* [ ] Ajouter l'angle diedre au niveau du dessin des faces avec les timbers profiles

* [ ] Revoir la terminologie de assembly method et de assembly direction pour plus de clarté (coupe des angles, methode
  de coupe)
  
* [ ] Ajouter les languettes pour l'origami, et coller les pointes du zome.

* [ ] Mettre à jour les autres traductions avec les termes manquants

    * Commencer à dessiner la premier polygone (vue de dessus)
    * La hauteur du dessin est fixe
    * Sa largeur est donc relative.... on peut la tronquer avec des pointillés
    * l'angle de coupe arrière est dessinée en pointillés
    * Ajouter les indexs des montants/faces sur la 3D

* [ ] Ajouter la direction d'assemblage automatique pour éviter les découpes trop aigus

* [ ] Rajouter les essences de bois pour calculer le poids total du zome

    * https://www.warmaths.fr/SCIENCES/densiteCatalogue..htm
    * https://www.cndb.org/site/wp-content/uploads/2019/01/Le_Guide_des_Essences_de_Bois_Yves_Benoit_FCBA_Eyrolles.pdf
  

* [ ] Ajouter une page wikipedia avec des vidéos pour l'apprentissage de la construction zome

* [ ] Et une page community pour les gens qui n'auraient pas facebook
