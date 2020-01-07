var Engine = function() {
    var canvas = document.querySelector('#id-canvas')
    var canvasHelper = CanvasHelper(canvas)
    var o = {
        event: [],
        model: undefined,
        canvasHelper: canvasHelper,
        pixelArray: undefined,
    }
    //------------
    window.addEventListener('keydown', function(event) {
        if (event.key == 'z') {
            o.drawZBuffer()
        }
    })

    //------------
    canvas.addEventListener('mousedown', function(event) {
        var x = event.layerX - 9
        var y = event.layerY - 9
        var zValue =  canvasHelper.zBuffer[x][y]
        var face =  canvasHelper.fBuffer[x][y]
        if (face == -1) {
            return
        }
        var p = o.model.face[face]
        var p0 = o.model.vertex[p[0]]
        var p1 = o.model.vertex[p[1]]
        var p2 = o.model.vertex[p[2]]

        var result = {
            zValue: zValue,
            face: face,
            p0: p0,
            p1: p1,
            p2: p2,
        }
        log(result)
    })

    o.prepared = function() {
        o.event.push(1)
        if (o.event.length == 2) {
            o.render()
        }
    }
    o.setModel = function(obj) {
        o.model = Model()
        o.model.parseObj(obj)
    }
    o.render = function() {
        o.canvasHelper.drawModel(o.model, o.pixelArray)
        // o.canvasHelper.drawZBuffer()
    }
    o.run = function() {
        o.pixelArray = PixelArray(o, 'res/tex.jpg')

        prepareData('res/monkey.obj', function(obj) {
            o.setModel(obj)
            o.prepared()
        })
    }
    o.drawZBuffer = function() {
        o.canvasHelper.drawZBuffer()
    }
    return o
}