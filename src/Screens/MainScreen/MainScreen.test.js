import React from 'react';
import { render } from '@testing-library/react';
import MainScreen from './MainScreen';

test('renders learn react link', () => {
  const { getByText } = render(<MainScreen />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
