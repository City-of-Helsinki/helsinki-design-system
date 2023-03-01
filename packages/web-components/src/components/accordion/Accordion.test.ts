// import { expect } from '@esm-bundle/chai';
import { elementUpdated, html, fixture, expect, nextFrame } from '@open-wc/testing';
// import { sendMouse, resetMouse } from '@web/test-runner-commands';

// import AccordionHTMLElement from '../../../lib/components/Accordion';

// tää alla toimii
// import AccordionHTMLElement from './Accordion';

import AccordionHTMLElement from './Accordion';

// alla esimerkkikoodia, ei toimi
// https://github.com/modernweb-dev/example-projects/blob/master/lit-element-ts-esbuild/test/my-element.test.ts
/* import AccordionHTMLElement from './Accordion';
import './hds-accordion'; */

// import { getMiddleOfElement } from '../../utils/test-utils';

describe('Accordion', () => {
  /*  beforeEach(async () => {
    const element = await fixture<AccordionHTMLElement>(
      html` <hds-accordion .size=${'m'} .heading=${'Heading'}> Accordion content </hds-accordion> `,
    );

    await elementUpdated(element);
  }); */

  /*   afterEach(async () => {
    // Remember to reset the mouse state.
    await resetMouse();
  }); */

  it('is defined', async () => {
    const element = await fixture(
      html` <hds-accordion .size=${'m'} .heading=${'Heading'}> Accordion content </hds-accordion> `,
    );

    await elementUpdated(element);

    const descendant = element.shadowRoot!.querySelector('div')!;

    expect(descendant).to.exist;
  });

  it('is accessible', async () => {
    const element = await fixture(
      html` <hds-accordion .size=${'m'} .heading=${'Heading'}> Accordion content </hds-accordion> `,
    );

    await elementUpdated(element);
    await expect(element).shadowDom.to.be.accessible();
  });

  it('shows content when heading is clicked', async () => {
    const element = await fixture(
      html`
        <hds-accordion .size=${'m'} .heading=${'Heading'} .isOpen=${false} .card="${false}." border=${false}>
          Accordion content
        </hds-accordion>
      `,
    );

    await elementUpdated(element);
    await nextFrame();
    console.log(element.className);
    // console.log(element.headingLevel);
    // await waitUntil(() => element.className, 'element should be ready');
    // await element.requestUpdate('className');

    console.log(element);
    console.log('Shadowroot: ', element.shadowRoot);
    // const heading = document.querySelector('.headingContainer');
    const heading = element.querySelector('div')!;

    console.log('Heading: ', heading);
    /* const { x, y } = getMiddleOfElement(heading);

    await sendMouse({ type: 'click', position: [x, y] }); */
    heading.click();
    await elementUpdated(element);
    expect(element.querySelector('.accordionContent')).to.contain.text(['Accordion content']);
  });

  // should close

  /*   
  it('has a heading', async () => {
    // expect(el.heading).to.equal('Heading');
    const span = element.shadowRoot!.querySelector('.label')!;

    expect(span).to.exist;

    expect(span.textContent).to.equal('About Me');
  }); */
});
