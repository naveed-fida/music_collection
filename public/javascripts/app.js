var App = {
  albumsLoaded: function() {
    this.view.render();
  },

  fetchAlbums: function() {
    this.albums = new Albums();
    this.view = new AlbumsView({ collection: this.albums });
    this.albums.fetch({
      success: this.albumsLoaded.bind(this)
    });
  },

  tracksLoaded: function(tracks) {
    var tracks_view = new TracksView({
      collection: tracks,
      album: this.selected_album.toJSON()
    });
    tracks_view.render();
    this.tracks = tracks_view;
  },

  fetchTracks: function(name) {
    var tracks = new (Tracks.extend({
      url: '/albums/' + name + '.json'
    }))();

    this.selected_album = this.albums.findWhere({ title: name });

    tracks.fetch({
      success: this.tracksLoaded.bind(this)
    });
  },

  init: function() {
    this.fetchAlbums();
  }
};

var Router = Backbone.Router.extend({
  routes: {
    "albums/:name": 'getAlbum', // the routes hash could also be passed directly to the
                                // constructor at instantiation.
  },

  index: function() {
    if (!App.tracks.$el.is(':animated')) {
      App.tracks.fadeOut();
    }
  },

  getAlbum: function(name) {
    App.fetchTracks(name);
  },

  initialize: function() {
    this.route(/^\/?$/, 'index'); // 'index' is the name of the router
                                  // the route is managed by this.index by default
                                  // bcz no explicit callback is given
  }
});

var router = new Router();

Backbone.history.start({
  pushState: true, // use true urls instead of hashed ones
  silent: true // so if the route visited directly, action's not called
});

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  // t{trigger: true} is to trigger action associated with route
  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
});