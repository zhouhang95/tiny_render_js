var Vertex = function() {
    var o = {
        pos: [],
        uv: [],
        normal: [],
    }
    return o
}

var Model = function() {
    var o = {
        vertex: [],
        face: [],
    }

    o.parseObj = function(obj) {
        obj = obj.split('\n')
        var pos = []
        var uv = []
        var normal = []
        var face = []
        for (var i = 0; i < obj.length; i++) {
            var l = obj[i]
            if (l.startsWith('v ')) {
                l = l.split(' ')
                pos.push([parseFloat(l[1]), parseFloat(l[2]), parseFloat(l[3])])
            } else if (l.startsWith('vt ')) {
                l = l.split(' ')
                uv.push([parseFloat(l[1]), 1 - parseFloat(l[2])])
            } else if (l.startsWith('vn ')) {
                l = l.split(' ')
                normal.push([parseFloat(l[1]), parseFloat(l[2]), parseFloat(l[3])])
            } else if (l.startsWith('f ')) {
                l = l.split(' ')
                face.push(l.slice(1))
            }
        }
        var set = new Set()
        for (var i = 0; i < face.length; i++) {
            for (var j = 0; j < 3; j++) {
                set.add(face[i][j])
            }
        }
        var vertexIndex = Array.from(set)
        for (var i = 0; i < vertexIndex.length; i++) {
            var vertex = Vertex()
            var index = vertexIndex[i].split('/')
            vertex.pos = pos[parseInt(index[0]) - 1]
            vertex.uv = uv[parseInt(index[1]) - 1]
            vertex.normal = normal[parseInt(index[2]) - 1]
            o.vertex.push(vertex)
        }
        for (var i = 0; i < face.length; i++) {
            var f = []
            for (var j = 0; j < 3; j++) {
                f.push(vertexIndex.indexOf(face[i][j]))
            }
            o.face.push(f)
        }
    }
    return o
}