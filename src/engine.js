var Engine = function() {
    var canvas = document.querySelector('#id-canvas')
    var canvasHelper = CanvasHelper(canvas)
    var o = {
        event: [],
        model: undefined,
        canvasHelper: canvasHelper,
        pixelArray: undefined,
    }
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
    }
    o.run = function() {
        o.pixelArray = PixelArray(o, 'res/tex.jpg')

        prepareData('res/monkey.obj', function(obj) {
            o.setModel(obj)
            o.prepared()
        })
    }
    return o
}