var Camera = function() {
    var o = {
        pos: [0, 0, 3],
        target: [0, 0, 0],
        fov: 39,
        useFov: false,
    }
    o.perspective = function() {
        if (o.useFov) {
            var cscValue = 1 / Math.sin(degreeToRadian(o.fov/2))
            return simplePerspective(cscValue)
        } else {
            return simplePerspective(3)
        }
    }

    return o
}