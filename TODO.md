# TODO-LIST

* [ ] Adapter le dessin 
  fois la matrice en place, il faut pouvoir diviser le losange à partir de ça
  <br>.... trouver l'algo pour ça

https://www.inesc-id.pt/ficheiros/publicacoes/936.pdf

on peut aussi utiliser la detection de contours avec opencv
https://docs.opencv.org/3.4/dc/dcf/tutorial_js_contour_features.html

la méthode Convex Hull fonctionnerait bien en effet

```js
let src = cv.imread('canvasInput');
let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
cv.threshold(src, src, 100, 200, cv.THRESH_BINARY);
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
let hull = new cv.MatVector();
cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
// approximates each contour to convex hull
for (let i = 0; i < contours.size(); ++i) {
  let tmp = new cv.Mat();
  let cnt = contours.get(i);
  // You can try more different parameters
  cv.convexHull(cnt, tmp, false, true);
  hull.push_back(tmp);
  cnt.delete(); tmp.delete();
}
// draw contours with random Scalar
for (let i = 0; i < contours.size(); ++i) {
  let colorHull = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
          Math.round(Math.random() * 255));
  cv.drawContours(dst, hull, i, colorHull, 1, 8, hierarchy, 0);
}
cv.imshow('canvasOutput', dst);
src.delete(); dst.delete(); hierarchy.delete(); contours.delete(); hull.delete();
```

et il faudrait trouver les points les plus proches
une fois les polygones extraits



pour charger le svg dans le canvas 

https://www.tutorialspoint.com/How-to-draw-an-SVG-file-on-an-HTML5-canvas

```js
var canvas = document.getElementById('myCanvas');
 var ctx = canvas.getContext('2d');
 var data = '<svg xmlns="http://www.w3.org/2000/svg" width="300"></svg>';
 var DOMURL = window.URL || window.webkitURL || window;
 var img1 = new Image();
 var svg = new Blob([data], {type: 'image/svg+xml'});
 var url = DOMURL.createObjectURL(svg);
 img1.onload = function() {
    ctx.drawImage(img1, 25, 70);
    DOMURL.revokeObjectURL(url);
 }
 img1.src = url;
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
