// app/routes/bands/band/details.js
import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return this.modelFor('bands.band');
  }
});
