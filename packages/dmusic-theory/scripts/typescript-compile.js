const typescript = require('typescript')

/**
 * 编译 typescript
 *
 * @param {string[]} fileNames
 * @param {ts.CompilerOptions} options
 */
module.exports = function tsCompile(fileNames, options) {
  let program = typescript.createProgram(fileNames, options)
  let emitResult = program.emit()

  const emittedFiles = emitResult.emittedFiles

  let allDiagnostics = typescript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
      let message = typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`)
    } else {
      console.log(`${typescript.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`)
    }
  })

  return emittedFiles || []

  // let exitCode = emitResult.emitSkipped ? 1 : 0;
  // console.log(`Process exiting with code '${exitCode}'.`);
  // process.exit(exitCode)
}
