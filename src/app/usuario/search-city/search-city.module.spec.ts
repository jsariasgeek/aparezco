import { SearchCityModule } from './search-city.module';

describe('SearchCityModule', () => {
  let searchCityModule: SearchCityModule;

  beforeEach(() => {
    searchCityModule = new SearchCityModule();
  });

  it('should create an instance', () => {
    expect(searchCityModule).toBeTruthy();
  });
});
