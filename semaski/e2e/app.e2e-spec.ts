import { SemaskiPage } from './app.po';

describe('semaski App', () => {
  let page: SemaskiPage;

  beforeEach(() => {
    page = new SemaskiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
