#!/usr/bin/env node

const Args = require('./args')
const bin = require('./bin')

const args = new Args(process.argv)

args
  .option('help', bin.usage)
  .option('version', bin.version)

// null, or arry with additional records
const records = args.flags('records')

const host = args.command()

if (host) {
  bin.run(host, records)
} else {
  bin.usage()
}
