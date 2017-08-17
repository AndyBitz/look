#!/usr/bin/env node
const chalk = require('chalk')
const Query = require('./query')

const cmd = process.argv[2]


const usage = () => {
  console.log(`
usage:
  look ${chalk.grey('hostname')}

example:
  look google.com
`)
  process.exit(1)
}


const version = () => {
  const { version } = require('../package.json')
  console.log(version)
}


const run = async (host) => {
  const data = {}

  const query = new Query(host)
  
  data.A = await query.getAddresses4()
  data.AAAA = await query.getAddresses6()
  data.CNAME = await query.getCname()
  data.TXT = await query.getTxt()
  data.NS = await query.getNameservers()

  console.log(data)
}


if (/--version|-v/.test(cmd)) {
  // show version
  version()
} else if (/--help|-h/.test(cmd)) {
  // show usage
  usage()
} else if (cmd) {
  // execute programm
  run(cmd)
} else {
  // show usage
  usage()
}
