// app/routes/bands/band/songs.js
import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return this.modelFor('bands.band');
  }
});
