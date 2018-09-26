// app/routes/bands.js
import Route from '@ember/routing/route';
import { Promise as EmberPromise } from 'rsvp';

function wait(promise, delay) {
  return new EmberPromise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
}

export default Route.extend({
  model: function() {
    // return this.store.findAll('band');
    var bands = this.store.findAll('band');
    return wait(bands, 3 * 1000);
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
