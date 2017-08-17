#!/usr/bin/env node

// packages
const chalk = require('chalk')
const Query = require('./query')
const Parser = require('./parser')

const cmd = process.argv[2]

const usage = () => {
  console.log(`
${chalk.cyan('usage')}
  look ${chalk.grey('hostname')}

${chalk.cyan('example')}
  look google.com
`)
  process.exit(0)
}

const version = () => {
  const { version } = require('../package.json')
  console.log(version)
  process.exit(0)
}

const run = async (host) => {
  const data = {}

  const query = new Query(host)
  
  data.HOST = host
  data.A = await query.getAddresses4()
  data.AAAA = await query.getAddresses6()
  data.CNAME = await query.getCname()
  data.TXT = await query.getTxt()
  data.NS = await query.getNameservers()

  const parser = new Parser(data)
  parser.show()
}

if (/--version|-v/.test(cmd))
  version()
else if (/--help|-h/.test(cmd) || !cmd)
  usage()
else if (cmd)
  run(cmd)
