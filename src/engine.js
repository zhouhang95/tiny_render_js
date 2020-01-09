var Engine = function() {
    var canvas = document.querySelector('#id-canvas')
    var hangGL = HangGL(canvas)
    var o = {
        event: [],
        model: undefined,
        hangGL: hangGL,
        pixelArray: undefined,
        camera: Camera(),
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
        var zValue =  hangGL.zBuffer[x][y]
        var face =  hangGL.fBuffer[x][y]
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
    //------------
    document.querySelector('#id-fov').addEventListener('change', function(event) {
        var input = event.target
        var fov = parseFloat(input.value)
        o.camera.fov = fov
        o.render()
    })

    document.querySelector('#id-camera-x').addEventListener('change', function(event) {
        var input = event.target
        var x = parseFloat(input.value)
        o.camera.pos[0] = x
        o.render()
    })

    document.querySelector('#id-camera-y').addEventListener('change', function(event) {
        var input = event.target
        var y = parseFloat(input.value)
        o.camera.pos[1] = y
        o.render()
    })

    document.querySelector('#id-camera-z').addEventListener('change', function(event) {
        var input = event.target
        var z = parseFloat(input.value)
        o.camera.pos[2] = z
        o.render()
    })

    document.querySelector('#id-use-fov').addEventListener('change', function(event) {
        o.camera.useFov = event.target.checked
        o.render()
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
        o.hangGL.clear()
        o.hangGL.drawModel(o.model, o.pixelArray, o.camera)
    }
    o.run = function() {
        o.pixelArray = PixelArray(o, 'res/tex.jpg')

        prepareData('res/monkey.obj', function(obj) {
            o.setModel(obj)
            o.prepared()
        })
    }
    o.drawZBuffer = function() {
        o.hangGL.drawZBuffer()
    }
    return o
}