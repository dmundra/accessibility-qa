"use strict";

// This is inspired by https://github.com/sparkartgroup/quality-docs/

var unified = require("unified");
var remark2retext = require("remark-retext");
var english = require("retext-english");
var contractions = require("retext-contractions");
var readability = require("retext-readability");
var spell = require("retext-spell");
var dictionary = require('dictionary-en')
var equality = require("retext-equality");

var ignoreWords = [];

module.exports = attacher;

function attacher() {
  this.use(
    remark2retext,
    unified()
      .use(english)
      .use(contractions, { straight: true })
      .use(readability, {
        age: 18,
        minWords: 15,
        severity: "fatal",
        threshold: 5 / 7,
      })
      .use(equality, { ignore: ignoreWords || [] })
      .use(spell, dictionary)
  );
}
