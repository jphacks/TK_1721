import { SemaskyPage } from './app.po';

describe('semasky App', () => {
  let page: SemaskyPage;

  beforeEach(() => {
    page = new SemaskyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
