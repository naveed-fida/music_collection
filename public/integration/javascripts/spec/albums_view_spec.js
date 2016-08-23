describe('abums view', function() {
  beforeEach(function() {
    this.view = new AlbumsView({ collection: albums_scaffold });
  });

  it('should have a collection property assigned', function() {
    expect(this.view.collection).toBeDefined();
    expect(this.view.collection.length).toBe(albums_scaffold.length);
  });

  it('should have a handlebars template compiled', function() {
    expect(this.view.template).toBeDefined();
  });

  it('should render to an albums container when render called', function() {
    this.view.render();
    expect($('ul#albums').find('li').length).toBe(albums_scaffold.length);
  });

  it('should rerender the view when collection changes', function() {
    this.view.render();
    var old_html = $('#albums').html();

    albums_scaffold.models[0].set('artist', 'Jay-Z');
    var new_html = $('#albums').html();

    expect(old_html).not.toEqual(new_html);
  });
});