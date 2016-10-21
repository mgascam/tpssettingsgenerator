var pug = require('pug');
var fs = require('fs-extra');
var path = require('path');

var templates = {
    slots: 'cgs-slots-settings.pug'
};

var languages = ['en', 'es', 'pt', 'zh-hans'];

var quality = ['hi', 'low'];

var spriteSheetNames = ['game', 'preloader', 'bonus'];

function genTP() {
    var compiledFunction = pug.compileFile(path.join(__dirname, '/templates/slots/' + templates.slots));
    spriteSheetNames.forEach(function (spriteSheetName) {
        languages.forEach(function (lang) {
            var data = {
                dirname: __dirname,
                phase: spriteSheetName,
                lang: lang
            };
            var fileName = `spt-${data.phase}-${data.lang}.tps`;
            writeFile(path.join(__dirname + '/test', fileName),
             compiledFunction(prepareData(data)));
        });
    });
};

function prepareData(data) {
    var obj = {};
    // ES6 Template strings ahead
    var defs = {
        fileName: `${data.dirname}/spt-${data.phase}-${data.lang}.tps`,
        textureFileName: `out/${data.lang}/spt-${data.phase}-{n}-{v}.png`,
        DataFile: `out/${data.lang}/spt-${data.phase}-{v}.json`,
        fileListCommon: `in/${data.phase}/common`,
        fileListLang: `in/${data.phase}/${data.lang}`
    };
    Object.keys(defs).forEach(function (def) {
        obj[def] = defs[def];
    });

    return obj;
}

function writeFile(path, content) {
    fs.writeFile(path, content);
}

function clean() {
    fs.emptyDir('out', function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('2.Initializing spriteSheet Generation');
        genTP();
    });
}

console.log('1.Emptying dir contents');
clean();
