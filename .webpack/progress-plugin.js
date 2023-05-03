const fs = require('fs');
const cp = require('child_process');
const path = require('path');

/**
 * Get windows temp folder location. Should work in windows and WSL.
 * If in WSL, it returns a path to the windows temp folder which is accessible from within the WSL.
 */
function _getTempPath() {
  // Retrieve windows system temp path. Only works where "cmd.exe" is available (windows or WSL)
  const tmpPath = cp.execSync('cmd.exe /c "echo %Temp%"', { encoding: 'utf8' }).replace(/(?:\r\n|\r|\n)/g, '');

  // Create WSL compatible path to temp folder in windows host
  const wslTmpPath = tmpPath.replace('C:\\', '/mnt/c/').replace(/\\/g, path.sep);

  const isWin = 'win32' === process.platform;
  return isWin ? tmpPath : wslTmpPath;
}

const _pluginName = 'WebpackProgress';
const _outputFilePath = `${_getTempPath()}${path.sep}webpack-progress`;

/**
 * Creates a simple file called "webpack-progress" in the users temp folder with 3 lines of content, where each line
 * either states "true" or "false" with the following meaning:
 *
 *     - Line 1, "isRunning":   Compilation is currently running
 *     - Line 2, "hasErrors":   Compilation finished with errors
 *     - Line 3, "hasWarnings": Compilation finished with warnings
 */
class WebpackProgressPlugin {
  write(isRunning, hasErrors, hasWarnings) {
    const eol = '\r\n';
    const newStatus = isRunning + eol + hasErrors + eol + hasWarnings;

    fs.writeFileSync(_outputFilePath, newStatus);
  }

  apply(compiler) {
    compiler.hooks.compile.tap(_pluginName, () => this.write(true, false, false));
    compiler.hooks.done.tap(_pluginName, stats => this.write(false, stats.hasErrors(), stats.hasWarnings()));
  }
}

module.exports = WebpackProgressPlugin;
