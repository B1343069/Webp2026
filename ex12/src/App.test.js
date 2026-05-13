import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('changes heading text when clicked', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  const headingElement = screen.getByText(/hello CGU!!/i);
  fireEvent.click(headingElement);

  expect(headingElement.innerText).toBe('hello CGU!!被點了');
  console.log.mockRestore();
});
