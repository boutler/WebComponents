"strict mode";
class WcDynamicTable extends HTMLElement {
  constructor(orientation = "horizontal", sortBy = "order") {
    super();

    console.log("constructor");

    this.sortBy = sortBy;
    this.orientation = orientation;

    const shadowRoot = this.attachShadow({
      mode: "open"
    });

    shadowRoot.innerHTML =
      '<link rel="stylesheet" href="styles.css">' +
      '<article id="reference-wrapper">  <slot id="slot_reference" name="reference" class="title"></slot></article>' +
      '<article id="description-wrapper">  <slot id="slot_description" name="description" class="description"> </slot></article>';
  }

  static get observedAttributes() {
    return ["orientation"];
  }

  connectedCallback() {
    console.log("connectedCallback");

    let references_slot = this.shadowRoot.querySelector(
      "#reference-wrapper > slot"
    );
    let references_list = references_slot.assignedNodes();
    let i = 0;

    for (i; i <= references_list.length - 1; i++) {
      references_list[i].setAttribute("wc-index", i);
    }

    let descriptions_slot = this.shadowRoot.querySelector(
      "#description-wrapper > slot"
    );
    let descriptions_list = descriptions_slot.assignedNodes({
      flatten: true
    });
    i = 0;

    for (i; i <= descriptions_list.length - 1; i++) {
      descriptions_list[i].setAttribute("wc-index", i);
    }
  }

  onRefereceClick(e) {
    this.setAttribute("selected");
  }

  disconnectedCallback() {
    console.log("DisconnectedCallback");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log("attributeChangedCallback");

    if (attrName === "orientation") {
      if (newVal !== "vertical" && newVal !== "horizontal") {
        this.orientation = "vertical";
      }
    }
  }

  // Get && Set Orientation
  get orientation() {
    if (this.hasAttribute("orientation")) {
      return this.getAttribute("orientation");
    }
    return false;
  }

  set orientation(value) {
    if (value) {
      this.setAttribute("orientation", value);
    } else {
      this.removeAttribute("orientation");
    }
  }
}

customElements.whenDefined("wc-dynamic-table").then(() => {
  console.log("wc-dynamic-table defined");
});

window.customElements.define("wc-dynamic-table", WcDynamicTable);
