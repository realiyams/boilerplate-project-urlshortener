const isValidUrl = urlString => {
    var urlPattern = new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/)
    return urlPattern.test(urlString)
}

exports.isValidUrl = isValidUrl 