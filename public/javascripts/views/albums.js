var AlbumsView = Backbone.View.extend({
  template: Handlebars.compile($('[data-name="albums"]').html()),

  render: function() {
    this.$el.html(this.template({ albums: this.collection.toJSON() }));
    return this; // a good convention to enable chaining
  },

  initialize: function() {
    this.setElement($('#albums')[0]);
    this.listenTo(this.collection, 'change', this.render);
  }
});