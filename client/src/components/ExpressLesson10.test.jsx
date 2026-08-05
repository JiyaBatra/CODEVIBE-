import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, expect, it } from 'vitest';
import ExpressLesson10 from './ExpressLesson10';

vi.mock('./Compiler', () => ({
  default: ({ LessonId, onSuccess }) => (
    <button type="button" onClick={onSuccess}>
      Complete {LessonId}
    </button>
  ),
}));

describe('ExpressLesson10', () => {
  it('renders REST API content instead of DSA content', () => {
    render(
      <MemoryRouter>
        <ExpressLesson10 />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Express Lesson 10: Build a REST API' })).toBeInTheDocument();
    expect(screen.getByText(/GET \/api\/tasks route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Stack Implementation/i)).not.toBeInTheDocument();
  });
});
