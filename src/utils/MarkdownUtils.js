'use strict';

var Remarkable = require('remarkable');
let md = new Remarkable('full');

var render = function(input) {
  return md.render(input);
}

var renderDangerouslyInnerHtml = function(input) {
  return { __html:render(input) };
}

var MarkdownUtils = {
  render: render,
  renderDangerouslyInnerHtml: renderDangerouslyInnerHtml
}

module.exports = MarkdownUtils;
