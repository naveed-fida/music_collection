var Albums = Backbone.Collection.extend({
  model: Album,
  url: 'http://localhost:3000/albums.json'
});