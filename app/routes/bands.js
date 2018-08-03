import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

var Band = EmberObject.extend({
  name: '',
});

export default Route.extend({
  model: function() {
    var lz = Band.create({ name: 'Led Zeppelin' });
    var pj = Band.create({ name: 'Pearl Jam' });
    var ff = Band.create({ name: 'Foo Fighters' });

    return [lz, pj, ff];
  }
});
