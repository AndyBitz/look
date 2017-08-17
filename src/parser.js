const chalk = require('chalk')


class Parser {
  constructor(data) {
    this.data = data
  }

  template(name, data) {
    if (!name || !data)
      return ''

    const title = chalk.cyan(name)
    const body = data && data[0]
      ? this.handleBody(name, data)
      : '  -\n'

    return `${title}\n${body}\n`
  }

  handleBody(name, data) {
    switch (name) {
      case 'A':
      case 'AAAA':
        return this.addressBody(data)
      default:
        return this.defaultBody(data)
    }
  }

  defaultBody(data) {
    let buffer = ''

    if (Array.isArray(data)) {
      for (let i in data) {
        buffer += `  ${data[i]}\n`
      }
    } else {
      buffer += `  ${data}\n` 
    }

    return buffer
  }

  addressBody(data) {
    let buffer = ''

    for (let i in data) {
      const address = data[i].address
      const counter = address.indexOf(':') !== -1 ? 39 : 15
      const ws = ' '.repeat(counter-address.length)
      const ttl = chalk.green(data[i].ttl)

      buffer += `  ${address} ${ws} ${ttl}\n`
    }

    return buffer
  }

  show() {
    const data = this.data
    let buffer = ''

    for (let name in data) {
      buffer += this.template(name, data[name])
    }

    console.log(buffer)
  }
}

module.exports = Parser
