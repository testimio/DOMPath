const expect = require('chai').expect;
const DOMPath = require('./DOMPath');
const JSDOM = require("jsdom").JSDOM;

const JSDOM_OPTIONS = {
  features: {
      FetchExternalResources: ["script", "frame", "iframe", "link", "img"]
  },
};

describe('DOMPath', () => {
    function parseXml(...args) {
      return new JSDOM(args.join('\n'), Object.assign({}, JSDOM_OPTIONS, { contentType: "text/xml" })).window.document;
    }
    it('xPath', () => {
        const dom = parseXml('<root><a><b>T1</b><c>T2</c></a></root>');
        const element = dom.querySelector('b');
        const selector = DOMPath.xPath(element, true);
        expect(selector).to.eql('/root/a/b');
    });
    it('xPath from real page', () => {
      return JSDOM.fromURL("https://www.testim.io/", JSDOM_OPTIONS).then(jsDom => {
        const dom = jsDom.window.document;
        const element = dom.querySelector("body > main > section.Section.integrations-section.start-xs.center-sm > div > div.col-xs-12.col-sm-6.col-md-6.col-lg-5.col-lg-offset-1.px-0.logo-seperator > div > div:nth-child(2) > div:nth-child(2) > svg > use");
        const selector = DOMPath.xPath(element, true);
        expect(selector).to.eql('/html/body/main/section[2]/div/div[2]/div/div[2]/div[1]/svg/use');
      });
    });
    it('jsPath', () => {
      const dom = parseXml('<root><a><b>T1</b><c>T2</c></a></root>');
      const element = dom.querySelector('b');
      const selector = DOMPath.jsPath(element, true);
      expect(selector).to.eql('document.querySelector("root > a > b")');
    });
    it('cssPath', () => {
      const dom = parseXml('<root><a><b>T1</b><c>T2</c></a></root>');
      const element = dom.querySelector('b');
      const selector = DOMPath.cssPath(element, true);
      expect(selector).to.eql('root > a > b');
    });
});

