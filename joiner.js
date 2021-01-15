const glob = require("glob");
const fs = require("fs");

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    })
}

function readJsonFiles() {
    return new Promise((resolve, reject) => {
        glob("*.json", function (err, files) {
            if (err) {
                reject(err);
            } else {
                const promises = files.map(file => readFile(file));
                Promise.all(promises).then(list => resolve(list)).catch(err => reject(err));
            }
        });
    });
}

readJsonFiles()
    .then(list => {
        const joined = [].concat(...list);
        const content = JSON.stringify(joined, null, 4);
        fs.writeFileSync('items-colective.json', content);
    });
