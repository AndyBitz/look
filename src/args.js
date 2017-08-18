class Args {
  constructor(argv) {
    this.argv = argv
  }

  command() {
    // 0 = node, 1 = look, 2 = command
    return this.argv[2]
  }

  option(name, callback) {
    const short = `-${name.charAt(0)}`
    const long = `--${name}`

    const contains = (this.argv.indexOf(short) !== -1
      || this.argv.indexOf(long) !== -1)

    if (contains)
      callback()

    return this
  }

  flags(name) {
    const short = `-${name.charAt(0)}`
    const long = `--${name}`

    const iShort = this.argv.indexOf(short)
    const iLong = this.argv.indexOf(long)

    const index = iShort !== -1
      ? iShort
      : iLong !== -1
      ? iLong
      : null

    return index
      ? this.untilNext(index+1)
      : null
  }

  untilNext(start) {
    const args = []

    for (let i in this.argv) {
      const j = +i + +start
      const arg = this.argv[j]
      if (arg && arg.charAt(0) !== '-') {
        args.push(arg)
      } else {
        break
      }
    }

    return args
  }
}

module.exports = Args
