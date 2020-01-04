var Model = function() {
    var o = {
        pos: [],
        uv: [],
        normal: [],
        face: [],
        tex: null,
    }

    o.parseObj = function(obj) {
        obj = obj.split('\n')
        for (var i = 0; i < obj.length; i++) {
            var l = obj[i]
            if (l.startsWith('v ')) {
                l = l.split(' ')
                o.pos.push([parseFloat(l[1]), parseFloat(l[2]), parseFloat(l[3])])
            } else if (l.startsWith('vt ')) {
                l = l.split(' ')
                o.uv.push([parseFloat(l[1]), 1 - parseFloat(l[2])])
            } else if (l.startsWith('vn ')) {
                l = l.split(' ')
                o.normal.push([parseFloat(l[1]), parseFloat(l[2]), parseFloat(l[3])])
            } else if (l.startsWith('f ')) {
                l = l.split(' ')
                var f = []
                for (var fi = 1; fi <= 3; fi++) {
                    var p = []
                    for (var j = 0; j < 3; j++) {
                        p.push(parseInt(l[fi].split('/')[j]) - 1)
                    }
                    f.push(p)
                }
                o.face.push(f)
            }
        }
    }
    return o
}