// app/routes/bands/band.js
import Route from '@ember/routing/route';

export default Route.extend({
  model: function(params) {
    var bands = this.modelFor('bands');
    return bands.findBy('slug', params.slug); // params.slug is, e.g., pearl-jam
  }
});
