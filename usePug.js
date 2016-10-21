var pug = require('pug');
var fs = require('fs-extra');

var args = [{
    lang: 'en',
    phase: 'game'
}, {
    lang: 'es',
    phase: 'game'
}, {
    lang: 'pt',
    phase: 'game'
}, {
    lang: 'zh-hans',
    phase: 'game'
}];

var defs = {
    fileName: '#{dirname}/spt-#{phase}-#{lang}.tps',
    textureFileName: 'out/#{lang}/spt-#{phase}-{n}-{v}.png',
    DataFile: 'out/#{lang}/spt-#{phase}-{v}.json',
    fileListCommon: 'in/#{phase}/common',
    fileListLang: 'in/#{phase}/#{lang}'
};

var templates = {
    slots: 'cgs-slots-settings.pug'
};

var languages = ['en', 'es', 'pt', 'zh-hans'];

var spriteSheets = ['game'];

function genTP() {
    var compiledFunction = pug.compileFile(__dirname + '/templates/slots/' + templates.slots);

  // spriteSheets.forEach(function(el, i, arr){
  //   var phase = el;
  //   languages.forEach(function(lang){
  //     var data = {
  //       dirname: __dirname,
  //       phase: phase,
  //       lang: lang
  //     };
  //     // writeFile(compiledFunction({
  //     //   fileName: pug.render(defs.fileName, data),
  //     //   textureFileName : pug.render(defs.textureFileName, data,
  //     //   DataFile: pug.render(defs.DataFile, data),
  //     //   fileListCommon: pug.render(defs.fileListCommon, data),
  //     //   fileListLang: pug.render(defs.fileListLang, data);
  //     // }).toString();
  //     // }));
  //     console.log(prepareData(data));
  //
  //   });
}

function prepareData(data) {
    console.log(data);
}

function writeFile(content) {
    fs.writeFile(defs.fileName, content);
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
