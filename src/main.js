const lookup = require('./lookup')

// first is nodejs, second main.js, third host
const host = process.argv[2]

lookup(host)
