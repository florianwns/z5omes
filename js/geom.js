function p3(x, y, z) {
    return [x, y, z];
}

function p2(x, y) {
    return [x, y];
}

function add(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function mul(a, f) {
    return [a[0] * f, a[1] * f, a[2] * f];
}

function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function len2(a) {
    return dot(a, a);
}

function len(a) {
    return Math.sqrt(len2(a));
}

function dist(a, b) {
    return len(sub(a, b));
}

function normalize(a) {
    return mul(a, 1 / len(a));
}

function cross(a, b) {
    return p3(a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]);
}

function mid(a, b) {
    return mul(add(a, b), 0.5);
}

function angle(p1, p2, p3) {
    return Math.acos(dot(normalize(sub(p1, p2)), normalize(sub(p3, p2))));
}

function dihedral_angle(a, b, c) {
    // https://www.had2know.org/academics/dihedral-angle-calculator-polyhedron.html
    return Math.acos(
        (Math.cos(a) - (Math.cos(b) * Math.cos(c))) / (Math.sin(b) * Math.sin(c))
    )
}

function rot2d(v, theta) {
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    return p2(v[0] * c - v[1] * s, v[0] * s + v[1] * c);
}

function deg2rad(deg) {
    return deg * Math.PI / 180;
}

function rad2deg(rad) {
    return 180.0 * rad / Math.PI;
}

function toDecimal(x, fractionDigits = 2) {
    return parseFloat(x.toFixed(fractionDigits));
}

function reprDistance(d) {
    // d unit is in mm
    if (d >= 1e6) {
        return toDecimal(d / 1e6) + "km";
    } else if (d >= 1e3) {
        return toDecimal(d / 1e3) + "m";
    } else if (d >= 10) {
        return toDecimal(d / 10) + "cm";
    } else {
        return toDecimal(d) + "mm";
    }
};

function to_mm(v, unit) {
    switch (unit) {
        case "m":
            return v * 1000;
        case "cm":
            return v * 10;
        case "mm":
        default:
            return v;
    }
}

function reprArea(d) {
    // d unit is in mm²
    if (d >= 1e12) {
        return toDecimal(d / 1e12) + "km²";
    } else if (d >= 1e6) {
        return toDecimal(d / 1e6) + "m²";
    } else if (d >= 100) {
        return toDecimal(d / 100) + "cm²";
    } else {
        return toDecimal(d) + "mm²";
    }
};

function reprAngle(a, fractionDigits = 2) {
    return a ? a.toFixed(fractionDigits) + "°" : "";
}

function reprArr(arr, unit = "") {
    const res = _.join(_.map(arr, v => v + unit), ", ");
    return `${res}`;
}

function uniqueArr(arr) {
    const s = new Set(arr);
    return [...s];
}


class ConvexPolygon {
    constructor(points) {
        // Consider that polygon is made by triangle,
        if (points.length < 3) {
            console.error("Not enough points to make a polygon");
            return;
        }

        this.points = points;                       // 3D Points
    }

    get O() {
        //  Consider first point like the origin
        return this.points[0];
    }

    get num_points() {
        return this.points.length;
    }

    get faces() {
        // Traverse the triangles that form the polygon
        let faces = []
        for (let i = 1, j = 2; j < this.num_points; i++, j++) {
            faces.push(
                new Triangle([this.points[0], this.points[i], this.points[j]])
            );
        }
        return faces
    }

    get area() {
        // Add the areas of the triangles
        return _.reduce(this.faces, (res, t) => res + t.area, 0);
    }

    get edges() {
        // Compute Edges
        return _.map(this.points, (p, i) => [p, this.points[(i + 1) % this.num_points]]);
    }

    get edge_distances() {
        // Compute edges distances
        return _.map(this.edges, (e, i) => dist(...e));
    }

    get perimeter() {
        // Compute perimeter from distances
        return _.reduce(this.edge_distances, (res, distance) => res + distance, 0);
    }

    get angles() {
        return _.map(this.points, (p, i) => angle(
            this.points[(this.num_points + i - 1) % this.num_points],
            p,
            this.points[(i + 1) % this.num_points]
        ));
    }

    get deg_angles() {
        return _.map(this.angles, a => rad2deg(a));
    }

    get diameter() {
        return 2 * dist(this.O, [0, this.O[1], 0]);
    }

    get size() {
        const points_2d = this.to_2D();

        let xMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE;
        let yMin = Number.MAX_VALUE, yMax = Number.MIN_VALUE;
        let x, y;

        // Planar Polygon to Make 2D Representation, and compute parameters in one loop
        for (let iP = 0; iP < points_2d.length; iP++) {
            // Create the new 2D point
            [x, y] = points_2d[iP];

            // Save Boundaries
            if (x < xMin) xMin = x;
            if (x > xMax) xMax = x;
            if (y < yMin) yMin = y;
            if (y > yMax) yMax = y;
        }

        // Subtract xMin and yMin (because SVG viewBox is not updated with AlpineJs)
        return {
            width: Math.abs(xMax - xMin),
            height: Math.abs(yMax - yMin)
        };
    }

    to_2D() {
        // Convert to 2D, compute Boundaries, and get width and height
        let points_2d = []

        // Make a reference to planar 3D points to 2D
        const [O, B, C] = [this.points[0], this.points[1], this.points[this.num_points - 1]]; // Take first point like origin
        const xRef = normalize(sub(C, O));
        const yRef = normalize(sub(sub(B, O), mul(xRef, dot(sub(B, O), xRef))));
        const ref_angle = Math.PI / 2 - angle(C, O, B) / 2;

        let x, y;

        // Planar Polygon to Make 2D Representation, and compute parameters in one loop
        for (let iV = 0; iV < this.num_points; iV++) {
            // Create the new 2D point
            [x, y] = rot2d(
                p2(
                    dot(sub(this.points[iV], O), xRef),
                    dot(sub(this.points[iV], O), yRef)
                ),
                ref_angle
            )
            points_2d.push([x, y]);
        }
        return points_2d;
    }
}


class InclinedPolygon extends ConvexPolygon {
    constructor(points) {
        super(points);
    }

    get A() {
        return this.O;
    }

    get B() {
        return this.points[1];
    }

    get C() {
        return this.points[this.num_points - 1];
    }

    get hat() {
        // The triangle at the top of polygon
        return [this.A, this.B, this.C];
    }

    get hat_triangle() {
        // The triangle at the top of polygon
        return new Triangle(this.hat);
    }

    get φ() {
        // The vertical ↓ angle
        return angle(this.C, this.A, this.B);
    }

    get ω() {
        // The horizontal → angle
        return angle(this.A, this.B, this.points[2]);
    }

    get ψ() {
        // The additional angle, (→ for triangle, ↑ for kite, ↗ for truncated kite)
        return angle(this.B, this.points[2], this.points[3 % this.num_points]);
    }

    get top_edge() {
        return dist(this.A, this.B);
    }

    get I() {
        return mid(this.B, this.C);
    }

    get top_height() {
        return this.hat_triangle.height;
    }

    get bottom_height() {
        return 0;
    }

    get slope() {
        // Compute the slope of the hat
        return angle(this.A, this.I, [this.A[0], this.I[1], this.A[2]]);
    }

    get θ() {
        // Other name for slope
        return this.slope;
    }

    get diameter() {
        return 2 * dist(this.B, [0, this.B[1], 0]);
    }
}


class Triangle extends InclinedPolygon {
    get area() {
        // Heron formula
        const s = this.perimeter / 2;
        return Math.sqrt(_.reduce(this.edge_distances, (res, d) => res * (s - d), s));
    }

    get base() {
        const [, B, C] = this.points;
        return dist(B, C);
    }

    get height() {
        return (2 * this.area) / this.base;
    }
}

class Kite extends InclinedPolygon {
    //  Consider Kite like this       A
    //  points = [A, B, D, C]       B ◇ C
    //                                D

    // A, B, C Form the top_triangle
    // B, D, C Form the Base

    get bottom_height() {
        const [, B, D, C] = this.points;
        const bottom_triangle = new Triangle([D, B, C]);
        return bottom_triangle.height;
    }
}

class Rhombus extends Kite {
}


class TruncatedKite extends Kite {
    //  Consider this Trapezium            A
    //  points = [A, B, E, F, C]         B ◇ C
    //                                    E F

    get angles() {
        return [
            this.φ, this.ω, this.ψ
        ];
    }

    get bottom_height() {
        const [, B, E, F, C] = this.points;
        return dist(mid(B, C), mid(E, F))
    }
}


class ZomeBase extends ConvexPolygon {
    get top_height() {
        return 0;
    }

    get bottom_height() {
        return 0;
    }
}

