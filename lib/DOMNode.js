module.exports.nodeNameInCorrectCase = function nodeNameInCorrectCase(node) {
  const shadowRootType = node.shadowRoot && node.shadowRoot.mode;
  if (shadowRootType)
    return '#shadow-root (' + shadowRootType + ')';

  // If there is no local name, it's case sensitive
  if (!node.localName)
    return node.nodeName;

  // If the names are different lengths, there is a prefix and it's case sensitive
  if (node.localName.length !== node.nodeName.length)
    return node.nodeName;

  // Return the localname, which will be case insensitive if its an html node
  return node.localName;
}

module.exports.shadowRootType = function(node) {
  const ancestorShadowRoot = node.ancestorShadowRoot();
  return ancestorShadowRoot ? ancestorShadowRoot.mode : null;
}

module.exports.NodeType = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9
}
module.exports.ShadowRootTypes = {
  UserAgent: 'user-agent',
  Open: 'open',
  Closed: 'closed'
};
