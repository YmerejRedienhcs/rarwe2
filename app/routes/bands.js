// app/routes/bands.js
import Route from '@ember/routing/route';
import wait from '../utils/wait';

export default Route.extend({
  model: function() {
    const SIMULATE_LATENCY = false;
    if (SIMULATE_LATENCY) {
      return wait(this.store.findAll('band'), 3 * 1000);
    } else {
      return this.store.findAll('band');
    }
  },

  actions: {
    didTransition: function() {
      document.title= 'Bands - Rock & Roll';
    },
    createBand: function() {
      var route = this;
      var controller = this.get('controller');

      var band = this.store.createRecord('band', controller.getProperties('name'));
      band.save().then(function() {
        controller.set('name', '');
        route.transitionTo('bands.band.songs', band);
      });
    }
  }
});
