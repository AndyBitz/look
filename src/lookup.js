const dns = require('dns')
const chalk = require('chalk')


const lookup = async (hostname) => {
  const ip = await new Promise(res => {
    dns.lookup(hostname, (err, address) => res(address))
  })

  const ns = await new Promise(res => {
    dns.resolveNs(hostname, (err, addresses) => res(addresses))
  })

  const out = pretty({ hostname, ip, ns })
  console.log(out)
}

const title = str => chalk.cyan(str)

const pretty = (data) => (`
${title('host')}
  ${data.hostname}

${title('ip')}
  ${data.ip || '-'}

${title('nameservers')}
  ${data.ns.toString().replace(/,/g, '\n  ')}
`)

module.exports = lookup
