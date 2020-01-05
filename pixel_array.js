var PixelArray = function(engine, texPath) {
    var texCanvas = document.createElement('canvas')
    var texCtx = texCanvas.getContext('2d')
    var o = {
        texPath: texPath,
        texImage: imageFromPath(texPath),
        texCanvas: texCanvas,
        texCtx: texCtx,
        data: null,
    }
    o.texImage.onload = function() {
        texCanvas.width = o.texImage.width
        texCanvas.height = o.texImage.height
        o.texCtx.drawImage(o.texImage, 0, 0, o.texImage.width, o.texImage.height)
        o.data = o.texCtx.getImageData(0, 0, o.texImage.width, o.texImage.height)
        engine.run()
    }
    o.pixelXY = function(x, y) {
        i = y * o.texCanvas.width + x
        var r = o.data.data[i * 4 + 0]
        var g = o.data.data[i * 4 + 1]
        var b = o.data.data[i * 4 + 2]
        return [r, g, b]
    }

    o.pixelUV = function(u, v) {
        var x = Math.floor(u * o.texCanvas.width)
        var y = Math.floor(v * o.texCanvas.height)
        return o.pixelXY(x, y)
    }
    return o
}