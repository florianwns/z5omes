// -----------------------------
// ========== Lexical ==========
// -----------------------------

// * "fig" is a polygon/figure
// * "faces" are the division of a figure into triangles for 3D representation
// * "vertices", "point" or "vector" are just 3D point array [x, y, z]
// * "crown" is a circular distribution to avoid multiple creation of objects
// * "spiral" is a spiral of circular distribution, like a zome without the base
// * "base" is the last figure which close the zome
// * "vector" is a direction
// * "segment" is an array of two points

// ------------------------------------
// ========== Constants ==========
// ------------------------------------

const TAU = 2 * Math.PI;    // 360° in rad
const TAU_Q = Math.PI / 2;  // 90° in rad
const FLOAT_PRECISION = 7;
const FLOAT_2_STR_PRECISION = 2;

const ASSEMBLY_DIRECTIONS = ["Clockwise Rotation", "Counterclockwise Rotation", "Symmetry Axis"]


// --------------------------------
// ========== URL Params ==========
// --------------------------------

function decode_url_params(key) {
    const url = new URLSearchParams(window.location.search);
    const query_param = url.get(key)
    const decoded_params = (query_param) ? JSON.parse(atob(url.get("q"))) : {};
    return decoded_params;
}


function encode_params(params) {
    return btoa(JSON.stringify(params));
}

function small_hash(params) {
    const param_values = _.map(params, value => {
        switch (typeof value) {
            case 'number':
                return to_decimal(value);    // Trunc number
            case 'boolean':
                return +value;                          // Convert to int
            default:
                return value;
        }
    });

    let param_str = `${param_values}`.replaceAll('[', '')
        .replaceAll(']', '')
        .replaceAll(',', '')
        .replaceAll('', '')

    param_str = _.reduce(`${param_str}`, (res, c) => res += c.charCodeAt(0), 0)
    const hash = btoa(param_str).replaceAll('=', '');
    return hash;
}

function sync_params_from_url(params) {
    const decoded_params = decode_url_params("q")

    // Merge params with decoded params
    if (decoded_params) {
        _.forEach(params, (value, key) => {
            // Check if decoded_params has the property
            if (decoded_params.hasOwnProperty(key)) {
                params[key] = decoded_params[key] || value;
            }
        });
    }
    return params;
}

function sync_url_from_param(key, value) {
    if (!key) return;

    const decoded_params = decode_url_params("q")
    decoded_params[key] = value;

    sync_url_from_params(decoded_params)
}


function sync_url_from_params(params) {
    if (!params) return;

    let url = new URL(window.location.href);
    url.searchParams.set("q", encode_params(params));
    history.pushState(null, document.title, url.toString());
}

// -----------------------------------
// ========== 3D Operations ==========
// -----------------------------------

function add(p1, p2) {
    // Add two 3D points
    return [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];
}

function sub(p1, p2) {
    // Subtract two 3D points
    return [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]];
}

function mul(p1, k) {
    // Multiply a 3D point by k
    return [p1[0] * k, p1[1] * k, p1[2] * k];
}


function dot_product(vec1, vec2) {
    // The dot product or scalar product of two 3D vectors (or points
    // because a point can be represented as a position vector from the origin).
    return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
}


function cross_product(vec1, vec2) {
    // Also named 'vector product', the cross product is perpendicular to vec1 and vec2
    // https://en.wikipedia.org/wiki/Cross_product
    return [
        vec1[1] * vec2[2] - vec1[2] * vec2[1],
        vec1[2] * vec2[0] - vec1[0] * vec2[2],
        vec1[0] * vec2[1] - vec1[1] * vec2[0]
    ];
}

function project(vec1, vec2) {
    // Project vec2 on vec1
    const square2 = squared_norm(vec2, vec2);
    return mul(vec2, dot_product(vec1, vec2) / square2);
}

function squared_norm(vec) {
    // Compute the squared norm of the vector
    return dot_product(vec, vec);
}

function len(vec) {
    // Compute the length (magnitude) of vector
    return Math.sqrt(squared_norm(vec));
}

function dist(p1, p2) {
    // Compute the distance between two 3D points
    return len(sub(p2, p1));
}

function norm(vec) {
    // Normalizing a vector consists of transforming it so that its norm (or magnitude)
    // becomes equal to 1 while preserving its direction.
    return mul(vec, 1 / len(vec));
}

function midpoint(p1, p2) {
    // Find the midpoint of a segment/line
    return mul(add(p1, p2), 0.5);
}

function point_between(p1, p2, d) {
    // Find point at distance d between two points (from p1 to p2)
    // ex : find_point([50, 0, 0], [100, 0, 0], 20)  =>  [70, 0, 0]
    const vec = sub(p2, p1)
    return point_to(p1, vec, d);
}

function point_to(p1, vec, d) {
    // Find point at distance d from origin p1 to direction vec
    const normalized_vec = norm(vec);
    const point = add(p1, mul(normalized_vec, d))
    return point;
}

function angle_between_vectors(u, v) {
    const dot = dot_product(u, v);
    const u_length = len(u);
    const v_length = len(v);

    const theta = Math.acos(dot / (u_length * v_length));
    return theta;
}

function points_2_plane(p1, p2, p3) {
    // Create plan from 3 points
    const vec1 = sub(p2, p1)
    const vec2 = sub(p3, p1)

    const norm_vec = cross_product(vec1, vec2)
    const d = -dot_product(norm_vec, p1)
    return [norm_vec[0], norm_vec[1], norm_vec[2], d]
}

function triangle_area_from_points(A, B, C) {
    // Heron formula to compute area of the triangle
    const ab = dist(A, B);
    const bc = dist(B, C);
    const ca = dist(C, A);
    const s = (ab + bc + ca) / 2;
    const area = Math.sqrt(s * (s - ab) * (s - bc) * (s - ca));
    return area;
}


function plan_intersection(p1, vec1, plane1) {
    const [a, b, c, d] = plane1;

    // Calculation of the parameter t of the line at the intersection with the plane
    const t = -(a * p1[0] + b * p1[1] + c * p1[2] + d) /
        (a * vec1[0] + b * vec1[1] + c * vec1[2]);

    // Calculation of intersection point coordinates
    const intersection_point = add(p1, mul(vec1, t))
    return intersection_point;
}

function intersect(p, v, q, u) {
    // Find the intersection between two lines in 3D defined by
    // p = line1 point, v = line1 direction, q = line2 point, u = line2 direction
    const a = cross_product(v, u)
    const dot = dot_product(a, a)

    // if v and u are parallel (v x u = 0), then no intersection, return NaN point
    if (dot === 0) {
        return [NaN, NaN, NaN];
    }

    // b = (q-p) x u
    const b = cross_product(sub(q, p), u);

    // t = (b.a)/(a.a) = ((Q1-P1) x u) .(v x u) / (v x u) . (v x u)
    const t = dot_product(b, a) / dot;

    // find intersection point by substituting t to the line1 eq
    const point = add(p, mul(v, t))
    return point;
}

function angle(p1, p2, p3) {
    // Compute the angle of 3 points in radians
    const a = dist(p2, p3);
    const b = dist(p1, p2);
    const c = dist(p1, p3);
    return Math.acos((c * c - a * a - b * b) / (-2 * a * b)) || 0;
}

function rotate_2d(vec, theta, origin = [0, 0, 0]) {
    const sin_theta = Math.sin(theta);
    const cos_theta = Math.cos(theta);

    // Rotate an 2D vector [x, y, 0] around an origin
    let delta = sub(vec, origin);
    let x = delta[0] * cos_theta - delta[1] * sin_theta + origin[0];
    let y = delta[0] * sin_theta + delta[1] * cos_theta + origin[1];
    return [x, y, 0]
}

function dihedral_angle(a, b, c) {
    // Compute the dihedral angle from 3 angles
    // https://www.had2know.org/academics/dihedral-angle-calculator-polyhedron.html
    return Math.acos(
        (Math.cos(a) - (Math.cos(b) * Math.cos(c))) / (Math.sin(b) * Math.sin(c))
    )
}


// ---------------------------------
// ========== Conversions ==========
// ---------------------------------

function deg2rad(deg) {
    // Convert degrees to radians
    return deg * Math.PI / 180;
}

function rad2deg(rad) {
    // Convert radians to degrees
    return 180.0 * rad / Math.PI;
}

function to_decimal(x, num_digits = FLOAT_PRECISION) {
    return parseFloat(x.toFixed(num_digits));
}

function to_mm(v, unit) {
    // Helper to convert value to mm
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
    // Helper to convert value from mm to other unit
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

function hsl2rgb(h, s, l) {
    // Convert HSL color to RGB color (0 to 1 value not 255)
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [f(0), f(8), f(4)];
}

function rgb2hex(rgb) {
    // Convert RGB color to HSL color
    return `#${_.reduce(rgb, (res, v) => res + parseInt(255 * v).toString(16).toUpperCase().padStart(2, '0'), "")}`;
}


// -----------------------------
// ========== Helpers ==========
// -----------------------------

class LRU {
    constructor(max = 100) {
        this.max = max;
        this.cache = new Map();
    }

    get(key) {
        let item = this.cache.get(key);
        if (item !== undefined) {
            // refresh key
            this.cache.delete(key);
            this.cache.set(key, item);
        }
        return item;
    }

    set(key, val) {
        // refresh key
        if (this.cache.has(key)) this.cache.delete(key);
        // evict oldest
        else if (this.cache.size === this.max) this.cache.delete(this.first());
        this.cache.set(key, val);
    }

    first() {
        return this.cache.keys().next().value;
    }
}

function humanize_distance(d, num_digits = FLOAT_2_STR_PRECISION) {
    // Helper to display distances
    if (isNaN(d)) {
        return "";
    }
    // Distance are in milimeters
    if (d >= 1e7) {
        return to_decimal(d / 1e6, num_digits) + "km";
    } else if (d >= 1e4) {
        return to_decimal(d / 1e3, num_digits) + "m";
    } else if (d >= 1e2) {
        return to_decimal(d / 10, num_digits) + "cm";
    } else {
        return to_decimal(d, num_digits) + "mm";
    }
}

function humanize_area(d, num_digits = FLOAT_2_STR_PRECISION) {
    // Helper to display areas
    if (isNaN(d)) {
        return "";
    }

    // Area are in mm²
    if (d >= 1e12) {
        return to_decimal(d / 1e12, num_digits) + "km²";
    } else if (d >= 1e6) {
        return to_decimal(d / 1e6, num_digits) + "m²";
    } else if (d >= 100) {
        return to_decimal(d / 100, num_digits) + "cm²";
    } else {
        return to_decimal(d, num_digits) + "mm²";
    }
}

function humanize_angle(a, fractionDigits = 2) {
    // Helper to display angle in degrees
    return !isNaN(a) ? a.toFixed(fractionDigits) + "°" : "";
}

function humanize_arr(arr, unit = "") {
    // Helper to display array elements
    const res = _.join(_.map(arr, v => v + unit), " ");
    return `${res}`;
}

function unique_arr(arr) {
    // Set retains list order
    const s = new Set(arr);
    return [...s];
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


// -----------------------------
// ========== Classes ==========
// -----------------------------

class Color {
    constructor(hue, saturation, lightness) {
        // Class to create magic color
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        this.rgb = hsl2rgb(hue, saturation, lightness);
        this.hex = rgb2hex(this.rgb);
    }

    static from_angles(hue_angle = 0, ligthness_angle = 0) {
        // Magic colors, pass radian angles
        const hue = Math.round(((4 + hue_angle) % TAU) / TAU * 360);
        const lightness = Math.min(65 + Math.abs(rad2deg(ligthness_angle) / 90) * 15, 80);
        const saturation = 80;
        return new Color(hue, saturation, lightness);
    }

    static from_index(index = 0, arr_length = 1, saturation_angle = 0) {
        // Magic colors, with index and array length
        const hue_angle = (index % arr_length) * TAU / arr_length;
        return Color.from_angles(hue_angle, saturation_angle);
    }
}

class BaseGeometry {
    constructor(color = null) {
        // Parameters to compare geometry
        this.area = 0;
        this.angles = [];
        this.edge_distances = [];
        this.parameters = {};

        // Color
        this.color = color || new Color(0, 0, 0);

        // Hash : need to cal compute_hash from children
        this.hash = null;
    }

    compute_hash() {
        // Sort parameters to compare symmetric geometry
        this.parameters = {
            area:  to_decimal(this.area, FLOAT_2_STR_PRECISION),
            angles: _.sortBy(
                _.map(this.angles, (a) => to_decimal(a, FLOAT_2_STR_PRECISION))
            ),
            edge_distances: _.sortBy(
                _.map(this.edge_distances, (d) => to_decimal(d, FLOAT_2_STR_PRECISION))
            ),
        };

        // Sort parameters to compare geometries
        this.hash = encode_params(this.parameters);
    }
}

class TrapezoidalPrism extends BaseGeometry {
    constructor(points, color = null) {
        const num_points = points.length;
        if (num_points !== 8) {
            console.error("TrapezoidalPrism must have 8 point");
            return;
        }

        // Call parent constructor
        super(color);

        // Unpack points
        const [A, B, C, D, E, F, G, H] = points;

        // Build the 6 sides of TrapezoidalPrism with Polygon
        this.polygons = [
            new Convex3DPolygon([A, B, D, C]), // Top side
            new Convex3DPolygon([E, F, H, G]), // Bottom side
            new Convex3DPolygon([A, B, F, E]), // Left side
            new Convex3DPolygon([C, D, H, G]), // Right side
            new Convex3DPolygon([A, C, G, E]), // Front side
            new Convex3DPolygon([B, D, H, F]), // Back side
        ]

        // Arrays of THREE.Vector3 for 3D visualization
        this.faces = [];
        this.edge_points = []

        _.forEach(this.polygons, (fig) => {
            this.faces.push(...fig.faces);
            this.edge_points.push(...fig.edge_points);
            this.area += fig.area;
            this.angles.push(...fig.angles);
            this.edge_distances.push(...fig.edge_distances);
        });
        this.num_faces = this.faces.length

        // Compute hash to compare prims
        this.compute_hash();
    }
}

class Convex3DPolygon extends BaseGeometry {
    constructor(points, color = null) {
        // Consider that polygon is made by triangle,
        const num_points = points.length;
        if (num_points < 3) {
            console.error("Not enough points to make a polygon");
            return;
        }

        // Call parent constructor
        super(color);

        // Init variables
        this.points = points;
        this.num_points = this.points.length;

        // Measurements
        this.area = 0;
        this.angles = new Array(this.num_points);               // Array of angles in radians
        this.edge_distances = new Array(this.num_points);       // Edges distances

        // 3D
        this.num_faces = 3 * (this.num_points - 2);         // Compute number of faces of a polygon for 3D visualization

        // Arrays of THREE.Vector3 for 3D visualization
        this.faces = new Array(this.num_faces);
        this.edge_points = new Array(this.num_points * 2);

        this.compute()

        this.color = this.color || Color.from_angles(0, this.slope);

        // Compute hash to compare polygons
        this.compute_hash();
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
        // Planar Polygon to Make 2D Representation, and compute parameters in one loop
        let iF = 0, bd, ob, od;
        _.forEach(this.points, (A, i) => {
            const C = this.points[(this.num_points + i - 1) % this.num_points];
            const B = this.points[(i + 1) % this.num_points];
            const D = this.points[(i + 2) % this.num_points];

            // Compute angle in radians and edge distance
            this.angles[i] = angle(C, A, B);
            this.edge_distances[i] = dist(A, B);

            // Prepare ligne segments points
            this.edge_points[i * 2] = new THREE.Vector3(...A);
            this.edge_points[i * 2 + 1] = new THREE.Vector3(...B);

            // Compute triangles
            iF = i * 3;
            if (iF < this.num_faces) {
                // Faces for 3D from △ O, B, D
                this.faces[iF] = new THREE.Vector3(...this.O)
                this.faces[iF + 1] = new THREE.Vector3(...B)
                this.faces[iF + 2] = new THREE.Vector3(...D)

                // Compute area of the triangle
                this.area += triangle_area_from_points(this.O, B, D);
            }
        });
    }

    planar() {
        // Make a reference to planar 3D points to 2D, Take first point like origin
        const [O, B, C] = [this.O, this.points[1], this.points[this.num_points - 1]];
        const x_ref = norm(sub(C, O));
        const y_ref = norm(sub(sub(B, O), mul(x_ref, dot_product(sub(B, O), x_ref))));
        const ref_angle = Math.PI / 2 - angle(C, O, B) / 2;

        // Planar Polygon to Make 2D Representation, and compute parameters in one loop
        const planar_points = new Array(this.num_points);
        _.forEach(this.points, (A, i) => {
            // Apply the transformation for planar point
            planar_points[i] = rotate_2d(
                [dot_product(sub(A, O), x_ref), dot_product(sub(A, O), y_ref), 0],
                ref_angle
            );
        });
        return new Convex2DPolygon(
            planar_points,
            this.color,
            this.slope,
            this.diameter,
        );
    }
}


class Convex2DPolygon {
    constructor(points, color = null, slope = null, diameter = null) {
        // Consider that polygon is made by triangle,
        const num_points = points.length;
        if (num_points < 3) {
            console.error("Not enough points to make a polygon");
            return;
        }

        // Init variables
        this.points = points;
        this.color = color;
        this.slope = slope;
        this.diameter = diameter;

        this.num_points = this.points.length;
        this.angles = new Array(this.num_points);           // Array of angles in radians
        this.edge_distances = new Array(this.num_points);   // Edges distances
        this.perimeter = 0;                                 // Decl
        this.area = 0;
        this.num_faces = 3 * (this.num_points - 2);         // Compute number of faces to calculate area
        this.compute()
    }

    get O() {
        return this.points[0];
    }

    compute() {
        // Make a reference to planar 3D points to 2D, Take first point like origin
        let x_min = Number.MAX_VALUE, x_max = Number.MIN_VALUE;
        let y_min = Number.MAX_VALUE, y_max = Number.MIN_VALUE;
        let x, y, z, ab;

        // Compute parameters in one loop
        let iF = 0;
        _.forEach(this.points, (A, i) => {
            const C = this.points[(this.num_points + i - 1) % this.num_points];
            const B = this.points[(i + 1) % this.num_points];
            const D = this.points[(i + 2) % this.num_points];

            // Apply the transformation for planar point
            [x, y, z] = A

            // Save Boundaries
            if (x < x_min) x_min = x;
            if (x > x_max) x_max = x;
            if (y < y_min) y_min = y;
            if (y > y_max) y_max = y;

            // Compute angle in radians
            this.angles[i] = angle(C, A, B);

            // Compute edges distances, and perimeter
            ab = dist(A, B)
            this.edge_distances[i] = ab;
            this.perimeter += ab;

            // Compute triangles
            iF = i * 3;
            if (iF < this.num_faces) {
                // Compute area of the triangle
                this.area += triangle_area_from_points(this.O, B, D);
            }
        });

        // Compute width and height from 2D boundaries
        this.width = Math.abs(x_max - x_min);
        this.height = Math.abs(y_max - y_min);
    }
}

class PolygonWithHat extends Convex3DPolygon {
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
        const I = midpoint(this.points[1], this.points[this.num_points - 1]);
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


class ZomeBase extends Convex3DPolygon {
}


