var request = require('request'),
    root = 'http://localhost:3000/',
    albums;

describe('JSON Routes', function() {
  describe('/albums.json', function() {
    it('returns an array of albums', function(done) {
      request(root + 'albums.json', function(err, res, body) {
        albums = JSON.parse(body);
        expect(albums[0].artist).toBeDefined();
        done();
      });
    });
  });

  describe('/albums/<album>.json', function() {
    it('returns an array of tracks', function(done) {
      request(root + 'albums/' + albums[0].title + '.json', function(err, res, body) {
        var album = JSON.parse(body);
        expect(album[0].title).toBeDefined();
        done(); 
      });
    });
  });

});