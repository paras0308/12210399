let fs = require('fs'),
    path = require('path')
dir = path.resolve(__dirname, "../tmp/")
file = path.resolve(__dirname, "../tmp/data.json");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}
else {
    console.log('directory exists')
}

if (fs.existsSync(file)) {
    console.log("exists")
}
else {
    console.log("doesnt exist")
    let data = "[\n\n]"
    fs.writeFile(file, data, { flag: 'wx' }, function (err) {
        if (err) throw err
        console.log("created")
    })
}