//TexturePacker --trim-sprite-names --data out/spt-game-{v}.json --format easeljs --sheet out/myTest-{v}-{n}.png --multipack --variant 1:hi --variant 0.5:low in/game

//TexturePacker --data out/spt-game-{v}.json --format easeljs --sheet out/myTest-{v}-{n}.png --multipack --variant 1:hi --variant 0.5:low in/game/common/*.png in/game/en/*.png
var exec = require('child_process').exec;
var fs = require('fs-extra');
var command = 'TexturePacker --data out/en/spt-game-{v}.json --format easeljs --sheet out/en/myTest-{v}-{n}.png --multipack --variant 1:hi --variant 0.5:low in/game/common/*.png in/game/en/*.png';
console.log('1.Emptying dir contents');
fs.emptyDir('out', function(err){
  console.log('2.Initializing spriteSheet Generation');
  if (!err) {
    exec(command, function (error, stdout, stderr) {
        if(error) {
          console.log(error);
          return;
        }
        console.log(`stdout: ${stdout}`);
    });
  }
});
