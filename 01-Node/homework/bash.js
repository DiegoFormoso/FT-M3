const commands = require('./commands');

const done = function(data) {
    process.stdout.write(data);
    process.stdout.write('\nprompt > ');
}

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(" "); // remueve la nueva línea -> remueve el enter
  var cmd = args.shift();
  if (commands[cmd]) {
      commands[cmd](args, done);
  } else {
    done('Command not found');
  }
});

