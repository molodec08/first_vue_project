module.exports = class DOMHelper {

    static parseStrToDom(str) {
        const parser = new DOMParser();
        return parser.parseFromString(str, "text/html");
    }

    static serializeDomToStr(dom) {
        const serialize = new XMLSerializer();
        return serialize.serializeToString(dom);
    }

    static wrapTextNodes(dom) {
        const body = dom.body;

        let textNodes = [];

        function recurcy(element) {
            element.childNodes.forEach((node) => {
                if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
                    textNodes.push(node);
                } else {
                    recurcy(node);
                }
            });
        }
        recurcy(body);

        textNodes.forEach((node, i) => {
            const wrapper = dom.createElement("text-editor");
            node.parentNode.replaceChild(wrapper, node);
            wrapper.appendChild(node);
            // wrapper.contentEditable = true;
            wrapper.setAttribute("contenteditable", true);
            wrapper.setAttribute("nodeId", i);
        });

        return dom;
    }

    static unwrapTextNodes(dom) {
        dom.body.querySelectorAll("text-editor").forEach((element) => {
            element.parentNode.replaceChild(element.firstChild, element);
        })
    }
}