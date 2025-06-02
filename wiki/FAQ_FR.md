# Foire Aux Questions (FAQ)

### **À quoi sert exactement Z5omes ? Est-ce un simple outil de modélisation ?**

Z5omes ne se limite pas à être un simple outil de modélisation. Il possède **plusieurs facettes** :

- Un **aspect pédagogique**, pour jouer avec les paramètres du Zome, faire de l’origami et apprivoiser ce type de volume géométrique.
- Un **aspect pratique**, qui permet à des non-mathématiciens de concevoir ce type de structure et de l’exporter dans des **formats 3D**.
- Un **aspect métier**, offrant la possibilité d’imprimer directement les cotes et les plans de coupe pour une **mise en production** sur machine.

Z5omes s’adresse donc autant aux curieux qu’aux bricoleurs ou professionnels souhaitant passer à la fabrication.

---

## Qu'est-ce qu'un angle dièdre ?

Un **angle dièdre** est l'angle formé entre deux faces planes qui se rejoignent le long d'une arête.
<br>Dans un Zome, c’est l’angle entre deux panneaux qui se touchent.

---

## Pourquoi est-il important de connaître l’angle dièdre dans un Zome ?

L’angle dièdre permet :
- De couper correctement les panneaux.
- De fabriquer des cales à la bonne inclinaison.
- D’assurer un bon ajustement et la stabilité de la structure.

---

## Comment calcule-t-on l’angle dièdre dans un Zome ?

L’angle dièdre dépend de la forme géométrique du Zome. Si on connaît la direction des deux faces qui se rejoignent, on peut calculer l’angle dièdre à partir de leurs orientations.

Une méthode consiste à calculer l’angle entre les vecteurs perpendiculaires (normaux) à ces deux faces. Si les vecteurs sont connus, on peut calculer le cosinus de l’angle entre eux, puis en déduire l’angle dièdre.

---

## Quelle est la relation entre l’angle dièdre et l’angle des cales ?

Les **cales** sont les pièces inclinées qui permettent de combler l’écart entre deux panneaux.

La relation est simple :
  
**Angle des cales = 180 degrés - angle dièdre**

Par exemple :
- Si l’angle dièdre est de 140 degrés, l’angle des cales sera de 40 degrés.

---

### **Les angles des plans ne correspondent pas à ceux que je trouve en mesurant les angles des pièces ?**

Les angles donnés sont les **angles de coupe face machine**, car les charpentiers/menuisiers ne veulent pas se rajouter une couche des calculs au moment de l'usinage 😉.  
Ce n’est pas toujours évident à comprendre au premier abord, et ce genre de question revient régulièrement.

À noter : la partie dessin a été fastidieuse à développer pour moi, car je n’avais jamais codé ce genre de chose.

C’est aussi pour cette raison que je recommande d’utiliser ensuite un **véritable outil de CAO**, car il me serait difficile sur mon temps libre d’atteindre la qualité du module de plans comme celui **FreeCAD** par exemple.

Les dessins sont inspirés d’**Acidome**, une référence dans les dômes géodésiques afin de ne pas déstabiliser la communauté.
Même si ce n’est pas du dessin « industriel/conventionnel » à proprement parler, ces plans permettent de passer rapidement à l'usinage sans rajouter une couche de calculs.


👉 **Les plans peuvent être utilisés tels quels** et sont d’ailleurs utilisés en production par **La Tanière à Mémé**.

---

### **Avec le modèle GoodKarma, les montants ne jointent pas très bien. Est-ce normal ? Est-ce dû au modèle GoodKarma ?**


Oui, c’est tout à fait **normal** ! Le modèle **GoodKarma** ne « matche » pas parfaitement, et il y a une **subtilité dans les coupes** :

- Certains assemblent le GoodKarma tel quel, d’autres ajustent avec une **toupie ou un rabot**, en enlevant la matière des montants qui dépasse du plan des faces extérieures, afin de poser un **panneau OSB** ensuite.
- Pour améliorer l'ajustement, on peut **jouer sur la hauteur du "point de fuite" (paramètre `VP`)**.

📌 Vous pouvez comparer la vue des **faces extérieures** avec celle des **montants** pour mieux comprendre.  
Certains montants sont marqués "**Biseau**" ou "**Pas de Biseau**", indiquant la matière à enlever.

---

## 🧰 Comparatif des Méthodes de Coupe

| Méthode      | Avantages                                                                 | Inconvénients                                                                                 |
|--------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| **GoodKarma** | - Découpe simplifiée (pas de biseau dans la longueur)  <br> - Fixation perpendiculaire facile | - Nécessite un **enlèvement de matière** pour un bon ajustement                              |
| **Beveled**   | - Résultat final **très propre et précis** <br> - Projection parfaite      | - Très difficile à débiter <br> - Biseau dans la longueur peut **fragiliser** la structure   |
| **Xpansion** / **Jean Soum** | - Très facile à couper <br> - Méthode la plus **accessible** | - Montage plus hasardeux <br> - Nécessite cales triangulaires ou tordre les filetages        |

📎 **Note :**  
Aucune méthode n’est parfaite pour l’instant.  
Chacun choisit selon ses compétences, son matériel, et le niveau de finition souhaité.

---

