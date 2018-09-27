// app/routes/bands/band/songs.js
import Route from '@ember/routing/route';
import wait from '../../../utils/wait';
import RSVP from "rsvp";
import { capitalize as capitalizeWords } from 'rarwe/helpers/capitalize';

export default Route.extend({
  model: function() {
    // let simLat = (value) => {
    //   const SIM_LATENCY = false;
    //   if (SIM_LATENCY) {
    //     return wait(value, 3000);
    //   } else {
    //     return value;
    //   }
    // }
    // let modelOrError = (value) => {
    //   const SIMULATE_ERROR = true;
    //   if (SIMULATE_ERROR) {
    //     return RSVP.reject(value);
    //   } else {
    //     return value;
    //   }
    // };
    //
    // const SIMULATE_LATENCY = true;
    // if (SIMULATE_LATENCY) {
    //   return wait(modelOrError(this.modelFor('bands.band')), 3000);
    // } else {
    //   return modelOrError(this.modelFor('bands.band'));
    // }
    const SIM_ERROR = false;
    const SIM_LATENCY = false;
    if (SIM_ERROR) {
      if (SIM_LATENCY) {
        // I haven't been able to simulate latency AND error.
        // console.log('this does not work');
        // return wait(RSVP.reject(this.modelFor('bands.band')), 3000);
        return RSVP.reject(wait(this.modelFor('bands.band'),3000));
      } else {
        return RSVP.reject(this.modelFor('bands.band'))
      }
    } else {
      if (SIM_LATENCY) {
        return wait(this.modelFor('bands.band'), 3000);
      } else {
        return this.modelFor('bands.band');
      }
      // normal case:
      // return this.modelFor('bands.band');
    }
  },

  resetController: function(controller) {
    controller.set('songCreationStarted', false);
  },

  actions: {
    didTransition: function() {
      var band = this.modelFor('bands.band');
      var name = capitalizeWords(band.get('name'));
      document.title = `${name} songs - Rock & Roll`;
    },
    createSong: function() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');
      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });
      song.save().then(function() {
        controller.set('title', '');
      });
    }
  }
});
