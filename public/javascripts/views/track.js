var $overlay = $('#overlay');
var TracksView = Backbone.view.extend({
  duration: 300,
  template: Handlebars.compile($('[data-name="tracks"]').html()),

  open: function() {
    this.$el.add($overlay).fadeIn(this.duration);
  },

  close: function(e) {
    e.preventDefault();
    this.fadeOut();
  }

  fadeOut: function() {
    $overlay.fadeOut(this.duration);
    this.$el.fadeOut(this.duration, function() {
      this.remove();
    });
  }

  render: function() {
    this.$el.html(this.template({
      album: this.album,
      tracks: this.collection
    }));
    this.open();
  },

  initialize: function(options) {
    this.album = options.album;
    this.$el.appendTo(document.body);
  } 
})