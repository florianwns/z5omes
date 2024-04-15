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
const DEBUG = false;

const TAU = 2 * Math.PI;    // 360° in rad
const TAU_Q = Math.PI / 2;  // 90° in rad
const FLOAT_PRECISION = 7;
const FLOAT_2_STR_PRECISION = 2;

// const WORLD_HEIGHT = 3810;       // or 3D HEIGHT OF ZOME in mm
const WORLD_HEIGHT = 1980;       // or 3D HEIGHT OF ZOME in mm

const ASSEMBLY_DIRECTIONS = ["Clockwise Rotation", "Counterclockwise Rotation", "Symmetry Axis"]

const THREE_EDGES_MATERIAL = new THREE.LineBasicMaterial({color: 0x333333})
const THREE_VANISHING_LINES_MATERIAL = new THREE.LineBasicMaterial({color: 0x00ffff});
const THREE_LABELS_MATERIAL = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.FrontSide,
    transparent: true
});
const THREE_VERTEX_COLOR_MATERIAL = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColors: true});

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const FOOTING_CHAR = '~';
const FLOOR_CHAR = '⬢';
const XYZ = ["X", "Y", "Z"];

const ASSEMBLY_DIRECTION_ICONS = ["fa-rotate-right", "fa-rotate-left", "fa-slash-back"]
const FRAMEWORK_CUSTOMIZER_SVG_IDS = [
    "#svg_vertical_bar_at_top",
    "#svg_diagonal_bar_at_top_left",
    "#svg_horizontal_bar_at_left",
    "#svg_diagonal_bar_at_bottom_left",
    "#svg_vertical_bar_at_bottom",
    "#svg_diagonal_bar_at_bottom_right",
    "#svg_horizontal_bar_at_right",
    "#svg_diagonal_bar_at_top_right",

    "#svg_horizontal_bar_at_top",
    "#svg_vertical_bar_at_left",
    "#svg_horizontal_bar_at_bottom",
    "#svg_vertical_bar_at_right",
];
const SVG_VERTICAL_BAR_BITWISE_FLAG = 1 + 16;
const SVG_HORIZONTAL_BAR_BITWISE_FLAG = SVG_VERTICAL_BAR_BITWISE_FLAG << 2;

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
    return (query_param) ? JSON.parse(atob(query_param)) : {};
}


function encode_params(params) {
    return btoa(JSON.stringify(params));
}

function small_hash(params) {
    const param_values = _.map(params, value => {
        switch (typeof value) {
            case 'number':
                return to_decimal_str(value);           // Trunc number
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
    return btoa(param_str).replaceAll('=', '');
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

function are_points_equal(p1, p2) {
    const [x1, y1, z1] = round_values(p1);
    const [x2, y2, z2] = round_values(p2);
    return x1 === x2 && y1 === y2 && z1 === z2;
}

function round_values(pt, num_digits = FLOAT_PRECISION) {
    const rounded_pt = new Array(pt.length);
    for (let i = 0; i < pt.length; i++) {
        rounded_pt[i] = to_decimal(pt[i], num_digits);
    }
    return rounded_pt;
}

function swap_axes(points, axes_order = "XYZ") {
    const axis_indexes = new Array(3);
    for (let i = 0; i < 3; i++) {
        const axis_char = axes_order[i];
        const axis_index = axis_char == "X"
            ? 0
            : axis_char == "Y"
                ? 1
                : axis_char == "Z"
                    ? 2
                    : -1;

        if (axis_index === -1) {
            console.error("Please use only one X, Y, Z for the axes_order");
            return;
        }
        axis_indexes[i] = axis_index;
    }

    // Reorder points
    const [i0, i1, i2] = axis_indexes;
    const reordered_points = new Array(points.length);
    for (let i = 0; i < points.length; i++) {
        reordered_points[i] = [points[i][i0], points[i][i1], points[i][i2]];
    }
    return reordered_points;
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

function dist_on_xz_axes(p1) {
    return dist(p1, [0, p1[1], 0]);
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
    return add(p1, mul(normalized_vec, d));
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
    const axis_index = _.findIndex(XYZ, item => item === axis.toUpperCase());
    const points = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ];
    for (let i = 0; i < points.length; i++) {
        points[i][axis_index] = value;
    }

    return points_2_plane(...points);
}

function triangle_area_from_distances(ab, bc, ca) {
    // Heron formula to compute area of the triangle
    const s = (ab + bc + ca) / 2;
    return Math.sqrt(s * (s - ab) * (s - bc) * (s - ca));
}

function plan_intersection(p1, vec1, plane1) {
    const [a, b, c, d] = plane1;

    // Calculation of the parameter t of the line at the intersection with the plane
    const t = -(a * p1[0] + b * p1[1] + c * p1[2] + d) /
        (a * vec1[0] + b * vec1[1] + c * vec1[2]);

    // Calculation of intersection point coordinates
    return add(p1, mul(vec1, t));
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
    return add(p, mul(v, t));
}

function acos(k) {
    // Add limit to acos to avoid NaN errors
    // See : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/acos
    if (k >= 1) return 0;
    if (k <= -1) return Math.PI;
    return Math.acos(k);
}

function angle_between_vectors(vec1, vec2) {
    return acos(dot_product(vec1, vec2) / (len(vec1) * len(vec2)));
}

function angle_between_planes(plane1, plane2) {
    return angle_between_vectors(plane1, plane2);
}

function angle_between_points(p1, p2, p3) {
    // Calculate vectors between points
    const vec1 = sub(p2, p1);
    const vec2 = sub(p2, p3);

    // Calculate angle in radians
    return angle_between_vectors(vec1, vec2);
}

function dihedral_angle(a, b, c) {
    // Compute the dihedral angle from 3 angles
    // https://www.had2know.org/academics/dihedral-angle-calculator-polyhedron.html
    return acos(
        (Math.cos(a) - (Math.cos(b) * Math.cos(c))) / (Math.sin(b) * Math.sin(c))
    )
}


function rotate_point_around_z_axis(vec, angle, origin = [0, 0, 0]) {
    const sin_theta = (angle instanceof Angle) ? angle.sin : Math.sin(angle);
    const cos_theta = (angle instanceof Angle) ? angle.cos : Math.cos(angle);

    // Rotate an 2D vector around z axis with an origin
    let delta = sub(vec, origin);
    return [
        delta[0] * cos_theta - delta[1] * sin_theta + origin[0],
        delta[0] * sin_theta + delta[1] * cos_theta + origin[1],
        vec[2],
    ];
}

function rotate_points_around_z_axis(points, angle) {
    const sin_theta = (angle instanceof Angle) ? angle.sin : Math.sin(angle);
    const cos_theta = (angle instanceof Angle) ? angle.cos : Math.cos(angle);

    // Rotate 2D points around z axis
    const rotated_points = new Array(points.length);
    for (let i = 0; i < points.length; i++) {
        const [x, y, z] = points[i];
        rotated_points[i] = [
            x * cos_theta - y * sin_theta,
            x * sin_theta + y * cos_theta,
            z,
        ];
    }
    return rotated_points;
}

function rotate_points_around_y_axis(points, angle) {
    const sin_theta = (angle instanceof Angle) ? angle.sin : Math.sin(angle);
    const cos_theta = (angle instanceof Angle) ? angle.cos : Math.cos(angle);

    // Rotate 2D points around y axis
    const rotated_points = new Array(points.length);
    for (let i = 0; i < points.length; i++) {
        const [x, y, z] = points[i];
        rotated_points[i] = [
            x * cos_theta + z * sin_theta,
            y,
            -x * sin_theta + z * cos_theta,
        ];
    }
    return rotated_points;
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
    const theta = angle_between_points(pt1, pt2, pt3);
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
    for (let i = 0; i < points.length; i++) {
        flattened_points[i] = new THREE.Vector3(...points[i])
            .applyQuaternion(quaternion).sub(translation)
            .toArray();
    }

    return flattened_points;
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


// ---------------------------------
// ========== Conversions ==========
// ---------------------------------

function numbers_2_str(numbers) {
    // Convert an array of numbers to a string where the values are separated by commas
    return (numbers instanceof Array) ? numbers.toString() : "";
}

function str_to_numbers(value) {
    // Convert a string where the values are separated by commas to an array of numbers
    if (!value) return [];

    const values = value.split(",");
    for (let i = 0; i < values.length; i++) {
        values[i] = parseFloat(values[i]);
    }
    return values;
}

function bitwise_flags_to_boolean_matrix(bitwise_flags) {
    // const bitwise_flags = [13, 5, 0];
    // bitwise_flags_to_boolean_matrix(bitwise_flags) => [[true, false, true, true], [true, false, true, false], []]
    let boolean_mat = new Array(bitwise_flags.length);
    for (let i = 0; i < bitwise_flags.length; i++) {
        boolean_mat[i] = bitwise_flag_to_boolean_array(bitwise_flags[i]);
    }
    return boolean_mat;
}

function bitwise_flag_to_boolean_array(bitwise_flag) {
    // const bitwise_flag = 13;
    // bitwise_flag_to_boolean_array(bitwise_flag) => [true, false, true, true]
    const boolean_arr = [];
    for (let j = 0; bitwise_flag > 0; j++) {
        const pow_2 = Math.pow(2, j);
        const is_checked = (bitwise_flag & pow_2) == pow_2;
        boolean_arr.push(is_checked);
        if (is_checked) {
            bitwise_flag -= pow_2;
        }
    }
    return boolean_arr;
}

function boolean_matrix_to_bitwise_flags(boolean_mat) {
    // const mat = [[true, false, true, true], [true, false, true, false], []];
    // boolean_matrix_to_bitwise_flags(mat) => [13, 5, 0]
    let bitwise_flags = new Array(boolean_mat.length);
    for (let i = 0; i < boolean_mat.length; i++) {
        const values = boolean_mat[i];
        bitwise_flags[i] = 0;
        for (let j = 0; j < values.length; j++) {
            const is_checked = values[j];
            if (is_checked) {
                bitwise_flags[i] |= Math.pow(2, j);
            }
        }
    }
    return bitwise_flags;
}


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

function to_decimal(val, num_digits = FLOAT_PRECISION) {
    return parseFloat(val.toFixed(num_digits));
}

function to_decimal_str(val, num_digits = FLOAT_PRECISION) {
    return val.toFixed(num_digits);
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
    return `#${_.reduce(rgb || [1, 1, 1], (res, v) => res + Math.round(255 * v).toString(16).toUpperCase().padStart(2, '0'), "")}`;
}

function average(points) {
    // compute average positions of 3D points
    const num_points = points.length;
    let [x_sum, y_sum, z_sum] = [0, 0, 0];
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        x_sum += point[0];
        y_sum += point[1];
        z_sum += point[2];
    }
    return [x_sum / num_points, y_sum / num_points, z_sum / num_points];
}

function get_centroid(points) {
    // Approximate centroid by average of point positions
    return average(points);
}

function compute_hash_from_geometry(area, angles, edge_distances) {
    // Sort parameters to compare symmetric geometry
    const hash_parameters = {
        area: to_decimal_str(area, FLOAT_2_STR_PRECISION),
        angles: _.sortBy(
            _.map(angles, (a) => to_decimal_str(a, FLOAT_2_STR_PRECISION))
        ),
        edge_distances: _.sortBy(
            _.map(edge_distances, (d) => to_decimal_str(d, FLOAT_2_STR_PRECISION))
        ),
    };

    // Sort parameters to compare geometries
    return encode_params(hash_parameters);
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
    // Distance are in millimeters
    if (d >= 1e7) {
        return to_decimal_str(d / 1e6, num_digits) + "km";
    } else if (d >= 1e4) {
        return to_decimal_str(d / 1e3, num_digits) + "m";
    } else if (d >= 1e2) {
        return to_decimal_str(d / 10, num_digits) + "cm";
    } else {
        return to_decimal_str(d, num_digits) + "mm";
    }
}

function humanize_area(d, num_digits = FLOAT_2_STR_PRECISION) {
    // Helper to display areas
    if (isNaN(d)) {
        return "";
    }

    // Area are in mm²
    if (d >= 1e12) {
        return to_decimal_str(d / 1e12, num_digits) + "km²";
    } else if (d >= 1e6) {
        return to_decimal_str(d / 1e6, num_digits) + "m²";
    } else if (d >= 100) {
        return to_decimal_str(d / 100, num_digits) + "cm²";
    } else {
        return to_decimal_str(d, num_digits) + "mm²";
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


function save_as(blob, filename) {
    download(filename, window.URL.createObjectURL(blob));
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

class Base3DGeometry {
    constructor(points, label, color, crown_index) {
        // Check point number
        const num_points = points.length;
        if (num_points < 3) {
            console.error("Not enough points to make a simple geometry");
            return;
        }

        // With color, label flag it's more fun
        this._label = label || "";
        this._color = color || COLOR_BASE;

        // Add crown and spiral index to retrieve the object
        this.crown_index = crown_index || 0;

        // Store points
        this.points = points;
        this.reset_geometry_params();
    }

    get points() {
        return this._points;
    }

    set points(value) {
        this._points = value;
        this.num_points = value.length;

        // Compute previous and next indexes to optimize performances
        this.prev_indexes = new Array(this.num_points);
        this.next_indexes = new Array(this.num_points);
        for (let i = 0; i < this.num_points; i++) {
            this.prev_indexes[i] = (this.num_points + i - 1) % this.num_points;
            this.next_indexes[i] = (i + 1) % this.num_points;
        }

        // Declare private variables use by getters for dynamic computing
        this._flattened_points = null;
        this._children = null;
        this.reset_other_points();
        this.reset_boundaries();
        this._mesh_material = null;
        this.reset_3D_objects();
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value || "";
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value || COLOR_BASE;
        this._mesh_material = null; // reset the mesh material
    }

    get points_2D() {
        if (this._points_2D === null) {
            // Points without the z axis for 2D drawing
            this._points_2D = convert_3D_to_2D(this.points);
        }
        return this._points_2D;
    }

    get centroid() {
        if (this._centroid === null) {
            // Compute centroid
            this._centroid = [0, 0, 0];
            for (let i = 0; i < this.num_points; i++) {
                const [x, y, z] = this.points[i];
                this._centroid[0] += x;
                this._centroid[1] += y;
                this._centroid[2] += z;
            }
            this._centroid = mul(this._centroid, 1 / this.num_points);
        }
        return this._centroid;
    }

    get mid_points() {
        if (this._mid_points === null) {
            // Compute mid points
            this._mid_points = new Array(this.num_points);
            for (let i = 0; i < this.num_points; i++) {
                this._mid_points[i] = midpoint(
                    this.points[i],
                    this.points[this.next_indexes[i]]
                );
            }
        }
        return this._mid_points;
    }

    get area() {
        if (this._area === null) this.compute_geometry_parameters();
        return this._area;
    }

    get perimeter() {
        if (this._perimeter === null) this.compute_geometry_parameters();
        return this._perimeter;
    }

    get angles() {
        if (this._angles === null) this.compute_geometry_parameters();
        return this._angles;
    }

    get edge_distances() {
        if (this._edge_distances === null) this.compute_geometry_parameters();
        return this._edge_distances;
    }

    get centroid_distances() {
        if (this._centroid_distances === null) this.compute_geometry_parameters();
        return this._centroid_distances;
    }

    get hash() {
        if (this._hash === null) {
            // Compute hash to compare polygons
            this._hash = compute_hash_from_geometry(this.area, this.angles, this.edge_distances);
        }
        return this._hash;
    }

    get slope() {
        if (this._slope === null) {
            // Compute the slope based on normal vector and vertical axis
            const norm_vec = cross_product(sub(this.points[1], this.points[0]), sub(this.points[2], this.points[0]));
            const slope = angle_between_vectors(norm_vec, [0, 1, 0])
            this._slope = (slope > TAU_Q) ? Math.PI - slope : slope;
        }
        return this._slope;
    }

    get mesh() {
        if (this._mesh === null) this.compute_meshes();
        return this._mesh;
    }

    get edges() {
        if (this._edges === null) this.compute_meshes();
        return this._edges;
    }

    get bounding_box() {
        if (this._bounding_box === null) {
            this.compute_bounding_box();
        }
        return this._bounding_box;
    }

    get x_min() {
        if (this._x_min === null) this.compute_boundaries();
        return this._x_min;
    }

    get x_max() {
        if (this._x_max === null) this.compute_boundaries();
        return this._x_max;
    }

    get y_min() {
        if (this._y_min === null) this.compute_boundaries();
        return this._y_min;
    }

    get y_max() {
        if (this._y_max === null) this.compute_boundaries();
        return this._y_max;
    }

    get z_min() {
        if (this._z_min === null) this.compute_boundaries();
        return this._z_min;
    }

    get z_max() {
        if (this._z_max === null) this.compute_boundaries();
        return this._z_max;
    }

    get width() {
        // X Axis
        if (this._width === null) this.compute_boundaries();
        return this._width;
    }

    get height() {
        // Y Axis
        if (this._height === null) this.compute_boundaries();
        return this._height;
    }

    get depth() {
        // Z Axis
        if (this._depth === null) this.compute_boundaries();
        return this._depth;
    }

    get flattened_points() {
        return this._flattened_points;
    }

    get label_mesh() {
        return this._label_mesh;
    }

    get mesh_material() {
        if (this._mesh_material === null) {
            this._mesh_material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: this.color.hex});
        }
        return this._mesh_material;
    }

    get mesh_points() {
        if (this._mesh_points === null) this.compute_mesh_points();
        return this._mesh_points;
    }

    get mesh_colors() {
        if (this._mesh_colors === null) this.compute_mesh_colors();
        return this._mesh_colors;
    }

    get edge_points() {
        if (this._edge_points === null) this.compute_mesh_points();
        return this._edge_points;
    }

    get fitted_points() {
        // Adjust the points so the minimum values end up at zero
        if (this._fitted_points === null) {
            this._fitted_points = new Array(this.num_points);
            for (let i = 0; i < this.num_points; i++) {
                const point = this.points[i];
                this._fitted_points[i] = [
                    point[0] - this.x_min,
                    point[1] - this.y_min,
                    point[2] - this.z_min
                ];
            }
        }
        return this._fitted_points
    }

    compute_label_mesh(font) {
        if (this._label_mesh !== null || font === null) {
            return;
        }

        // Get top face
        const side = "front";
        const flattened_face = this.flatten_face(side);

        if (flattened_face.label) {
            const mid_points_item = new Polygon3D(flattened_face.mid_points);
            const font_size = Math.min(mid_points_item.width, mid_points_item.height) * 0.7;
            const shapes = font.generateShapes(flattened_face.label, font_size);

            const geometry = new THREE.ShapeGeometry(shapes);
            geometry.computeBoundingBox();
            const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            const yMid = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);

            geometry.translate(xMid, yMid, 2);
            this._label_mesh = new THREE.Mesh(geometry, THREE_LABELS_MATERIAL);
            this._label_mesh.name = flattened_face.label;

            const face = this.get_face(side);

            // Trick to have good orientation
            this._label_mesh.rotateZ(Math.PI);
            this._label_mesh.rotateY(Math.PI);

            const translation = sub(face.centroid, flattened_face.centroid);
            const [x, y, z] = add(flattened_face.centroid, translation);

            this._label_mesh.position.x = x;
            this._label_mesh.position.y = y;
            this._label_mesh.position.z = z;
            const quaternion = quaternion_from_points(
                ...flattened_face.points.slice(0, 3),
                ...face.points.slice(0, 3)
            )
            this._label_mesh.applyQuaternion(quaternion);
        }
    }

    reset_3D_objects() {
        this._mesh_points = null;
        this._mesh_colors = null;
        this._mesh = null;
        this._edge_points = null;
        this._edges = null;
        this._label_mesh = null;
        this._bounding_box = null;
    }

    compute_mesh_points() {
        const centroid_vec = new THREE.Vector3(...this.centroid);
        // Compute triangle and edges points of a polygon for 3D visualization
        this._mesh_points = new Array(3 * this.num_points);
        this._edge_points = new Array(2 * this.num_points);
        for (let i = 0, j = 0, k = 0; i < this.num_points; i++, j += 2, k += 3) {
            this._mesh_points[k] = this._edge_points[j] = new THREE.Vector3(
                ...this.points[i]
            );
            this._mesh_points[k + 1] = this._edge_points[j + 1] = new THREE.Vector3(
                ...this.points[this.next_indexes[i]]
            );
            this._mesh_points[k + 2] = centroid_vec;
        }
    }

    compute_mesh_colors() {
        // Compute colors of a polygon for 3D visualization
        this._mesh_colors = new Array(9 * this.num_points);
        const [r, g, b] = this.color.rgb;
        for (let i = 0, k = 0; i < this.num_points; i++, k += 9) {
            this._mesh_colors[k] = this._mesh_colors[k + 3] = this._mesh_colors[k + 6] = r;
            this._mesh_colors[k + 1] = this._mesh_colors[k + 4] = this._mesh_colors[k + 7] = g;
            this._mesh_colors[k + 2] = this._mesh_colors[k + 5] = this._mesh_colors[k + 8] = b;
        }
    }

    reset_other_points() {
        this._points_2D = null;
        this._fitted_points = null;
        this._mid_points = null;
        this._centroid = null;
    }

    reset_geometry_params() {
        // Geometry Params to compute hash
        this._area = null;
        this._perimeter = null;
        this._angles = null;
        this._edge_distances = null;
        this._centroid_distances = null;
        this._slope = null;
        this._hash = null;
    }

    reset_boundaries() {
        this._x_min = null;
        this._x_max = null;
        this._y_min = null;
        this._y_max = null;
        this._z_min = null;
        this._z_max = null;
        this._width = null;
        this._height = null;
        this._depth = null;
    }

    clone() {
        const cloned_obj = _.clone(this);
        return cloned_obj;
    }

    compute_boundaries() {
        // Compute boundaries
        this._x_max = Number.MIN_VALUE;
        this._y_max = Number.MIN_VALUE;
        this._z_max = Number.MIN_VALUE;
        this._x_min = Number.MAX_VALUE;
        this._y_min = Number.MAX_VALUE;
        this._z_min = Number.MAX_VALUE;

        for (let i = 0; i < this.num_points; i++) {
            const cur_point = this.points[i];
            const [x, y, z] = cur_point;

            // Save Boundaries
            if (x < this._x_min) this._x_min = x;
            if (x > this._x_max) this._x_max = x;
            if (y < this._y_min) this._y_min = y;
            if (y > this._y_max) this._y_max = y;
            if (z < this._z_min) this._z_min = z;
            if (z > this._z_max) this._z_max = z;
        }

        // Compute width and height from 2D boundaries
        this._width = Math.abs(this._x_max - this._x_min);      // X Axis
        this._height = Math.abs(this._y_max - this._y_min);     // Y Axis
        this._depth = Math.abs(this._z_max - this._z_min);      // Z AXis
    }

    compute_meshes() {
    }

    compute_geometry_parameters() {
    }

    compute_bounding_box() {
        if (this.mesh instanceof THREE.Mesh) {
            // Ensure the bounding box is computed for its geometry
            // This should be done only once (assuming static geometries)
            this.mesh.geometry.computeBoundingBox();

            // Compute the bounding box
            this._bounding_box = new THREE.Box3();
            this._bounding_box.copy(this._mesh.geometry.boundingBox);
        }
    }

    flatten_face(side = "top") {
        return Polygon3D.copy(this, this.flattened_points);
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

    constructor(points, label, color, crown_index) {
        // Call parent constructor
        super(points, label, color, crown_index);

        // Check coplanarity
        if (DEBUG) {
            this.is_coplanar = this.num_points === 3 || check_is_coplanar(this.points);
            if (!this.is_coplanar) {
                console.warn(`The polygon ${this.label || ''} is not coplanar`, this.points);
            }
        }

        this._plane = null;
        this._radius = null;
        this._diameter = null;
        this._framework_timbers = null;
        this._framework_outer_points = null;
        this._framework_inner_points = null;
    }

    get plane() {
        if (this._plane === null) {
            // Because we consider this polygon coplanar, we make a plane with 3 points
            this._plane = points_2_plane(this.points[0], this.points[1], this.points[this.num_points - 1]);
        }
        return this._plane;
    }

    get framework_timbers() {
        return this._framework_timbers;
    }

    get framework_outer_points() {
        return this._framework_outer_points;
    }

    get framework_inner_points() {
        return this._framework_inner_points;
    }

    get diameter() {
        if (this._diameter === null) {
            this._diameter = 2 * this.radius;
        }
        return this._diameter;
    }

    get radius() {
        if (this._radius === null) {
            this._radius = dist_on_xz_axes(this.points[1]);
        }
        return this._radius;
    }

    get flattened_points() {
        if (this._flattened_points === null) {
            // Flattens the points with the origin at zero and the start_pt1 on the y axis, only 2D points
            this._flattened_points = flatten_3D_points(this.points, this.centroid, this.points[0], this.points[1], false);
        }
        return this._flattened_points;
    }

    static copy(obj, points) {
        return new Polygon3D(
            points || obj.points, obj.label, obj.color, obj.crown_index
        );
    }

    compute_framework(
        strengthening_of_timbers_bitwise_flag,  // A bitwise flag which let us to divide polygon

        // Assembly parameters
        assembly_method = 0,            // 0 : GoodKarma
        // 1 : Beveled
        // 2 : Xpansion

        assembly_direction = 0,         // 0 : Clockwise Rotation,
        // 1 : Counterclockwise Rotation,
        // 2 : Symmetry Axis

        // xpansion parameters
        vanishing_pt = [0, 0, 0],      // The vanishing point is used for GoodKamra or Beveled method
        xpansion_direction = 1,         // Outward or Inward

        // Timbers size in millimeters
        timber_thickness = 40,
        timber_width = 60,
    ) {
        // Compute framework timbers

        // Init timbers
        this._framework_timbers = [];
        this._framework_outer_points = new Array(this.num_points);
        this._framework_inner_points = new Array(this.num_points);

        // Divide polygons into many parts
        let framework_faces = [...this.split(strengthening_of_timbers_bitwise_flag)];

        const outward_xpansion = assembly_method === 2 || xpansion_direction === -1;

        // Declare common variables
        let A, B, C, D, E, F, G, H, theta,
            hypotenuse, adjacent_side, pivot_pt,
            thickness_offset_pt, width_offset_pt, vertical_proj_vec, horizontal_proj_vec;

        // Loop over the framework faces to build timbers
        let timber_label_index = 0;
        for (let iFace = 0; iFace < framework_faces.length; iFace++) {
            const face = framework_faces[iFace];
            const num_points = face.num_points;

            // Declare multiple arrays
            const ccw_vecs = new Array(num_points),
                cw_vecs = new Array(num_points),
                thickness_offset_pts = new Array(num_points),
                width_offset_pts = new Array(num_points),
                horizontal_proj_vecs = new Array(num_points),
                wall_planes = new Array(num_points),
                shifted_wall_planes = new Array(num_points);

            // Calculate vectors and projected points to avoid multiple calculations
            for (let i = 0; i < face.num_points; i++) {
                const cur_pt = face.points[i];
                const next_index = face.next_indexes[i];
                const prev_index = face.prev_indexes[i];

                const prev_pt = face.points[prev_index];
                const sec_pt = face.points[next_index];

                const cur_2_sec_vec = sub(sec_pt, cur_pt);
                const cur_2_prev_vec = sub(prev_pt, cur_pt);

                const mid_pt = face.mid_points[i];
                const mid_2_vanishing_vec = sub(vanishing_pt, mid_pt)

                switch (assembly_method) {
                    case 0: // GoodKarma
                        horizontal_proj_vec = cross_product(cur_2_sec_vec, mid_2_vanishing_vec);
                        thickness_offset_pt = point_to(mid_pt, horizontal_proj_vec, timber_thickness);
                        vertical_proj_vec = cross_product(horizontal_proj_vec, cur_2_sec_vec);
                        width_offset_pt = point_to(thickness_offset_pt, vertical_proj_vec, timber_width);

                        // Multiply vertical proj by xpansion direction
                        vertical_proj_vec = mul(vertical_proj_vec, xpansion_direction);
                        break;
                    case 1: // Beveled
                    case 2: // Xpansion
                        theta = face.angles[i];
                        hypotenuse = timber_thickness / Math.sin(theta);
                        adjacent_side = timber_thickness / Math.tan(theta);
                        pivot_pt = point_to(mid_pt, cur_2_sec_vec, -adjacent_side);

                        thickness_offset_pt = point_to(pivot_pt, cur_2_prev_vec, hypotenuse);
                        horizontal_proj_vec = sub(thickness_offset_pt, mid_pt);

                        if (to_decimal(theta) === to_decimal(TAU_Q)) {
                            // Add Hack to avoid issues with bad cross_products on 90° angles
                            vertical_proj_vec = cross_product(cur_2_sec_vec, cur_2_prev_vec);
                        } else if (theta > TAU_Q) {
                            // Change direction if theta is greater than 90°,
                            // Because pivot point is after mid_pt, so the direction is opposite
                            vertical_proj_vec = cross_product(horizontal_proj_vec, cur_2_prev_vec);
                        } else {
                            // The normal way if theta is smaller than 90 °
                            vertical_proj_vec = cross_product(horizontal_proj_vec, mul(cur_2_prev_vec, -1));
                        }

                        if (assembly_method === 1) {
                            vertical_proj_vec = mul(vertical_proj_vec, -xpansion_direction);

                            wall_planes[i] = points_2_plane(cur_pt, mid_pt, vanishing_pt);
                            width_offset_pt = point_to(thickness_offset_pt, vertical_proj_vec, timber_width);

                            const opposite_mid_pt = plan_intersection(width_offset_pt, horizontal_proj_vec, wall_planes[i])
                            const opposite_thickness = dist(opposite_mid_pt, width_offset_pt);

                            // If opposite width is superior than TIMBER_THICKNESS
                            if (opposite_thickness > timber_thickness) {
                                // Reduce Timber thickness to have maximum of TIMBER_THICKNESS
                                const thickness_delta = opposite_thickness - timber_thickness;
                                thickness_offset_pt = point_to(mid_pt, horizontal_proj_vec, timber_thickness - thickness_delta)
                            }
                        }
                }

                width_offset_pt = point_to(thickness_offset_pt, vertical_proj_vec, timber_width);

                // Push vectors
                ccw_vecs[i] = cur_2_sec_vec;
                cw_vecs[i] = cur_2_prev_vec;
                horizontal_proj_vecs[i] = horizontal_proj_vec;

                // Push points
                thickness_offset_pts[i] = thickness_offset_pt;
                width_offset_pts[i] = width_offset_pt;

                // Push Planes
                switch (assembly_method) {
                    case 0: // GoodKarma
                    case 1: // Beveled
                        // Use vanishing pt for wall
                        wall_planes[i] = points_2_plane(cur_pt, mid_pt, vanishing_pt);
                        break;
                    case 2: // Xpansion
                        // Use vertical proj rather vanishing pt
                        wall_planes[i] = points_2_plane(
                            cur_pt,
                            mid_pt,
                            point_to(mid_pt, vertical_proj_vec, 100)
                        );
                        break;
                }

                // Shifted wall plane
                shifted_wall_planes[i] = points_2_plane(
                    point_to(thickness_offset_pt, cur_2_sec_vec, 100),
                    thickness_offset_pt,
                    width_offset_pt,
                );
            }

            // Build the prism and outer/inner faces
            for (let i = 0; i < face.num_points; i++) {
                const next_index = face.next_indexes[i];
                const prev_index = face.prev_indexes[i];

                thickness_offset_pt = thickness_offset_pts[i];
                width_offset_pt = width_offset_pts[i];

                // Get vectors
                const cur_pt = face.points[i];
                const mid_pt = face.mid_points[i];
                const cur_2_sec_vec = ccw_vecs[i];
                const sec_2_cur_vec = cw_vecs[next_index];

                // Compute Planes to make point intersections
                let planes = new Array(4);
                switch (assembly_direction) {
                    // Clockwise Rotation
                    case 0:
                        planes[0] = planes[1] = shifted_wall_planes[prev_index];
                        planes[2] = planes[3] = wall_planes[next_index];
                        break;
                    // Counterclockwise Rotation
                    case 1:
                        planes[0] = planes[1] = wall_planes[prev_index];
                        planes[2] = planes[3] = shifted_wall_planes[next_index];
                        break;
                    // Symmetry Axis
                    case 2:
                        planes[0] = wall_planes[prev_index];
                        planes[1] = shifted_wall_planes[prev_index];
                        planes[2] = wall_planes[next_index];
                        planes[3] = shifted_wall_planes[next_index];
                        break;
                }

                // Compute planes to find intersection points
                horizontal_proj_vec = horizontal_proj_vecs[i];
                const along_plane = wall_planes[i]
                const mid_pt_with_vertical_proj = plan_intersection(
                    width_offset_pt, horizontal_proj_vec, along_plane
                )

                // A, B, C, D is the top part (trapezoid) of the timber
                A = plan_intersection(mid_pt, sec_2_cur_vec, planes[0]);
                B = plan_intersection(thickness_offset_pt, sec_2_cur_vec, planes[1]);
                C = plan_intersection(mid_pt, cur_2_sec_vec, planes[2])
                D = plan_intersection(thickness_offset_pt, cur_2_sec_vec, planes[3])

                // E, F, G, H is the bottom part (trapezoid) of the timber
                E = plan_intersection(mid_pt_with_vertical_proj, sec_2_cur_vec, planes[0]);
                F = plan_intersection(width_offset_pt, sec_2_cur_vec, planes[1]);
                G = plan_intersection(mid_pt_with_vertical_proj, cur_2_sec_vec, planes[2]);
                H = plan_intersection(width_offset_pt, cur_2_sec_vec, planes[3]);

                // Reverse top and bottom sides depends on the xpansion direction
                if (outward_xpansion) {
                    [A, B, C, D, E, F, G, H] = [E, F, G, H, A, B, C, D];
                }

                // Build a TrapezoidalPrism with a label prefixed from the crown face label
                timber_label_index += 1;
                const timber_label = `${face.label}${timber_label_index}`;
                const timber_prism = new TrapezoidalPrism(
                    [A, B, C, D, E, F, G, H],
                    timber_label,
                    face.color,
                    face.crown_index,
                );

                this._framework_timbers.push(timber_prism);

                // Compute outer and inner face points of the framework
                if (_.some(this._framework_outer_points, p => p === undefined)) {
                    const pt_index = _.findIndex(this.points, p => _.isEqual(p, cur_pt));
                    if (pt_index > -1) {
                        this._framework_outer_points[pt_index] = plan_intersection(A, sec_2_cur_vec, wall_planes[prev_index]);
                        this._framework_inner_points[pt_index] = plan_intersection(E, sec_2_cur_vec, wall_planes[prev_index]);
                    }
                }
            }
        }
    }

    compute_geometry_parameters() {
        this._area = 0;
        this._perimeter = 0;
        this._angles = new Array(this.num_points);               // In radians
        this._edge_distances = new Array(this.num_points);
        this._centroid_distances = new Array(this.num_points);

        // Compute angle, edge distances, perimeter and area, centroid, and faces
        for (let i = 0; i < this.num_points; i++) {
            const cur_point = this.points[i];
            const prev_point = this.points[this.prev_indexes[i]];
            const next_point = this.points[this.next_indexes[i]];

            // Compute angle in radians
            this._angles[i] = angle_between_points(prev_point, cur_point, next_point);

            // Compute edges distances and perimeter
            const d = dist(cur_point, next_point);
            this._edge_distances[i] = d;
            this._perimeter += d;

            this._centroid_distances[i] = dist(cur_point, this.centroid);
            if (!this._centroid_distances[this.next_indexes[i]]) {
                this._centroid_distances[this.next_indexes[i]] = dist(next_point, this.centroid);
            }

            // Compute area of the triangle
            this._area += triangle_area_from_distances(
                this._edge_distances[i],
                this._centroid_distances[this.next_indexes[i]],
                this._centroid_distances[i],
            );
        }
    }

    compute_meshes() {
        // Compute geometry for THREE JS display
        const mesh_geometry = new THREE.BufferGeometry().setFromPoints(this.mesh_points);
        this._mesh = new THREE.Mesh(mesh_geometry, this.mesh_material);

        // Add a mesh name (use for 3D export)
        this._mesh.name = this.label;

        const edge_geometry = new THREE.BufferGeometry().setFromPoints(this.edge_points);
        this._edges = new THREE.LineSegments(edge_geometry, THREE_EDGES_MATERIAL);
    }

    split(strengthening_of_timbers_bitwise_flag = 0) {
        // Split polygon in multiple polygons
        // depends on the bitwise flag (based on FRAMEWORK_CUSTOMIZER_SVG_IDS)

        // if 0 return this
        if ([3, 5].includes(this.num_points) || strengthening_of_timbers_bitwise_flag === 0){
            return [this];
        }

        const strengthening_of_timbers = bitwise_flag_to_boolean_array(strengthening_of_timbers_bitwise_flag);

        // 0 1 2 3 4 5 6 7      bars
        // 8   9   10  11       mini bars    8 + (i / 2)
        let parts = [];

        // Find the first selected bar
        let first_selected_bar_index = 0;
        for (let bar_index = 0; bar_index < 8; bar_index++) {
            const bar_is_selected = strengthening_of_timbers[bar_index];
            if (bar_is_selected) {
                first_selected_bar_index = bar_index;
                break;
            }
        }

        // Merge points and midpoints in one array
        const num_points = 2 * this.num_points;
        let points_to_add = new Array(num_points);
        for (let i = 0, j = 0; i < this.num_points; i++, j += 2) {
            points_to_add[j] = this.points[i];
            points_to_add[j + 1] = this.mid_points[i];
        }

        console.log("points_to_add", ...points_to_add)
        let building_points = [];
        let last_bar_index = first_selected_bar_index

        // Loop through the bars starting from the first selected bar
        const last_index = first_selected_bar_index + 8;
        for (let i = first_selected_bar_index; i < last_index; i++) {
            const bar_index = i % 8;

            // not on midpoints
            const bar_index_is_on_points = bar_index % 2 === 0;
            const bar_is_selected = strengthening_of_timbers[bar_index];

            const pt_index = bar_index;
            const prev_pt_index = (pt_index + 7) % 8;
            const next_pt_index = (pt_index + 1) % 8;

            console.log("indexes", i, pt_index, prev_pt_index, next_pt_index);

            // Add small triangles on horizontal and vertical bars if transversal bar is selected
            if (bar_index_is_on_points) {
                // On points get current transversal bar,
                const transversal_bar_index = 8 + Math.floor(pt_index / 2) % 4;
                const transversal_bar_is_selected = strengthening_of_timbers[transversal_bar_index];
                if (transversal_bar_is_selected) {
                    const mid_point_to_centroid = midpoint(points_to_add[pt_index], this.centroid);

                    // Create one polygon or two if bar is selected
                    if (bar_is_selected) {
                        parts.push(
                            Polygon3D.copy(this, [
                                points_to_add[pt_index],
                                mid_point_to_centroid,
                                points_to_add[prev_pt_index]
                            ])
                        );
                        parts.push(
                            Polygon3D.copy(this, [
                                points_to_add[pt_index],
                                points_to_add[next_pt_index],
                                mid_point_to_centroid
                            ])
                        );

                        // Shift the point to add at mid_point_to_centroid
                        points_to_add[pt_index] = mid_point_to_centroid;
                    } else {
                        parts.push(
                            Polygon3D.copy(this, [
                                points_to_add[pt_index],
                                points_to_add[next_pt_index],
                                points_to_add[prev_pt_index],
                            ])
                        );
                    }
                }
            }


        }

        // Pass
        for (let i = first_selected_bar_index; i <= last_index; i++) {
            const bar_index = i % 8;

            // not on midpoints
            const bar_is_selected = strengthening_of_timbers[bar_index];

            const pt_index = bar_index;
            const prev_pt_index = (pt_index + 7) % 8;
            const next_pt_index = (pt_index + 1) % 8;

            if (bar_is_selected) {
                // Close the last polygon in the process of building
                if (building_points.length > 0) {
                    building_points.push(points_to_add[pt_index]);

                    // Add the centroid only it last bar is not directly at 180 degrees
                    if ((last_bar_index + 4) % 8 !== bar_index) {
                        building_points.push(this.centroid);
                    }

                    console.log("bar close", bar_index, ...building_points);
                    console.log("######################");

                    parts.push(
                        Polygon3D.copy(this, building_points)
                    );
                }

                // Initialize building points with a new point
                building_points = [
                    points_to_add[pt_index]
                ];

                // Reset the array and the last
                last_bar_index = bar_index;

                console.log("selected bar => add point", i, last_bar_index, ...building_points)
            } else {
                const theta = angle_between_points(
                    points_to_add[prev_pt_index],
                    points_to_add[pt_index],
                    points_to_add[next_pt_index],
                );

                console.log("theta", rad2deg(theta));
                if (theta > 0 && theta < Math.PI) {
                    building_points.push(points_to_add[pt_index]);
                    console.log("add point", i, last_bar_index, rad2deg(theta), ...building_points)
                }
            }
        }
        return parts
    }

    divide(horizontally = true) {
        // Divide polygon into two parts horizontally or vertically
        if (this.num_points < 3 || this.num_points > 5) {
            console.error("Divide function is only implemented for polygons with 3,4 or 5 points");
        }

        let parts = []
        switch (this.num_points) {
            case 3:
                parts.push(Polygon3D.copy(this));
                break;
            case 4:
                if (horizontally) {
                    parts.push(Polygon3D.copy(this, [this.points[0], this.points[1], this.points[3]]));
                    parts.push(Polygon3D.copy(this, [this.points[1], this.points[2], this.points[3]]));
                } else {
                    parts.push(Polygon3D.copy(this, [this.points[0], this.points[1], this.points[2]]));
                    parts.push(Polygon3D.copy(this, [this.points[2], this.points[3], this.points[0]]));
                }
                break;
            case 5:
                if (horizontally) {
                    parts.push(Polygon3D.copy(this, [this.points[0], this.points[1], this.points[4]]));
                    parts.push(Polygon3D.copy(this, [this.points[1], this.points[2], this.points[3], this.points[4]]));
                } else {
                    const mid_pt = midpoint(this.points[2], this.points[3]);
                    parts.push(Polygon3D.copy(this, [this.points[0], this.points[1], this.points[2], mid_pt]));
                    parts.push(Polygon3D.copy(this, [mid_pt, this.points[3], this.points[4], this.points[0]]));
                }
                break;
        }
        return parts;
    }
}

class TrapezoidalPrism extends Base3DGeometry {
    constructor(points, label, color, crown_index) {
        const num_points = points.length;
        if (num_points !== 8) {
            console.error("TrapezoidalPrism must have 8 point");
            return;
        }

        // Call parent constructor
        super(points, label, color, crown_index);
    }

    get children() {
        if (this._children === null) {
            this._children = [
                this.get_face("top"),
                this.get_face("bottom"),
                this.get_face("left"),
                this.get_face("right"),
                this.get_face("front"),
                this.get_face("back"),
            ];
        }
        return this._children;
    }

    get flattened_points() {
        if (this._flattened_points === null) {
            // Flattens point with the bottom side at zero
            const [A, B, D] = [this.points[0], this.points[1], this.points[3]];
            this._flattened_points = flatten_3D_points(this.points, D, B, A, true);
        }
        return this._flattened_points;
    }

    static copy(obj, points) {
        return new TrapezoidalPrism(
            points || obj.points, obj.label, obj.color, obj.crown_index
        );
    }

    compute_geometry_parameters() {
        this._area = 0;
        this._perimeter = 0;
        this._angles = [];               // Array of angles in radians
        this._edge_distances = [];       // Edges distances

        for (let i = 0; i < this.children.length; i++) {
            const item = this.children[i];
            this._angles.push(...item.angles);
            this._edge_distances.push(...item.edge_distances);
            this._area += item.area; // recompute area
            this._perimeter += item.perimeter; // recompute area
        }
    }

    compute_mesh_points() {
        // Compute triangle and edges points of all polygons for 3D visualization
        this._mesh_points = [], this._edge_points = [];
        for (let i = 0; i < this.children.length; i++) {
            const item = this.children[i];
            this._mesh_points.push(...item.mesh_points);
            this._edge_points.push(...item.edge_points);
        }
    }

    compute_mesh_colors() {
        // Compute colors of all polygons for 3D visualization
        this._mesh_colors = [];
        for (let i = 0; i < this.children.length; i++) {
            const item = this.children[i];
            item.color = this.color;
            this._mesh_colors.push(...item.mesh_colors);
        }
    }

    compute_meshes() {
        // Group of geometries
        this._mesh = new THREE.Group();
        this._mesh.name = this.label;
        this._edges = new THREE.Group();

        for (let i = 0; i < this.children.length; i++) {
            const item = this.children[i];
            item.color = this.color;
            item.label = this.label;
            item._mesh_material = this.mesh_material;
            this._mesh.add(item.mesh);
            this._edges.add(item.edges);
        }
    }

    get_face(side = "top") {
        // return a Polygon 3D of a specific side
        return Polygon3D.copy(this, this.filter_points_by_side(side));
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
        return new TrapezoidalPrism(
            this.flattened_points,
            this.label, this.color,
            this.crown_index
        );
    }

    flatten_face(side = "top", add_opposite_side = false, rotation_angle = null) {
        // Flatten side (or pair of sides if add_opposite_side is true)
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
            flattened_points = rotate_points_around_z_axis(flattened_points, rotation_angle);
        }

        const filtered_points = add_opposite_side
            ? [
                ...this.filter_points_by_side(side, flattened_points),
                ...this.filter_points_by_side(this.get_opposite_side(side), flattened_points)
            ]
            : this.filter_points_by_side(side, flattened_points);

        return Polygon3D.copy(this, filtered_points);
    }
}


class Angle {
    // Simple object to avoid multiple calculations of sinus, cosinus, and degree values
    constructor(theta) {
        this.rad = theta;
        this.deg = rad2deg(theta);
        this.cos = Math.cos(theta);
        this.sin = Math.sin(theta);
        this.tan = Math.tan(theta);
    }

    static from_3_points(p1, p2, p3) {
        return new Angle(angle_between_points(p1, p2, p3));
    }

    static from_2_planes(plane1, plane2) {
        return new Angle(angle_between_planes(plane1, plane2));
    }

    toString() {
        return `${this.deg}°`;
    };

    reverse() {
        return new Angle(-this.rad);
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
            num_spirals = null,
            num_crowns = null,
            assembly_method = null,
            rotation_angles = null,
            rotated_colors = null,

            skeleton_3D = null,
            skeleton_3D_hash_collections = null,

            outer_faces_3D = null,
            outer_floor_3D = null,
            outer_faces_3D_hash_collections = null,

            inner_faces_3D = null,
            inner_floor_3D = null,
            inner_faces_3D_hash_collections = null,

            timber_profiles_3D = null,
            mandala_3D = null,
            mandala_3D_of_outer_faces = null,
            mandala_3D_of_inner_faces = null,

            vanishing_lines = null
        }
    ) {
        this.num_spirals = num_spirals || 0;
        this.num_crowns = num_crowns || 0;
        this.assembly_method = assembly_method || 0;
        this.rotation_angles = rotation_angles || [];
        this.rotated_colors = rotated_colors || [];

        this.skeleton_3D = skeleton_3D || [];
        this.skeleton_3D_hash_collections = skeleton_3D_hash_collections || [];

        this.outer_faces_3D = outer_faces_3D || [];
        this.outer_floor_3D = outer_floor_3D || null;
        this.outer_faces_3D_hash_collections = outer_faces_3D_hash_collections || [];

        this.inner_faces_3D = inner_faces_3D || [];
        this.inner_floor_3D = inner_floor_3D || null;
        this.inner_faces_3D_hash_collections = inner_faces_3D_hash_collections || [];

        this.timber_profiles_3D = timber_profiles_3D || [];
        this.mandala_3D = mandala_3D || [];
        this.mandala_3D_of_outer_faces = mandala_3D_of_outer_faces || [];
        this.mandala_3D_of_inner_faces = mandala_3D_of_inner_faces || [];

        this.vanishing_lines = vanishing_lines || [];
    }
}

