import { BookStatusPipe } from './book-status.pipe';

describe('BookStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new BookStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
