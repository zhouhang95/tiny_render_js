var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var prepareData = function(name, callback) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) {
            return
        }
        var obj = this.responseText
        callback(obj)
    }
    xhr.open('GET', name)
    xhr.send()
}