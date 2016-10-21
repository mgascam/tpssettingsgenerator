var pug = require('pug');
var fs = require('fs-extra');
var path = require('path');

var templates = {
    slots: 'cgs-slots-settings.pug'
};

var languages = ['en', 'es', 'pt', 'zh-hans'];

var qualities = ['hi', 'low'];

var spriteSheetNames = ['game', 'preloader', 'bonus'];

function genTP() {
    var tpsFunc = pug.compileFile(path.join(__dirname, '/templates/easeljs/' + templates.slots));
    spriteSheetNames.forEach(function (spriteSheetName) {
        qualities.forEach(function (quality) {
            languages.forEach(function (lang) {
                var data = {
                    dirname: __dirname,
                    phase: spriteSheetName,
                    lang: lang,
                    quality: quality,
                    scale: quality === qualities[0] ? 1 : 0.5
                };
                var fileName = `spt-${data.phase}-${data.lang}.tps`;
                var to = path.join(__dirname, 'test', quality, fileName);
                var content = tpsFunc(prepareData(data)).toString();
                writeFile(to, content);
            });
        });
    });
};

function prepareData(data) {
    var obj = {};
    // ES6 Template strings ahead
    var defs = {
        fileName: `${data.dirname}/spt-${data.phase}-${data.lang}.tps`,
        textureFileName: `out/${data.quality}/${data.lang}/spt-${data.phase}-{n}.png`,
        DataFile: `out/${data.quality}/${data.lang}/spt-${data.phase}.json`,
        fileListCommon: `in/${data.phase}/common`,
        fileListLang: `in/${data.phase}/${data.lang}`,
        scale: `${data.scale}`
    };
    Object.keys(defs).forEach(function (def) {
        obj[def] = defs[def];
    });

    return obj;
}

function writeFile(path, content) {
    fs.outputFile(path.toString(), content, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function clean() {
    fs.emptyDir('test/out', function (err) {
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
