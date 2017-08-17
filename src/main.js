#!/usr/bin/env node
const chalk = require('chalk')
const lookup = require('./lookup')

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


if (/--version|-v/.test(cmd)) {
  // show version
  version()
} else if (/--help|-h/.test(cmd)) {
  // show usage
  usage()
} else if (cmd) {
  // execute programm
  lookup(cmd)
} else {
  // show usage
  usage()
}
