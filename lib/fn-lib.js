let jsonfile = require('jsonfile'),
  path = require('path'),
  fs = require('fs'),
  dir = path.resolve(__dirname, "../tmp/"),
  file = path.resolve(__dirname, "../tmp/data.json")
obj = require(path.resolve(__dirname, "../tmp/data.json"))

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function checkifURLexists(url) {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].link === url) {
      return true
    }
  }
  return false
}

function checkifShortURLexists(url) {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].shortid === url) {
      return true
    }
  }
  return false
}

function getShortURL(string) {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].link === string) {
      return obj[i].shortid
    }
  }
}

function getOriginalLink(string) {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].shortid === string) {
      return obj[i].link
    }
  }
}

function addhttp(url) {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
}

exports.makeid = makeid;
exports.existsinDB = checkifURLexists;
exports.getShortURL = getShortURL;
exports.getOriginalLink = getOriginalLink;
exports.addhttp = addhttp;
exports.checkifShortURLexists = checkifShortURLexists;