import { MusicsModule } from './musics.module';

describe('MusicsModule', () => {
  let musicsModule: MusicsModule;

  beforeEach(() => {
    musicsModule = new MusicsModule();
  });

  it('should create an instance', () => {
    expect(musicsModule).toBeTruthy();
  });
});
