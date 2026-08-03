import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import DsaLesson12 from './DsaLesson12';
import ExpressLesson10 from './ExpressLesson10';

vi.mock('./Compiler', () => ({
  default: ({ onSuccess }) => (
    <button type="button" onClick={onSuccess}>
      Mark lesson complete
    </button>
  ),
}));

vi.mock('../hooks/useProgress', () => ({
  useProgress: () => ({
    progress: { completedLessons: [] },
    completeLesson: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.stubGlobal('localStorage', {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
});
window.scrollTo = vi.fn();

const renderLesson = (Lesson) => render(
  <MemoryRouter>
    <Lesson />
  </MemoryRouter>,
);

describe('final lesson completion actions', () => {
  it.each([
    ['DSA', DsaLesson12],
    ['Express', ExpressLesson10],
  ])('%s exposes the certificate action after Compiler success', (_course, Lesson) => {
    renderLesson(Lesson);

    expect(screen.queryByRole('link', { name: /next lesson: certificate/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mark lesson complete' }));

    expect(screen.getByRole('link', { name: /next lesson: certificate/i })).toHaveAttribute('href', '/Certificate');
  });
});
