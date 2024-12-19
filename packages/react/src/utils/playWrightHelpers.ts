type Story = {
  parameters: Record<string, unknown>;
  name: string;
  tags: string[];
};

// these must match values used in "playWrightInitScript"!
export const showButtonTestId = 'show-pw-component-button';
export const componentContainerTestId = 'playwright-test-component';
export const wrapperTestId = 'playwright-test-wrapper';

export function hideStoryFromStorybook(storyArg: unknown) {
  const story = storyArg as Story;
  /* eslint-disable no-param-reassign */
  // for storybook v8. Not tested yet.
  story.tags = ['!dev'];
  if (!story.parameters) {
    story.parameters = {};
  }
  story.parameters.loki = { skip: true };
  return story;
  /* eslint-enable no-param-reassign */
}

export function getPlayWrightProps() {
  const wrapper = window.document.querySelector(`*[data-testid="${wrapperTestId}"]`) as HTMLDivElement;
  const propsAsString = wrapper.getAttribute('data-json');
  if (propsAsString) {
    return JSON.parse(propsAsString);
  }
  return {};
}

export function playWrightInitScript() {
  // playwright does not provide access to the window object.
  // all init / evaluate scripts have no access to consts / function outside its scope
  // so have to put all in one func

  // @ts-ignore
  window.executeStorybookComponentTest = async (props) => {
    const btnGetter = () =>
      window.document.querySelector(`*[data-testid="show-pw-component-button"]`) as HTMLButtonElement;
    const contentGetter = () =>
      window.document.querySelector(`*[data-testid="playwright-test-component"]`) as HTMLDivElement;
    const wrapperGetter = () =>
      window.document.querySelector(`*[data-testid="playwright-test-wrapper"]`) as HTMLDivElement;

    function setPlayWrightProps(props2: unknown) {
      // PW locator.evaluate accepts only serializable args, so converting with JSON makes all props serializable
      const json = JSON.stringify(props2);
      return wrapperGetter().setAttribute('data-json', json);
    }
    if (props) {
      setPlayWrightProps(props);
    }
    const mutationPromise = new Promise((resolve) => {
      const el = contentGetter();
      if (el) {
        resolve(el);
      } else {
        const element = contentGetter();
        const observer = new MutationObserver(() => {
          if (contentGetter()) {
            observer.disconnect();
            resolve(element);
          }
        });

        observer.observe(wrapperGetter(), {
          childList: true,
          subtree: true,
        });
      }
    });

    btnGetter().click();
    return mutationPromise;
  };
}
