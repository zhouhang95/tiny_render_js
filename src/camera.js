var Camera = function() {
    var o = {
        phi: 0,
        theta: 90,
        r: 3,
    }
    o.getPosition = function() {
        var phi = degreeToRadian(o.phi)
        var theta = degreeToRadian(o.theta)
        x = r * Math.cos(phi) * Math.sin(theta)
        y = r * Math.sin(phi) * Math.sin(theta)
        z = r * Math.cos(theta)
        return [x, z, -y]
    }
    o.perspective = function() {
        return simplePerspective(o.r)
    }

    return o
}