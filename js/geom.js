// Constants
const TAU = 2 * Math.PI;    // 360° in rad
const TAU_Q = Math.PI / 2;  // 90° in rad


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
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function mid(a, b) {
    return mul(add(a, b), 0.5);
}

function angle(p1, p2, p3) {
    const a = dist(p2, p3);
    const b = dist(p1, p2);
    const c = dist(p1, p3);
    return Math.acos((c * c - a * a - b * b) / (-2 * a * b)) || 0;
}

function dihedral_angle(a, b, c) {
    // https://www.had2know.org/academics/dihedral-angle-calculator-polyhedron.html
    return Math.acos(
        (Math.cos(a) - (Math.cos(b) * Math.cos(c))) / (Math.sin(b) * Math.sin(c))
    )
}

function rot2d(v, theta, o = [0, 0, 0]) {
    const sin_theta = Math.sin(theta);
    const cos_theta = Math.cos(theta);
    let xM = v[0] - o[0];
    let yM = v[1] - o[1];
    let x = xM * cos_theta - yM * sin_theta + o[0];
    let y = xM * sin_theta + yM * cos_theta + o[1];
    return [x, y, 0]
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
    if (isNaN(d)) {
        return "";
    }

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


function from_mm(v, unit) {
    switch (unit) {
        case "m":
            return v / 1000;
        case "cm":
            return v / 10;
        case "mm":
        default:
            return v;
    }
}

function reprArea(d) {
    // d unit is in mm²
    if (isNaN(d)) {
        return "";
    }

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
    return !isNaN(a) ? a.toFixed(fractionDigits) + "°" : "";
}

function reprArr(arr, unit = "") {
    const res = _.join(_.map(arr, v => v + unit), " ");
    return `${res}`;
}

function uniqueArr(arr) {
    // Set retains list order
    const s = new Set(arr);
    return [...s];
}

function hsl2rgb(h, s, l) {
    // output RGB have 0 to 1 value (not 255)
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)];
};

function rgb2hex(rgb) {
    return `#${_.reduce(rgb, (res, v) => res + parseInt(255 * v).toString(16).toUpperCase().padStart(2, '0'), "")}`;
};


class Color {
    constructor(rgb) {
        // Consider that polygon is made by triangle,
        this.rgb = rgb;
        this.hex = rgb2hex(rgb);
    }
}

function angle2color(theta = 0, beta = 0) {
    const hue = Math.round(((4 + beta) % TAU) / TAU * 360);
    const rgb = hsl2rgb(hue, 80, Math.min(65 + Math.abs(rad2deg(theta) / 90) * 15, 80));
    return new Color(rgb);
}

function color_map(value, start = '#FFFFFF', end = '#000000') {
    const ratio = Math.max(0, Math.min(1, value));
    const r = Math.ceil(parseInt(end.substring(1, 3), 16) * ratio + parseInt(start.substring(1, 3), 16) * (1 - ratio));
    const g = Math.ceil(parseInt(end.substring(3, 5), 16) * ratio + parseInt(start.substring(3, 5), 16) * (1 - ratio));
    const b = Math.ceil(parseInt(end.substring(5, 7), 16) * ratio + parseInt(start.substring(5, 7), 16) * (1 - ratio));
    return rgb2hex(r, g, b);
}

function get_boundaries(points) {
    // Compute Boundaries
    let xMax = Number.MIN_VALUE, yMax = Number.MIN_VALUE,
        xMin = Number.MAX_VALUE, yMin = Number.MAX_VALUE;
    for (let i = 0; i < points.length; i++) {
        [x, y] = points[i];

        // Save Boundaries
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
    }
    const width = Math.abs(xMax - xMin);
    const height = Math.abs(yMax - yMin);
    return [xMin, xMax, yMin, yMax, width, height];
}

function download(filename, href) {
    const element = document.createElement("a");
    element.download = filename;
    element.href = href;
    element.click();
    element.remove();
}


class PolygonRing {
    constructor(polygon, num) {
        // Init variables
        this.polygon = polygon

        // Compute angles and colors
        this.angles = new Array(num);
        this.colors = new Array(num); // list of colors

        const slope = this.polygon.slope;
        const incr_rad = TAU / num;
        for (let i = 0; i < num; i++) {
            const a = i * incr_rad;
            this.angles[i] = a;
            this.colors[i] = angle2color(slope, a);
        }
    }
}


class ConvexPolygon {
    constructor(points) {
        // Consider that polygon is made by triangle,
        const num_points = points.length;
        if (num_points < 3) {
            console.error("Not enough points to make a polygon");
            return;
        }

        // Init variables
        this.points = points;
        this.compute()
        this.color = angle2color(this.slope);
    }

    get O() {
        return this.points[0];
    }

    get slope() {
        return 0;
    }

    get diameter() {
        return 2 * dist(this.O, [0, this.O[1], 0]);
    }

    compute() {
        this.num_points = this.points.length;
        this.perimeter = 0;
        this.area = 0;
        this.num_faces = 3 * (this.num_points - 2);
        this.angles = new Array(this.num_points);
        this.faces = new Array(this.num_faces);
        this.edge_distances = new Array(this.num_points);
        this.planar_points = new Array(this.num_points);

        // Make a reference to planar 3D points to 2D
        const [O, B, C] = [this.points[0], this.points[1], this.points[this.num_points - 1]]; // Take first point like origin
        const xRef = normalize(sub(C, O));
        const yRef = normalize(sub(sub(B, O), mul(xRef, dot(sub(B, O), xRef))));
        const ref_angle = Math.PI / 2 - angle(C, O, B) / 2;
        let xMin = Number.MAX_VALUE, xMax = Number.MIN_VALUE;
        let yMin = Number.MAX_VALUE, yMax = Number.MIN_VALUE;
        let x, y, z, ab, bd, ob, od;

        // Planar Polygon to Make 2D Representation, and compute parameters in one loop
        let iF = 0;
        _.forEach(this.points, (A, i) => {
            const C = this.points[(this.num_points + i - 1) % this.num_points];
            const B = this.points[(i + 1) % this.num_points];
            const D = this.points[(i + 2) % this.num_points];

            // Create the new 2D point
            [x, y, z] = rot2d(
                [
                    dot(sub(A, O), xRef),
                    dot(sub(A, O), yRef)
                ],
                ref_angle
            )
            this.planar_points[i] = [x, y, z];

            // Save Boundaries
            if (x < xMin) xMin = x;
            if (x > xMax) xMax = x;
            if (y < yMin) yMin = y;
            if (y > yMax) yMax = y;

            // Compute angle
            this.angles[i] = angle(C, A, B);

            // Compute edges distances, and perimeter
            ab = dist(A, B)
            this.edge_distances[i] = ab;
            this.perimeter += ab;

            // Compute triangles
            iF = i * 3;
            if (iF < this.num_faces) {
                // Faces for 3D from △ O, B, D
                this.faces[iF] = new THREE.Vector3(...O)
                this.faces[iF + 1] = new THREE.Vector3(...B)
                this.faces[iF + 2] = new THREE.Vector3(...D)

                // Heron formula to compute area of the triangle
                ob = dist(O, B);
                bd = dist(B, D);
                od = dist(O, D);
                const s = (ob + bd + od) / 2;
                this.area += Math.sqrt(s * (s - ob) * (s - bd) * (s - od));
            }
        });

        // Compute width and height from 2D boundaries
        this.width = Math.abs(xMax - xMin);
        this.height = Math.abs(yMax - yMin);
    }
}


class PolygonWithHat extends ConvexPolygon {
    get A() {
        return this.points[0];
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

    get φ() {
        // The vertical ↓ angle
        return angle(this.C, this.A, this.B);
    }

    get ω() {
        // The horizontal → angle
        return angle(this.A, this.B, this.points[2]);
    }

    get diameter() {
        return 2 * dist(this.B, [0, this.B[1], 0]);
    }

    get slope() {
        // Compute the slope of the hat
        const I = mid(this.points[1], this.points[this.num_points - 1]);
        let a = angle(this.O, I, [0, I[1], 0]);
        if (a > TAU_Q) {
            a = Math.PI - a
        }
        return a
    }
}


class Triangle extends PolygonWithHat {
}

class Kite extends PolygonWithHat {
    //  Consider Kite like this       A
    //  points = [A, B, D, C]       B ◇ C
    //                                D

    // A, B, C Form the top_triangle
    // B, D, C Form the Base
}

class Rhombus extends Kite {
}


class TruncatedKite extends Kite {
    //  Consider this Trapezium            A
    //  points = [A, B, E, F, C]         B ◇ C
    //                                    E F
}


class ZomeBase extends ConvexPolygon {
}

