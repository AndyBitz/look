const chalk = require('chalk')
const Query = require('./query')
const Parser = require('./parser')

const title = str => chalk.yellow(str)
const info = str => chalk.grey(str)

module.exports = {

  usage: () => {
    console.log(`
  ${title('Usage')}
    look ${chalk.grey('hostname')}

  ${title('Options')}
    -h, --help       Output usage information.
    -v, --version    Output version.    
    -r, --records    List of additional records to display.
                     Records: mx 

  ${title('Examples')}
    ${info('info for google.com')}
    look google.com

    ${info('info for google.com + mx records')}
    look google.com -r mx

  `)
    process.exit(0)
  },

  version: () => {
    const { version } = require('../package.json')
    console.log(version)
    process.exit(0)
  },

  run: async (host, records) => {
    const data = {}
    records = records ? records : []

    const query = new Query(host)
    
    data.HOST = host
    data.A = await query.getAddresses4()
    data.AAAA = await query.getAddresses6()
    data.CNAME = await query.getCname()

    if (records.indexOf('mx') !== -1)
      data.MX = await query.getMx()

    data.TXT = await query.getTxt()
    data.NS = await query.getNameservers()

    const parser = new Parser(data)
    parser.show()
  }

}
