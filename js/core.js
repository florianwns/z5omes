// -----------------------------
// ========== Lexical ==========
// -----------------------------

// * "fig" is a polygon/figure
// * "faces" are the division of a figure into triangles for 3D representation
// * "vertices", "point" or "vector" are just 3D point array [x, y, z]
// * "vector" is a direction
// * "segment" is an array of two points

// ------------------------------------
// ========== Constants ==========
// ------------------------------------

const TAU = 2 * Math.PI;    // 360° in rad
const TAU_Q = Math.PI / 2;  // 90° in rad
const FLOAT_PRECISION = 7;
const FLOAT_2_STR_PRECISION = 1;

const ASSEMBLY_DIRECTIONS = ["Clockwise Rotation", "Counterclockwise Rotation", "Symmetry Axis"]

check_is_mobile = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

const IS_MOBILE = check_is_mobile();


// --------------------------------
// ========== URL Params ==========
// --------------------------------

function decode_url_params(key) {
    const url = new URLSearchParams(window.location.search);
    const query_param = url.get(key)
    const decoded_params = (query_param) ? JSON.parse(atob(query_param)) : {};
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

function sync_params_from_url(params, key = "q") {
    const decoded_params = decode_url_params(key)

    // Merge params with decoded params
    if (decoded_params) {
        _.forEach(params, (value, key) => {
            // Check if decoded_params has the property
            if (decoded_params.hasOwnProperty(key)) {
                const new_value = decoded_params[key];
                params[key] = (new_value === undefined || new_value === null) ? value : new_value;
            }
        });
    }
    return params;
}

function __sync_url_from_params(params, key = "q") {
    if (!params) return;

    let url = new URL(window.location.href);
    url.searchParams.set(key, encode_params(params));
    history.replaceState(null, document.title, url.toString());
}

const sync_url_from_params = _.debounce(__sync_url_from_params, 1000);


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

function swap_axes(points, axes_order = "XYZ") {
    return points.map(p => {
        const reordered_point = [p[0], p[1], p[2]];
        const axis_indexes = ["X", "Y", "Z"].map(c => axes_order.indexOf(c));
        for (let i = 0; i < 3; i++) {
            const axis_index = axis_indexes[i];
            if (axis_index === -1) {
                console.error("Please use only one X, Y, Z for the axes_order");
                return;
            }
            reordered_point[axis_index] = p[i];
        }
        ;
        return reordered_point;
    });
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

function angle_between_vectors(vec1, vec2) {
    const theta = Math.acos(dot_product(vec1, vec2) / (len(vec1) * len(vec2)));
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

function plane_on_axis(axis = "X", value = 0) {
    const axis_index = _.findIndex(["X", "Y", "Z"], item => item == axis.toUpperCase());
    const points = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ];

    _.forEach(points, pt => {
        pt[axis_index] = value;
    });

    return points_2_plane(...points);
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

function rotate_point_around_z_axis(vec, theta, origin = [0, 0, 0]) {
    const sin_theta = Math.sin(theta);
    const cos_theta = Math.cos(theta);

    // Rotate an 2D vector around z axis with an origin
    let delta = sub(vec, origin);
    return [
        delta[0] * cos_theta - delta[1] * sin_theta + origin[0],
        delta[0] * sin_theta + delta[1] * cos_theta + origin[1],
        vec[2],
    ];
}

function dihedral_angle(a, b, c) {
    // Compute the dihedral angle from 3 angles
    // https://www.had2know.org/academics/dihedral-angle-calculator-polyhedron.html
    return Math.acos(
        (Math.cos(a) - (Math.cos(b) * Math.cos(c))) / (Math.sin(b) * Math.sin(c))
    )
}

function angle_between_planes(plane1, plane2) {
    const dot = dot_product(plane1, plane2);
    const theta = Math.acos(dot / (len(plane1) * len(plane2)));
    return theta;
}

function rotation_matrix_from_points(a, b, c) {
    const axis1 = new THREE.Vector3(...sub(a, b)).normalize()
    const axis2 = new THREE.Vector3(...sub(c, b)).normalize()
    const axis3 = new THREE.Vector3().crossVectors(axis1, axis2).normalize();
    return new THREE.Matrix4().makeBasis(axis1, axis2, axis3);
}

function quaternion_from_points(pt1, pt2, pt3, end_pt1, end_pt2, end_pt3) {
    // Compute quaternion : source from https://jsfiddle.net/v6bkg4wf/2/
    const matrix1 = rotation_matrix_from_points(pt1, pt2, pt3).invert();
    const matrix2 = rotation_matrix_from_points(end_pt1, end_pt2, end_pt3);

    const quaternion = new THREE.Quaternion();
    quaternion.setFromRotationMatrix(matrix2.multiply(matrix1));

    return quaternion;
}

function flatten_3D_points(points, pt1, pt2, pt3, horizontally = true) {
    // Flattens the 3D points with the pt2 at zero to 2D points
    // and the pt1 is aligned on x axis if horizontally is true, y axis otherwise
    // Use quaternion method to flat points

    // Compute the angle/distances with the pt2 point
    const theta = angle(pt1, pt2, pt3);
    const dist_2_pt1 = dist(pt2, pt1);
    const dist_2_pt3 = dist(pt2, pt3);

    // Define end points depends on horizontally variable
    const end_pt1 = (horizontally)
        ? [dist_2_pt1, 0, 0]
        : [0, dist_2_pt1, 0];
    const end_pt2 = [0, 0, 0];
    const end_pt3 = (horizontally)
        ? rotate_point_around_z_axis([dist_2_pt3, 0, 0], -theta)
        : rotate_point_around_z_axis([0, dist_2_pt3, 0], theta);

    // Compute quaternion
    const quaternion = quaternion_from_points(
        pt1, pt2, pt3,
        end_pt1, end_pt2, end_pt3
    );

    // Apply quaternion and sub translation vec to planar the face
    const flattened_points = new Array(points.length);
    const translation = new THREE.Vector3(...points[0]).applyQuaternion(quaternion);
    _.forEach(points, (point, i) => {
        flattened_points[i] = new THREE.Vector3(...point)
            .applyQuaternion(quaternion).sub(translation)
            .toArray();
    });

    return [flattened_points, quaternion, translation];
}

function check_is_coplanar(points) {
    // Function to check the coplanarity of a polygon
    // Calculation of the normal vector of the first triangle formed by the first three points
    const vec1 = sub(points[1], points[0]);
    const vec2 = sub(points[2], points[0]);
    const norm_vec = cross_product(vec1, vec2);
    const num_points = points.length;

    if (num_points > 3) {
        // Checking coplanarity by checking that the scalar product of the normal vectors
        // of each face of the polygon is close to zero (due to numerical approximations)
        for (let i = 3; i < num_points; i++) {
            const vec_to_check = sub(points[i], points[0])
            if (Math.abs(dot_product(norm_vec, vec_to_check)) > 0.001) {
                return false;
            }
        }
    }
    return true;
}


// -------------------------
// ========== SVG ==========
// -------------------------

function circle_path(cx, cy, r) {
    return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,1 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,1 -' + (r * 2) + ',0';
}


// --------------------------
// ====== CANVAS/WEBGL ======
// --------------------------


function color_rgb_buffer(num, r, g, b) {
    const num_rgb = 3 * num;
    const colors = new Float32Array(num_rgb);
    for (let i = 0; i < num_rgb; i += 3) {
        colors[i] = r;
        colors[i + 1] = g;
        colors[i + 2] = b;
    }
    return new THREE.Float32BufferAttribute(colors, 3);
}

function clone_and_color_mesh(other_mesh, color) {
    if (other_mesh instanceof THREE.Group || other_mesh instanceof THREE.Mesh) {
        const mesh = other_mesh.clone();
        return color_mesh(mesh, color);
    }
}

function color_mesh(mesh, color) {
    if (mesh instanceof THREE.Group) {
        _.forEach(mesh.children, child => {
            child.material.color.set(color.hex);
        });
    } else if (mesh instanceof THREE.Mesh) {
        mesh.material.color.set(color.hex);
    }
    return mesh;
}


function name_mesh(mesh, label) {
    if (mesh instanceof THREE.Mesh) {
        mesh.name = label;
    }

    if (mesh instanceof THREE.Group) {
        _.forEach(mesh.children, child => {
            child.name = label;
        });
    }
    return mesh;
}


function create_label_mesh(
    text,
    font_size = 26,
    padding = 4,
    text_color = 'white',
    background_color = null,
) {
    const canvas = document.createElement("canvas");
    const has_background = background_color !== null;
    let ctx = canvas.getContext("2d", {antialias: true, alpha: !has_background});

    // Trick to adapt the canvas size to the text
    ctx.font = font_size + "px Roboto, sans-serif";
    const text_width = ctx.measureText(text).width;
    canvas.width = text_width + 2 * padding;
    canvas.height = font_size + 2 * padding;
    ctx = canvas.getContext("2d");
    ctx.font = font_size + "px Arial";

    // Set the background color
    if (has_background) {
        ctx.fillStyle = background_color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = text_color;

    // Add an offset to the vertical position to center the text
    // (i don't know why, maybe a little shift due of the font style)
    const text_x_position = canvas.width * 0.5,
        text_y_position = canvas.height * 0.55;
    ctx.fillText(text, text_x_position, text_y_position);
    ctx.strokeText(text, text_x_position, text_y_position);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture,
        transparent: true
    });
    const geometry = new THREE.PlaneGeometry(canvas.width, canvas.height);
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

// ---------------------------------
// ========== Conversions ==========
// ---------------------------------

function convert_3D_to_2D(points) {
    // Points without the z axis
    return points.map(p => [p[0], p[1]]);
}


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

function to_int(x) {
    return to_decimal(x, 0);
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
    // Convert HSL color to RGB color (0 to 100 value not 255)
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

function average(points) {
    // compute average positions of 3D points
    const num_points = points.length;
    let [x_sum, y_sum, z_sum] = [0, 0, 0];
    _.forEach(points, (point) => {
        x_sum += point[0];
        y_sum += point[1];
        z_sum += point[2];
    });
    return [x_sum / num_points, y_sum / num_points, z_sum / num_points];
}

function get_centroid(points) {
    // Approximate centroid by average of point positions
    return average(points);
}

function compute_hash_from_geometry(area, angles, edge_distances) {
    // Sort parameters to compare symmetric geometry
    const hash_parameters = {
        area: to_decimal(area, FLOAT_2_STR_PRECISION),
        angles: _.sortBy(
            _.map(angles, (a) => to_decimal(a, FLOAT_2_STR_PRECISION))
        ),
        edge_distances: _.sortBy(
            _.map(edge_distances, (d) => to_decimal(d, FLOAT_2_STR_PRECISION))
        ),
    };

    // Sort parameters to compare geometries
    const hash = encode_params(hash_parameters);
    return hash;
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

function humanize_angle(a, num_digits = FLOAT_2_STR_PRECISION) {
    // Helper to display angle in degrees
    return !isNaN(a) ? a.toFixed(num_digits) + "°" : "";
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
    let x_max = Number.MIN_VALUE,
        y_max = Number.MIN_VALUE,
        z_max = Number.MIN_VALUE,
        x_min = Number.MAX_VALUE,
        y_min = Number.MAX_VALUE,
        z_min = Number.MAX_VALUE;

    for (let i = 0; i < points.length; i++) {
        const [x, y, z] = points[i];

        // Save Boundaries
        if (x < x_min) x_min = x;
        if (x > x_max) x_max = x;
        if (y < y_min) y_min = y;
        if (y > y_max) y_max = y;
        if (z < z_min) z_min = z;
        if (z > z_max) z_max = z;
    }

    // Compute width and height from 2D boundaries
    const width = Math.abs(x_max - x_min);      // X Axis
    const height = Math.abs(y_max - y_min);     // Y Axis
    const depth = Math.abs(z_max - z_min);      // Z AXis
    return [x_min, x_max, y_min, y_max, z_min, z_max, width, height, depth];
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

    static from_angles(hue_angle = 0, lightness_angle = 0) {
        // Magic colors, pass radian angles
        const hue = Math.round(((4 + hue_angle) % TAU) / TAU * 360);
        const lightness = Math.min(80, Math.max(60, 60 + Math.abs(lightness_angle / TAU_Q) * 20));
        const saturation = 80;
        return new Color(hue, saturation, lightness);
    }

    static from_index(index, arr_length) {
        // Magic colors, with index and array length
        const hue_angle = (index % arr_length) * TAU / arr_length;
        return Color.from_angles(hue_angle, TAU_Q / 2);
    }
}

const COLOR_BASE = Color.from_angles(0, 0);

class LabeledObject {
    constructor(label, color) {
        // With color and label it's more fun
        this.label = label || "";
        this.color = color || COLOR_BASE;
    }
}

class Base3DGeometry extends LabeledObject {
    constructor(points, label, color) {
        // Call parent constructor
        super(label, color);

        const num_points = points.length;
        if (num_points < 3) {
            console.error("Not enough points to make a simple geometry");
            return;
        }

        // Store points
        this.num_points = points.length;
        this.points = points;

        // Points without the z axis for 2D drawing
        this.points_2D = convert_3D_to_2D(this.points);

        // Take first point as Origin
        this.origin = this.points[0];
        this.centroid = get_centroid(points);

        // Compute boundaries
        const [x_min, x_max, y_min, y_max, z_min, z_max, width, height, depth] = get_boundaries(this.points);
        this.x_min = x_min;
        this.x_max = x_max
        this.y_min = y_min;
        this.y_max = y_max;
        this.z_min = z_min;
        this.z_max = z_max;
        this.width = width;     // X Axis
        this.height = height;   // Y Axis
        this.depth = depth;     // Z Axis

        // Compute the slope based on normal vector and vertical axis
        const norm_vec = cross_product(sub(this.points[1], this.points[0]), sub(this.points[2], this.points[0]));
        const slope = angle_between_vectors(norm_vec, [0, 1, 0])
        this.slope = (slope > TAU_Q) ? Math.PI - slope : slope;

        // Declare flattened points parameters
        this.flattened_points = null;
        this.quaternion = null;
        this.translation = null;

        this.mesh = null;
        this.edges = null;
    }

    set_color(color) {
        this.color = color;
        this.mesh = color_mesh(this.mesh, color);
    }

    set_label(label) {
        this.label = label;
        this.mesh = name_mesh(this.mesh, label);
    }

    fit_points() {
        // Adjust the points so the minimum values end up at zero
        return this.points.map(p => [p[0] - this.x_min, p[1] - this.y_min, p[2] - this.z_min]);
    }

    filter_points_by_side(side, points) {
        // Filter side points
        return points || this.points;
    }

    get_face(side = "top") {
        // return a Polygon 3D of a specific side
        return this;
    }

    resize_points_2D(size = null) {
        // Recompute pixel positions to a specific size (ex : for svg display)
        const pixel_ratio = size / Math.max(this.height, this.width);
        const center = size / 2;
        return this.points_2D.map(p => [
            (p[0] - this.x_min - this.width / 2) * pixel_ratio + center,
            (p[1] - this.y_min - this.height / 2) * pixel_ratio + center,
        ]);
    }
}


class Polygon3D extends Base3DGeometry {
    // Consider A convex polygon          A
    // points = [A, B, C, D, E]         B ◇ E
    //                                   C D
    //
    // points are distributed counterclockwise

    constructor(points, label, color) {
        // Call parent constructor
        super(points, label, color);

        // Check coplanarity
        this.is_coplanar = this.num_points == 3 || check_is_coplanar(this.points);
        if (!this.is_coplanar) {
            console.error(`The polygon is not coplanar`);
        }

        // Because we consider this polygon coplanar, we make a plane with 3 points
        this.plane = points_2_plane(this.points[0], this.points[1], this.points[this.num_points - 1]);

        // TODO : remove from the class and compute distance outside
        this.diameter = 2 * dist(this.points[1], [0, this.points[1][1], 0]);

        // Geometry parameters
        this.area = 0;
        this.perimeter = 0;
        this.angles = [];               // Array of angles in radians
        this.edge_distances = [];       // Edges distances

        // Compute angle, edge distances, perimeter and area, centroid, and faces
        _.forEach(this.points, (cur_point, i) => {
            const prev_point = this.points[(this.num_points + i - 1) % this.num_points];
            const next_point = this.points[(i + 1) % this.num_points];
            const next_next_point = this.points[(i + 2) % this.num_points];

            // Compute angle in radians
            this.angles.push(angle(prev_point, cur_point, next_point));

            // Compute edges distances, and perimeter
            const d = dist(cur_point, next_point)
            this.edge_distances.push(d);
            this.perimeter += d;

            // Compute area of the triangle
            this.area += triangle_area_from_points(this.origin, next_point, next_next_point);
        });

        // Flattens the points with the origin at zero and the start_pt1 on the y axis, only 2D points
        [this.flattened_points, this.quaternion, this.translation] = flatten_3D_points(this.points, this.centroid, this.origin, this.points[1], false);

        // Compute hash to compare polygons
        this.hash = compute_hash_from_geometry(this.area, this.angles, this.edge_distances);
    }

    compute_mesh(){
        // Compute number of points to draw faces (composed by triangles) of a polygon for 3D visualization
        const num_triangles = this.num_points - 2;
        const num_triangle_points = 3 * num_triangles;

        // Arrays of THREE.Vector3 for 3D visualization
        const triangle_points = new Array(num_triangle_points);
        const edge_points = new Array(this.num_points * 2);

        let face_index = 0;
        _.forEach(this.points, (cur_point, i) => {
            const next_point = this.points[(i + 1) % this.num_points];
            const next_next_point = this.points[(i + 2) % this.num_points];

            // Compute line segments points
            edge_points[i * 2] = new THREE.Vector3(...cur_point);
            edge_points[i * 2 + 1] = new THREE.Vector3(...next_point);

            // Compute face triangles
            if (face_index < num_triangle_points) {
                // Faces points for 3D display
                triangle_points[face_index] = new THREE.Vector3(...this.origin)
                triangle_points[face_index + 1] = new THREE.Vector3(...next_point)
                triangle_points[face_index + 2] = new THREE.Vector3(...next_next_point)
                face_index += 3;
            }
        });

        // Compute geometry for THREE JS display
        const geometry = new THREE.BufferGeometry().setFromPoints(triangle_points)
        // this.geometry.computeVertexNormals()

        // Ensure the bounding box is computed for its geometry
        // This should be done only once (assuming static geometries)
        // this.geometry.computeBoundingBox();

        const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: this.color.hex});
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = this.label;

        this.edges = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(edge_points),
            new THREE.LineBasicMaterial({color: 0x333333}),
        );

        // Compute the bounding box
        // this.bounding_box = new THREE.Box3();
        // this.bounding_box.copy(this.geometry.boundingBox);
    }

    flatten_side(side = "top") {
        return new Polygon3D(this.flattened_points, this.label, this.color);
    }

    divide(horizontally = true) {
        // Divide polygon into two parts horizontally or vertically
        if (this.num_points < 3 || this.num_points > 5) {
            console.error("Divide function is only implemented for polygons with 3,4 or 5 points");
        }

        let parts = []
        switch (this.num_points) {
            case 3:
                parts.push(new Polygon3D(this.points), this.label, this.color);
            case 4:
                if (horizontally) {
                    parts.push(
                        new Polygon3D([this.points[0], this.points[1], this.points[3]], this.label, this.color)
                    );
                    parts.push(
                        new Polygon3D([this.points[1], this.points[2], this.points[3]], this.label, this.color)
                    );
                } else {
                    parts.push(
                        new Polygon3D([this.points[0], this.points[1], this.points[2]], this.label, this.color)
                    );
                    parts.push(
                        new Polygon3D([this.points[2], this.points[3], this.points[0]], this.label, this.color)
                    );
                }
                break;
            case 5:
                if (horizontally) {
                    parts.push(
                        new Polygon3D([this.points[0], this.points[1], this.points[4]], this.label, this.color)
                    );
                    parts.push(
                        new Polygon3D([this.points[1], this.points[2], this.points[3], this.points[4]], this.label, this.color)
                    );
                } else {
                    const mid_pt = midpoint(this.points[2], this.points[3]);
                    parts.push(
                        new Polygon3D([this.points[0], this.points[1], this.points[2], mid_pt], this.label, this.color)
                    );
                    parts.push(
                        new Polygon3D([mid_pt, this.points[3], this.points[4], this.points[0]], this.label, this.color)
                    );
                }
                break;
        }
        return parts;
    }
}

class TrapezoidalPrism extends Base3DGeometry {
    constructor(points, label, color) {
        const num_points = points.length;
        if (num_points !== 8) {
            console.error("TrapezoidalPrism must have 8 point");
            return;
        }

        // Call parent constructor
        super(points, label, color);

        // Flattens point with the bottom side at zero
        const [A, B, C, D, E, F, G, H] = this.points;
        [this.flattened_points, this.quaternion, this.translation] = flatten_3D_points(this.points, D, B, A, true);

        // Geometry parameters
        this.area = 0;
        this.angles = [];
        this.edge_distances = [];

        this.polygons = [
            this.get_face("top"),
            this.get_face("bottom"),
            this.get_face("left"),
            this.get_face("right"),
            this.get_face("front"),
            this.get_face("back"),
        ];
        _.forEach(this.polygons, item => {
            this.angles.push(...item.angles);
            this.edge_distances.push(...item.edge_distances);
            this.area += item.area; // recompute area
        });

        // Compute hash to compare prims
        this.hash = compute_hash_from_geometry(this.area, this.angles, this.edge_distances);
    }

    compute_mesh(){
        // Group of geometries
        this.mesh = new THREE.Group();
        this.mesh.name = this.label;
        this.edges = new THREE.Group();

        _.forEach(this.polygons, item => {
            item.compute_mesh();
            this.mesh.add(item.mesh);
            this.edges.add(item.edges);
        });
    }


    get_face(side = "top") {
        // return a Polygon 3D of a specific side
        return new Polygon3D(this.filter_points_by_side(side), this.label, this.color);
    }

    filter_points_by_side(side, points) {
        // Filter the 6 sides points of TrapezoidalPrism for Polygon construction
        const [A, B, C, D, E, F, G, H] = points || this.points;
        switch (side) {
            case "front":
                return [B, A, C, D];     // Front side
            case "back":
                return [F, E, G, H];     // Back side
            case "top":
                return [B, F, H, D];     // Top side
            case "bottom":
                return [A, E, G, C];     // Bottom side
            case "right":
                return [D, C, G, H];     // Right side
            case "left":
                return [B, A, E, F];     // Left side
        }
    }

    get_opposite_side(side) {
        // Filter the 6 sides points of TrapezoidalPrism for Polygon construction
        switch (side) {
            case "front":
                return "back";
            case "back":
                return "front";
            case "top":
                return "bottom";
            case "bottom":
                return "top";
            case "right":
                return "left";
            case "left":
                return "right";
        }
    }

    flatten() {
        return new TrapezoidalPrism(this.flattened_points, this.label, this.color);
    }

    flatten_side(side = "top", add_opposite_side = false, rotation_angle = null) {
        // flatten side (or pair of sides if add_opposite_side is true)
        // with three choices "front", "bottom" and "left";
        // Because svg display is different than three.js display, we reverse some axes.
        let flattened_points;
        switch (side) {
            case "front":
            case "back":
                flattened_points = this.flattened_points.map(p => [p[0], -p[1], p[2]])
                break;
            case "bottom":
            case "top":
                flattened_points = swap_axes(this.flattened_points, "XZY").map(p => [p[0], -p[1], p[2]]);
                break;
            case "left":
            case "right":
                flattened_points = swap_axes(this.flattened_points, "ZYX").map(p => [p[0], -p[1], p[2]]);
                break;
        }

        if (rotation_angle !== null) {
            flattened_points = flattened_points.map(p => {
                return rotate_point_around_z_axis(p, rotation_angle);
            });
        }

        const filtered_points = add_opposite_side
            ? [
                ...this.filter_points_by_side(side, flattened_points),
                ...this.filter_points_by_side(this.get_opposite_side(side), flattened_points)
            ]
            : this.filter_points_by_side(side, flattened_points);

        return new Polygon3D(filtered_points, this.label, this.color);
    }
}


class ItemHashCollection {
    constructor(item, hash, count = 1) {
        this.item = item;
        this.hash = hash;
        this.count = count;
    }
}

class Zome {
    constructor(
        {
            num = null,
            assembly_method = null,
            rotation_angles = null,
            rotated_colors = null,
            vertices = null,

            skeleton_3D = null,
            skeleton_3D_hash_collections = null,

            outer_faces_3D = null,
            outer_faces_3D_hash_collections = null,

            inner_faces_3D = null,
            inner_faces_3D_hash_collections = null,

            timber_profiles_3D = null,
            mandala_3D = null,
            mandala_3D_of_outer_faces = null,
            mandala_3D_of_inner_faces = null,

            vanishing_lines = null
        }
    ) {
        this.num = num || 0;
        this.assembly_method = assembly_method || 0;

        this.rotation_angles = rotation_angles || [];
        this.rotated_colors = rotated_colors || [];
        this.vertices = vertices || [];

        this.skeleton_3D = skeleton_3D || [];
        this.skeleton_3D_hash_collections = skeleton_3D_hash_collections || [];

        this.outer_faces_3D = outer_faces_3D || [];
        this.outer_faces_3D_hash_collections = outer_faces_3D_hash_collections || [];

        this.inner_faces_3D = inner_faces_3D || [];
        this.inner_faces_3D_hash_collections = inner_faces_3D_hash_collections || [];

        this.timber_profiles_3D = timber_profiles_3D || [];
        this.mandala_3D = mandala_3D || [];
        this.mandala_3D_of_outer_faces = mandala_3D_of_outer_faces || [];
        this.mandala_3D_of_inner_faces = mandala_3D_of_inner_faces || [];

        this.vanishing_lines = vanishing_lines || [];
    }
}

