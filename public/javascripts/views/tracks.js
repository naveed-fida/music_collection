var $overlay = $('#overlay');
var TracksView = Backbone.View.extend({
  duration: 300,
  template: Handlebars.compile($('[data-name="tracks"]').html()),
  attributes: {
    id: 'tracks_modal'
  },

  events: {
    'click a.close': 'close'
  },

  open: function() {
    this.$el.add($overlay).fadeIn(this.duration);
  },

  close: function(e) {
    e.preventDefault();
    this.fadeOut();
    history.back();
  },

  fadeOut: function() {
    $overlay.fadeOut(this.duration);
    this.$el.fadeOut(this.duration, function() {
      this.remove(); // removes the view and associated el
    }.bind(this));
  },

  render: function() {
    this.$el.html(this.template({
      album: this.album,
      tracks: this.collection.toJSON()
    }));
    this.open();
    return this; // a good convention to enable chainig
  },

  initialize: function(options) {
    this.album = options.album;
    this.$el.appendTo(document.body);
  } 
})