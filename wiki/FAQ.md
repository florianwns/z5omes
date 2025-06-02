# Frequently Asked Questions (FAQ)

### **What exactly is Z5omes? Is it just a modeling tool?**

Z5omes is much more than just a modeling tool. It has **multiple dimensions**:

- An **educational aspect**, allowing users to play with Zome parameters, experiment with origami, and get familiar with this type of geometric volume.
- A **practical aspect**, enabling non-mathematicians to design such structures and export them in **3D formats**.
- A **professional aspect**, with the ability to directly print measurements and cutting plans for **machine production**.

Z5omes is aimed at curious minds, hobbyists, and professionals ready to move into fabrication.

---

## What is a dihedral angle?

A **dihedral angle** is the angle formed between two flat faces that meet along an edge.  
In a Zome, it is the angle between two adjacent panels.

---

## Why is it important to know the dihedral angle in a Zome?

The dihedral angle helps to:
- Cut the panels accurately.
- Make spacers with the correct inclination.
- Ensure proper fit and structural stability.

---

## How is the dihedral angle calculated in a Zome?

The dihedral angle depends on the geometric shape of the Zome. If the orientation of the two meeting faces is known, the dihedral angle can be calculated from their directions.

One method is to calculate the angle between the perpendicular (normal) vectors of the two faces. If these vectors are known, the cosine of the angle between them can be used to find the dihedral angle.

---

## What is the relation between the dihedral angle and the spacer angle?

**Spacers** are angled pieces used to bridge the gap between two panels.

The relation is simple:

**Spacer angle = 180 degrees - dihedral angle**

Example:
- If the dihedral angle is 140 degrees, the spacer angle will be 40 degrees.

---

### **The angles in the plans don't match the ones I measure on the actual pieces — is that normal?**

The angles provided are **machine-facing cutting angles**, because carpenters and woodworkers don’t want to deal with extra calculations during machining 😉.  
It’s not always easy to grasp at first, and this question comes up frequently.

Note: the drawing module was quite a challenge to develop, as I had never coded anything like it before.

That’s also why I recommend eventually using a **proper CAD tool**, since it would be hard for me to match the quality of a plan module like **FreeCAD** in my spare time.

The plan layout is inspired by **Acidome**, a reference for geodesic domes, in order not to confuse the existing community.  
Although not technically "industrial/conventional" drawings, these plans are ready for **direct machining without extra calculations**.

👉 **The plans can be used as-is**, and are currently used in production by **La Tanière à Mémé** in the Jura region.

---

### **With the GoodKarma model, the struts don’t fit together very well. Is that normal? Is it a flaw in the model?**

Yes, that’s **completely normal**! The **GoodKarma** model isn’t a perfect match — there’s a **subtlety in the cuts**:

- Some builders assemble GoodKarma as-is; others use a **router or planer** to trim material from struts that extend past the face plane, making it easier to attach an **OSB panel** afterward.
- To improve the fit, you can **adjust the height of the “vanishing point” (the `VP` parameter)**.

📌 Compare the **outer faces** view with the **struts view** for better understanding.  
Some struts are marked "**Bevel**" or "**No Bevel**", indicating where material needs to be removed.

---

## 🧰 Comparison of Cutting Methods

| Method         | Advantages                                                                | Disadvantages                                                                                  |
|----------------|---------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **GoodKarma**  | - Simplified cuts (no bevels along the length) <br> - Easy perpendicular fastening | - Requires **material removal** for a good fit                                                |
| **Beveled**    | - **Very clean and precise** result <br> - Perfect projection              | - Very difficult to cut <br> - Long bevels can **weaken** the structure                       |
| **Xpansion** / **Jean Soum** | - Very easy to cut <br> - Most **accessible** method             | - Less precise assembly <br> - Requires triangular shims or bent threads                     |

📎 **Note:**  
No method is perfect at the moment.  
Everyone chooses based on their skills, equipment, and desired finish quality.
