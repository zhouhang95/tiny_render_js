var Camera = function() {
    var o = {
        fov: 39,
    }
    o.perspective = function() {
        var cscValue = 1 / Math.sin(degreeToRadian(o.fov/2))
        return simplePerspective(cscValue)
    }

    return o
}