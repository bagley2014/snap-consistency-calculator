const process = require('process')
const path = require('path')
const { exec } = require('child_process')

try {
	process.chdir(path.join(__dirname, '../src/assets'))
} catch (err) {
	console.log('chdir: ' + err)
}

const pythonScriptPath = path.join(__dirname, './marvel-snap-scrapr/scrapr.py')

exec(`python ${pythonScriptPath}`, (error, stdout, _stderr) => {
	if (error) {
		console.error(error)
	} else {
		console.log(stdout)
	}
})
