// app/routes/bands/band/songs.js
import Route from '@ember/routing/route';
import wait from '../../../utils/wait';

export default Route.extend({
  model: function() {
    const SIMULATE_LATENCY = false;
    return SIMULATE_LATENCY ?
      wait(this.modelFor('bands.band'), 3000) :
      this.modelFor('bands.band');
  },

  resetController: function(controller) {
    controller.set('songCreationStarted', false);
  },

  actions: {
    didTransition: function() {
      var band = this.modelFor('bands.band');
      document.title = `${band.get('name')} songs - Rock & Roll`;
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
