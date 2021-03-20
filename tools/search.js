function search(object, text) {
    return object.filter(x => x.id === +text || x.last_name.includes(text) || x.first_name.includes(text) || x.email.includes(text))
}

module.exports = search;