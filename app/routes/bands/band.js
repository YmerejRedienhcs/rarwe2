// app/routes/bands/band.js
import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  model: function(params) {
    console.log('Model hook called for `bands.band`; called with', params.slug);
    var bands = this.modelFor('bands');
    return bands.findBy('slug', params.slug); // params.slug is, e.g., pearl-jam
  },

  afterModel: function(band) {
    var description = band.get('description');
    if (isEmpty(description)) {
      this.transitionTo('bands.band.songs');
    } else {
      this.transitionTo('bands.band.details');
    }
  }
});
