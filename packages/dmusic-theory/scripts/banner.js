const pkg = require('../package.json')
const version = process.env.VERSION || pkg.version

module.exports =
  '/*!\n' +
  ' * dmusic-theory.js v' +
  version +
  '\n' +
  ' * (c) ' +
  new Date().getFullYear() +
  ' Dawenci\n' +
  ' * Released under the MIT License.\n' +
  ' */\n'
