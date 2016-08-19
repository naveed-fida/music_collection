describe('Albums Collection', function() {
  it('fetches a collection of three albums', function(done) {
    var albumsLoaded = App.albumsLoaded;
    App.albumsLoaded = function() {
      albumsLoaded.apply(App, arguments);
      expect(App.albums.toJSON().length).toBe(3);
      expect(typeof App.albums.toJSON()[0].title).toBe('string');
      done();
    };
    App.init();
  });

  it('sets a tracks_url property when models are created', function(done) {
    App.albumsLoaded = function() {
      expect(App.albums.first().get("tracks_url")).toMatch(/\/album/);
      done();
    }

    App.init();
  });
});