import { MusicsRoutingModule } from './musics-routing.module';

describe('MusicsRoutingModule', () => {
  let musicsRoutingModule: MusicsRoutingModule;

  beforeEach(() => {
    musicsRoutingModule = new MusicsRoutingModule();
  });

  it('should create an instance', () => {
    expect(musicsRoutingModule).toBeTruthy();
  });
});
