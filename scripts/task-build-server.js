const child = require('child_process');

function buildServer() {
    return new Promise((resolve, reject) => {
        const command = [
            'run', 'tsc',
            '-p', './server/tsconfig.json'
        ];
        const options = {
            env: process.env,
            silent: false
        };
        const spawn = /^win/.test(process.platform) ?
            child.spawn('cmd', ['/s', '/c', 'yarn', ...command], options) :
            child.spawn('yarn', command, options);

        spawn.once('exit', (code, signal) => code === 0 ? resolve() : reject());
        spawn.stdout.on('data', x => process.stdout.write(x));
        spawn.stderr.on('data', x => process.stderr.write(x));
        process.on('exit', () => spawn.kill('SIGTERM'));
    });
}

exports.buildServer = buildServer;
exports['buildServer'] = buildServer;
