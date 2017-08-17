const util = require('util')
const dns = require('dns')

// promisify some functions
const _resolveCname = util.promisify(dns.resolveCname)
const _resolveMx = util.promisify(dns.resolveMx)
const _resolveNs = util.promisify(dns.resolveNs)
const _resolveTxt = util.promisify(dns.resolveTxt)


class Query {
  constructor(host) {
    this.hostname = host
  }

  // template error handler
  _handleErr(err) {
    // TODO handle errors
    // console.error('an error occured')
  }

  // template for A and AAAA
  _getAddresses(fn) {
    return new Promise((resolve, reject) => {
      fn(this.hostname, {ttl: true}, (err, addresses) => {
        if (err)
          reject(err)
        else
          resolve(addresses)
      })
    })
  }

  // A
  getAddresses4() {
    return this._getAddresses(dns.resolve4)
      .catch(this._handleErr)
  }

  // AAAA
  getAddresses6() {
    return this._getAddresses(dns.resolve6)
      .catch(this._handleErr)
  }

  // CNAME 
  getCname() {
    return _resolveCname(this.hostname)
      .catch(this._handleErr)
  }

  // MX
  getMx() {
    return _resolveMx(this.hostname)
      .catch(this._handleErr)
  }

  // TXT
  getTxt() {
    return _resolveTxt(this.hostname)
      .catch(this._handleErr)
  }

  // NS
  getNameservers() {
    return _resolveNs(this.hostname)
      .catch(this._handleErr)
  }
}

module.exports = Query
