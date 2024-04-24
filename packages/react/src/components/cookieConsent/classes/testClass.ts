/* eslint-disable class-methods-use-this */
export class TestClass {
  uid: string;

  clickCount: number;

  ids: Record<string, string>;

  constructor() {
    this.uid = String(Date.now());
    this.ids = {
      uidSpan: 'uid-span',
      clickCountSpan: 'click-count-span',
      clickButton: 'click-button',
    };
    this.clickCount = 0;

    this.addShadowRoot();

    this.renderUidSpan();
    this.renderClickButton();
    this.renderClickCountSpan();
  }

  addShadowRoot() {
    const host = this.getOrAddHost();
    if (!host) {
      throw new Error('NO HOST ELEMENT');
    }
    if (host.shadowRoot) {
      host.shadowRoot.innerHTML = '';
    }

    return host.attachShadow({ mode: 'open' });
  }

  getShadowRoot() {
    const host = document.querySelector('#host');
    if (!host || !host.shadowRoot) {
      throw new Error('NO HOST ELEMENT OR SHADOW ROOT');
    }
    return host.shadowRoot;
  }

  getOrAddHost() {
    const current = document.querySelector('#host');
    if (!current) {
      const el = document.createElement('div');
      el.setAttribute('id', 'host');
      document.body.appendChild(el);
      return el;
    }
    return current;
  }

  removeElementIfExists(id: string) {
    const el = this.getShadowRoot().getElementById(id);
    if (el) {
      el.remove();
    }
  }

  renderUidSpan() {
    const id = this.ids.uidSpan;
    this.removeElementIfExists(id);
    const span = document.createElement('span');
    span.setAttribute('id', id);
    span.textContent = `Class uid is ##${this.uid}##`;
    this.getShadowRoot().appendChild(span);
  }

  renderClickCountSpan() {
    const id = this.ids.clickCountSpan;
    this.removeElementIfExists(id);
    const span = document.createElement('span');
    span.setAttribute('id', id);
    span.textContent = `Click count is ##${this.clickCount}##`;
    this.getShadowRoot().appendChild(span);
  }

  onButtonClick() {
    this.clickCount += 1;
    this.renderClickCountSpan();
  }

  renderClickButton() {
    const id = this.ids.clickButton;
    this.removeElementIfExists(id);
    const button = document.createElement('button');
    button.setAttribute('id', id);

    button.textContent = `Button`;
    button.onclick = this.onButtonClick.bind(this);
    this.getShadowRoot().appendChild(button);
  }
}
