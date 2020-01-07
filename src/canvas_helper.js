var CanvasHelper = function(canvas) {
    var o = {
        canvas: canvas,
        ctx: canvas.getContext('2d'),
        zBuffer: null,
        fBuffer: null,
    }
    o.convertToScreen = function(p) {
        var p = p.slice()
        p[0] = parseInt((p[0] + 1) / 2 * o.canvas.width)
        p[1] = parseInt((1 - (p[1] + 1) / 2) * o.canvas.height)
        return p
    }

    o.genZBuffer = function() {
        var zBuffer = []
        for (var i = 0; i < o.canvas.height; i++) {
            zBuffer[i] = []
            for (var j = 0; j < o.canvas.width; j++) {
                zBuffer[i][j] = Number.NEGATIVE_INFINITY
            }
        }
        return zBuffer
    }

    o.genFBuffer = function() {
        var fBuffer = []
        for (var i = 0; i < o.canvas.height; i++) {
            fBuffer[i] = []
            for (var j = 0; j < o.canvas.width; j++) {
                fBuffer[i][j] = -1
            }
        }
        return fBuffer
    }

    o.drawPoint = function(p) {
        o.ctx.fillRect(p[0], p[1], 1, 1)
    }

    o.drawLine = function(p0, p1) {
        var p0 = p0.slice()
        var p1 = p1.slice()

        var swap = function(p0, p1) {
            var t = p0[0]
            p0[0] = p1[0]
            p1[0] = t
            t = p0[1]
            p0[1] = p1[1]
            p1[1] = t
        }
        var steep = false
        if (Math.abs(p0[0] - p1[0]) < Math.abs(p0[1] - p1[1])) {
            steep = true
        }
        if (steep) {
            if (p0[1] > p1[1]) {
                swap(p0, p1)
            }
            for (var y = p0[1]; y < p1[1]; y += 1) {
                var i = (y - p0[1]) / (p1[1] - p0[1])
                x = p0[0] + (p1[0] - p0[0]) * i
                o.drawPoint([x, y])
            }
        } else {
            if (p0[0] > p1[0]) {
                swap(p0, p1)
            }
            for (var x = p0[0]; x < p1[0]; x += 1) {
                var i = (x - p0[0]) / (p1[0] - p0[0])
                y = p0[1] + (p1[1] - p0[1]) * i
                o.drawPoint([x, y])
            }
        }
    }
    o.drawModel = function(model, texPixelArray) {
        var perspectiveMatrix = simplePerspective(3)
        o.zBuffer = o.genZBuffer()
        o.fBuffer = o.genFBuffer()
        for (var f = 0; f < model.face.length; f++) {
            var p0 =  model.vertex[model.face[f][0]]
            var p1 =  model.vertex[model.face[f][1]]
            var p2 =  model.vertex[model.face[f][2]]
            var p0pos = toVec3(matVecMul(perspectiveMatrix, toVec4Point(p0.pos)))
            var p1pos = toVec3(matVecMul(perspectiveMatrix, toVec4Point(p1.pos)))
            var p2pos = toVec3(matVecMul(perspectiveMatrix, toVec4Point(p2.pos)))

            var n = normalOfTriangle(p0pos, p1pos, p2pos)
            var cosValue = dot(n, [0, 0, 1])
            if (cosValue < 0) {
                continue
            }
            
            // gamma correct
            cosValue = Math.pow(cosValue, 1/2.2)

            var sp0 =  o.convertToScreen(p0pos)
            var sp1 =  o.convertToScreen(p1pos)
            var sp2 =  o.convertToScreen(p2pos)

            xl = [sp0[0], sp1[0], sp2[0]]
            yl = [sp0[1], sp1[1], sp2[1]]

            var left = Math.min(...xl)
            var right = Math.max(...xl)
            var up = Math.min(...yl)
            var bottom = Math.max(...yl)

            for (var x = left; x < right + 1; x++) {
                if (x < 0 || x >= o.canvas.width) {
                    continue
                }
                for (var y = up; y < bottom + 1; y++) {
                    if (y < 0 || y >= o.canvas.height) {
                        continue
                    }
                    var b = barycentric(sp0, sp1, sp2, [x, y])
                    if (anyNegative(b)) {
                        continue
                    }
                    var z = b[0] * p0pos[2] + b[1] * p1pos[2] + b[2] * p2pos[2]
                    if (z <= o.zBuffer[x][y]) {
                        continue
                    }
                    o.zBuffer[x][y] = z
                    o.fBuffer[x][y] = f
                    var u = b[0] * p0.uv[0] + b[1] * p1.uv[0] + b[2] * p2.uv[0]
                    var v = b[0] * p0.uv[1] + b[1] * p1.uv[1] + b[2] * p2.uv[1]
                    texPixel = texPixelArray.pixelUV(u, v)

                    var r = Math.round(texPixel[0] * cosValue)
                    var g = Math.round(texPixel[1] * cosValue)
                    var b = Math.round(texPixel[2] * cosValue)
                    o.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
                    o.drawPoint([x, y])
                }
            }
        }
    }
    o.drawZBuffer = function() {
        for (var i = 0; i < o.canvas.height; i++) {
            for (var j = 0; j < o.canvas.width; j++) {
                if (o.zBuffer[i][j] == Number.NEGATIVE_INFINITY) {
                    o.ctx.fillStyle = 'Magenta'
                } else {
                    var intensity = (o.zBuffer[i][j] + 1) / 2
                    intensity = Math.min(1, Math.max(0, intensity))
                    var r = Math.round(255 * intensity)
                    var g = Math.round(255 * intensity)
                    var b = Math.round(255 * intensity)
                    o.ctx.fillStyle = 'rgb(' + r + ',' + g+ ',' + b + ')'
                }
                o.drawPoint([i, j])
            }
        }
    }
    return o
}