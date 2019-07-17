const expect = require('chai').expect;
const DOMPath = require('./DOMPath');
const JSDOM = require("jsdom").JSDOM;

describe('DOMPath', () => {
    function parseXml(...args) {
      return new JSDOM(args.join('\n'), {
          features: {
              FetchExternalResources: ["script", "frame", "iframe", "link", "img"]
          },
          contentType: "text/xml"}).window.document;
    }
    it('xpath', () => {
        const dom = parseXml('<root><a><b>T1</b><c>T2</c></a></root>');
        const element = dom.querySelector('b');
        const selector = DOMPath.xPath(element, true);
        expect(selector).to.eql('/root/a/b');
    });
    it('xpath', () => {
      const dom = parseXml('<root><a><b>T1</b><c>T2</c></a></root>');
      const element = dom.querySelector('b');
      const selector = DOMPath.jsPath(element, true);
      expect(selector).to.eql('/root/a/b');
  });
});

