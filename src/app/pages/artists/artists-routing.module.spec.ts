import { ArtistsRoutingModule } from './artists-routing.module';

describe('ArtistsRoutingModule', () => {
  let artistsRoutingModule: ArtistsRoutingModule;

  beforeEach(() => {
    artistsRoutingModule = new ArtistsRoutingModule();
  });

  it('should create an instance', () => {
    expect(artistsRoutingModule).toBeTruthy();
  });
});
