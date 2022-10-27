var fs = require('fs');
var request = require('request');

module.exports = {
    date: function(args, print) {
        print(Date());
    },

    pwd: function(args, print) {
        print(process.cwd());
    },

    echo: function(args, print) {
        print(args.join(" "));
    },

    ls: function(args, print) {
        fs.readdir('.', function(err, data){
            if (err) throw err;
            print(data.join("\n"))
        })
    },

    cat: function(args, print) {
        fs.readFile(args[0], 'utf8', function(err, data) {
            if (err) throw err;
            print(data);
        })
    },

    head: function(args, print) {
        fs.readFile(args[0], 'utf8', function(err, data){
            if (err) throw err;
            let line = data.split('\n').splice(0, parseInt(args[1])).join('\n');
            print(line);
        } )
    },

    tail: function(args, print) {
        fs.readFile(args[0], 'utf8', function(err, data) {
            if (err) throw err;
            let line = data.split('\n').splice(-parseInt(args[1])).join('\n');
            print(line);
        })
    },

    curl: function(args, print) {
        request(args[0], function(err, data) {
            if(err) throw err;
            print(data.body);
        })
    }
}