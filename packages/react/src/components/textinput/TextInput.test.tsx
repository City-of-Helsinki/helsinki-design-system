import React from 'react';
import { render } from '@testing-library/react';

import TextInput from './TextInput';

describe('<TextInput /> spec', () => {
  it('renders the component', () => {
    render(<TextInput />);
  });
});
