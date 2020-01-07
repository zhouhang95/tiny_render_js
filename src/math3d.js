var degreeToRadian = function(degree) {
    return degree / 180 * Math.PI
}

var vec3Mul = function(vec3, scale) {
    return [vec3[0] * scale, vec3[1] * scale, vec3[2] * scale,]

}

var toVec4Point = function(a) {
    var out = a.slice()
    out.push(1)
    return out
}

var toVec4Dir = function(a) {
    var out = a.slice()
    out.push(0)
    return out
}

var toVec3 = function(a) {
    if (a[3] == 0) {
        return a.slice(0, 3)
    } else {
        var out = a.slice(0, 3)
        return vecMul(out, 1/a[3])
    }
}

var mat4Identity = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
]

var vecAdd = function(a, b) {
    var out = []
    for (var i = 0; i < a.length; i++) {
        out[i] = a[i] + b[i]
    }
    return out
}

var vecSub = function(a, b) {
    var out = []
    for (var i = 0; i < a.length; i++) {
        out[i] = a[i] - b[i]
    }
    return out
}

var vecMul = function(a, b) {
    var out = []
    for (var i = 0; i < a.length; i++) {
        out[i] = a[i] * b
    }
    return out
}

var cross = function(a, b) {
    var out = []
    out[0] = a[1] * b[2] - a[2] * b[1]
    out[1] = a[2] * b[0] - a[0] * b[2]
    out[2] = a[0] * b[1] - a[1] * b[0]
    return out
}

var dot = function(a, b) {
    var out = 0
    for (var i = 0; i < a.length; i++) {
        out += a[i] * b[i]
    }
    return out 
}

var matVecMul = function(mat, vec) {
    var l = mat
    var r = vec
    var out = []
    out[0] = l[0][0] * r[0] + l[0][1] * r[1] + l[0][2] * r[2] + l[0][3] * r[3]
    out[1] = l[1][0] * r[0] + l[1][1] * r[1] + l[1][2] * r[2] + l[1][3] * r[3]
    out[2] = l[2][0] * r[0] + l[2][1] * r[1] + l[2][2] * r[2] + l[2][3] * r[3]
    out[3] = l[3][0] * r[0] + l[3][1] * r[1] + l[3][2] * r[2] + l[3][3] * r[3]
    return out
}

var matMul = function(mat4l, mat4r) {
    var l = mat4l
    var r = mat4r
    var out = clone(mat4Identity)
    out[0][0] = l[0][0] * r[0][0] + l[0][1] * r[1][0] + l[0][2] * r[2][0] + l[0][3] * r[3][0]
    out[0][1] = l[0][0] * r[0][1] + l[0][1] * r[1][1] + l[0][2] * r[2][1] + l[0][3] * r[3][1]
    out[0][2] = l[0][0] * r[0][2] + l[0][1] * r[1][2] + l[0][2] * r[2][2] + l[0][3] * r[3][2]
    out[0][3] = l[0][0] * r[0][3] + l[0][1] * r[1][3] + l[0][2] * r[2][3] + l[0][3] * r[3][3]
    ///
    out[1][0] = l[1][0] * r[0][0] + l[1][1] * r[1][0] + l[1][2] * r[2][0] + l[1][3] * r[3][0]
    out[1][1] = l[1][0] * r[0][1] + l[1][1] * r[1][1] + l[1][2] * r[2][1] + l[1][3] * r[3][1]
    out[1][2] = l[1][0] * r[0][2] + l[1][1] * r[1][2] + l[1][2] * r[2][2] + l[1][3] * r[3][2]
    out[1][3] = l[1][0] * r[0][3] + l[1][1] * r[1][3] + l[1][2] * r[2][3] + l[1][3] * r[3][3]
    //
    out[2][0] = l[2][0] * r[0][0] + l[2][1] * r[1][0] + l[2][2] * r[2][0] + l[2][3] * r[3][0]
    out[2][1] = l[2][0] * r[0][1] + l[2][1] * r[1][1] + l[2][2] * r[2][1] + l[2][3] * r[3][1]
    out[2][2] = l[2][0] * r[0][2] + l[2][1] * r[1][2] + l[2][2] * r[2][2] + l[2][3] * r[3][2]
    out[2][3] = l[2][0] * r[0][3] + l[2][1] * r[1][3] + l[2][2] * r[2][3] + l[2][3] * r[3][3]
    //
    out[3][0] = l[3][0] * r[0][0] + l[3][1] * r[1][0] + l[3][2] * r[2][0] + l[3][3] * r[3][0]
    out[3][1] = l[3][0] * r[0][1] + l[3][1] * r[1][1] + l[3][2] * r[2][1] + l[3][3] * r[3][1]
    out[3][2] = l[3][0] * r[0][2] + l[3][1] * r[1][2] + l[3][2] * r[2][2] + l[3][3] * r[3][2]
    out[3][3] = l[3][0] * r[0][3] + l[3][1] * r[1][3] + l[3][2] * r[2][3] + l[3][3] * r[3][3]
    
    return out
}
var norm = function(vec3) {
    var norm = Math.sqrt(vec3[0] * vec3[0] + vec3[1] * vec3[1] + vec3[2] * vec3[2])
    return norm
}

var normalize = function(vec3) {
    var norm = Math.sqrt(vec3[0] * vec3[0] + vec3[1] * vec3[1] + vec3[2] * vec3[2])
    return [vec3[0] / norm, vec3[1] / norm, vec3[2] / norm,]
}

var cos = function(a, b) {
    var a = normalize(a)
    var b = normalize(b)
    var out = dot(a, b)
    return out
}

var sin = function(a, b) {
    var a = normalize(a)
    var b = normalize(b)
    var crossVec = cross(a, b)
    var out = norm(crossVec)
    return out
}

var clone = function(mat) {
    var out = [[], [], [], [],]
    out[0][0] = mat[0][0]
    out[0][1] = mat[0][1]
    out[0][2] = mat[0][2]
    out[0][3] = mat[0][3]
    out[1][0] = mat[1][0]
    out[1][1] = mat[1][1]
    out[1][2] = mat[1][2]
    out[1][3] = mat[1][3]
    out[2][0] = mat[2][0]
    out[2][1] = mat[2][1]
    out[2][2] = mat[2][2]
    out[2][3] = mat[2][3]
    out[3][0] = mat[3][0]
    out[3][1] = mat[3][1]
    out[3][2] = mat[3][2]
    out[3][3] = mat[3][3]
    return out
}

var translate = function(vec3) {
    var out = clone(mat4Identity)
    out[0][3] += vec3[0]
    out[1][3] += vec3[1]
    out[2][3] += vec3[2]

    return out
}

var rotate = function(degree, direction) {
    var arc = degreeToRadian(degree)
    var sinArc = Math.sin(arc)
    var cosArc = Math.cos(arc)

    var out = clone(mat4Identity)
    var directVec = direction
    if (direction == 'x') {
        directVec = [1, 0, 0]
    } else if (direction == 'y') {
        directVec = [0, 1, 0]
    } else if (direction == 'z') {
        directVec = [0, 0, 1]        
    }
    directVec = normalize(directVec)
    var x = directVec[0]
    var y = directVec[1]
    var z = directVec[2]
    var out = clone(mat4Identity)
    out[0][0] = cosArc + x * x * (1 - cosArc)
    out[0][1] = x * y * (1 - cosArc) - z * sinArc
    out[0][2] = x * z * (1 - cosArc) + y * sinArc
    out[1][0] = x * y * (1 - cosArc) + z * sinArc
    out[1][1] = cosArc + y * y * (1 - cosArc)
    out[1][2] = y * z * (1 - cosArc) - x * sinArc
    out[2][0] = x * z * (1 - cosArc) - y * sinArc
    out[2][1] = y * z * (1 - cosArc) + x * sinArc
    out[2][2] = cosArc + z * z * (1 - cosArc)
    
    return out

}

var scale = function(scale) {
    var out = clone(mat4Identity)
    if (typeof(scale) == 'number') {
        out[0][0] = scale
        out[1][1] = scale
        out[2][2] = scale
    } else {
        out[0][0] = scale[0]
        out[1][1] = scale[1]
        out[2][2] = scale[2]
    }
    return out
}


var orthographic = function(height) {


}

var perspective = function(height, fov) {
    
}

var simplePerspective = function(c) {
    var out = clone(mat4Identity)
    out[3][2] = -1 / c
    return out
}

var lookat = function(pos, target) {
    var world_up = [0, 1, 0]
    var d = vecSub(pos, target)
    d = normalize(d)
    var r = cross(world_up, d)
    r = normalize(r)
    var u = cross(d, r)
    u = normalize(u)
    var ml = [
        [r[0], r[1], r[2], 0],
        [u[0], u[1], u[2], 0],
        [d[0], d[1], d[2], 0],
        [0, 0, 0, 1],
    ]
    var mr = [
        [1, 0, 0, -pos[0]],
        [0, 1, 0, -pos[0]],
        [0, 0, 1, -pos[0]],
        [0, 0, 0, 1],
    ]
    return matMul(ml, mr)
}

var barycentric = function(a, b, c, p) {
    ab = [b[0] - a[0], b[1] - a[1]]
    ac = [c[0] - a[0], c[1] - a[1]]
    pa = [a[0] - p[0], a[1] - p[1]]

    x = [ab[0], ac[0], pa[0]]
    y = [ab[1], ac[1], pa[1]]

    u = cross(x, y)
    if (Math.abs([2]) < 1) {
        return [-1, 1, 1]
    } else {
        var out = [1 - (u[0] + u[1]) / u[2], u[0] / u[2], u[1] / u[2]]
        return out
    }
}

var normalOfTriangle = function(a, b, c) {
    ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]

    var n = cross(ab, ac)
    n = normalize(n)
    return n
}

var anyNegative  = function(v) {
    return v[0] < 0 || v[1] < 0 || v[2] < 0
}