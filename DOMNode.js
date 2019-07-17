const JSDOM = require("jsdom").JSDOM;
const { Node } = new JSDOM().window;

Node.prototype.nodeNameInCorrectCase = function() {
  const shadowRootType = this.shadowRootType();
  if (shadowRootType)
    return '#shadow-root (' + shadowRootType + ')';

  // If there is no local name, it's case sensitive
  if (!this.localName)
    return this.nodeName;

  // If the names are different lengths, there is a prefix and it's case sensitive
  if (this.localName.length !== this.nodeName.length)
    return this.nodeName;

  // Return the localname, which will be case insensitive if its an html node
  return this.localName;
}

Node.prototype.ancestorShadowRoot = function() {
  return this.shadowRoot;
}

Node.prototype.ancestorShadowHost = function() {
  const ancestorShadowRoot = this.ancestorShadowRoot();
  return ancestorShadowRoot ? ancestorShadowRoot.host : null;
}

Node.prototype.shadowRootType = function() {
  const ancestorShadowRoot = this.ancestorShadowRoot();
  return ancestorShadowRoot ? ancestorShadowRoot.mode : null;
}

module.exports.ShadowRootTypes = {
  UserAgent: 'user-agent',
  Open: 'open',
  Closed: 'closed'
};

module.exports.Node = Node;