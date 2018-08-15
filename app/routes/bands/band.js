// app/routes/bands/band.js
import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
// import { Promise as EmberPromise } from 'rsvp';

export default Route.extend({
  model: function(params) {
    // console.log('Model hook called for `bands.band`; called with', params.slug);

    // var yayOrNay = function() {
    //   return new EmberPromise(function(resolve, reject) {
    //     if (Math.random() > 0.5) {
    //       resolve(42);
    //     } else {
    //       reject('Sorry, try again.');
    //     }
    //   });
    // }
    // function yay(value) { console.log('Yay, success: ' + value) }
    // function nay(error) { console.log(error) }
    // yayOrNay().then(yay, nay);

    return this.store.findRecord('band', params.id);
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
