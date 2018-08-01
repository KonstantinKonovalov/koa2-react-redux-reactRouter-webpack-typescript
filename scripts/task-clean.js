const rimraf = require('rimraf');

function clean() {
    return new Promise((resolve, reject) => {
        rimraf(
            'build/*',
            {
                glob: {
                    nosort: true,
                    dot: true
                }
            },
            (err, result) => err ? reject(err) : resolve(result)
        );
    });
}

exports.clean = clean;
