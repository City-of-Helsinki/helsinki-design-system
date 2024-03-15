import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { IconShare, IconAngleRight, IconFaceSmile, IconTrash } from '../../icons';
import { NewButton } from './NewButton';

const onClick = action('button-click');

export default {
  component: NewButton,
  title: 'Components/NewButton',
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Primary = () => <NewButton onClick={onClick}>Button</NewButton>;

export const Secondary = () => (
  <NewButton onClick={onClick} variant="secondary">
    Button
  </NewButton>
);

export const Supplementary = () => (
  <NewButton onClick={onClick} variant="supplementary" iconStart={<IconTrash />}>
    Button
  </NewButton>
);

export const Small = () => (
  <NewButton onClick={onClick} size="small">
    Button
  </NewButton>
);

export const FullWidth = () => (
  <NewButton onClick={onClick} fullWidth>
    Button
  </NewButton>
);
FullWidth.storyName = 'Full width';

export const Icons = () => (
  <>
    <NewButton onClick={onClick} iconStart={<IconShare />}>
      Button
    </NewButton>

    <br />
    <br />

    <NewButton onClick={onClick} iconEnd={<IconAngleRight />}>
      Button
    </NewButton>

    <br />
    <br />

    <NewButton onClick={onClick} iconStart={<IconShare />} iconEnd={<IconAngleRight />}>
      Button
    </NewButton>
  </>
);

export const Loading = () => (
  <NewButton isLoading loadingText="Saving your changes">
    Button
  </NewButton>
);

export const LoadingOnClick = (args) => {
  const [isLoading, setIsLoading] = useState(false);
  const onButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsLoading(true);
  };
  useEffect(() => {
    let timeout;
    if (isLoading) {
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);
  return (
    <NewButton
      {...{ ...args, iconStart: args.variant === 'supplementary' ? <IconTrash /> : undefined }}
      onClick={onButtonClick}
      isLoading={isLoading}
      loadingText="Saving your changes"
    >
      Button
    </NewButton>
  );
};
LoadingOnClick.args = {
  variant: 'primary',
};

export const Playground = ({
  label,
  variant,
  theme,
  size,
  disabled,
  fullWidth,
  iconStart,
  iconEnd,
  isLoading,
  loadingText,
  ...args
}) => {
  return (
    <NewButton
      variant={variant}
      theme={theme}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      iconStart={iconStart ? <IconFaceSmile /> : null}
      iconEnd={iconEnd ? <IconFaceSmile /> : null}
      isLoading={isLoading}
      loadingText={loadingText}
      {...args}
    >
      {label}
    </NewButton>
  );
};
Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
};

Playground.args = {
  label: 'Button',
  variant: 'primary',
  theme: 'default',
  size: 'default',
  disabled: false,
  fullWidth: false,
  iconStart: false,
  iconEnd: false,
  isLoading: false,
  loadingText: 'Saving your changes',
};

Playground.argTypes = {
  variant: {
    options: ['primary', 'secondary', 'supplementary', 'success', 'danger'],
    control: { type: 'radio' },
  },
  theme: {
    options: ['default', 'coat', 'black'],
    control: { type: 'radio' },
  },
  size: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
};

export const LinkButton = () => (
  <NewButton
    onClick={() => {
      window.open('/');
    }}
    role="link"
    aria-label='Link to "/"'
  >
    Button used as a link
  </NewButton>
);
