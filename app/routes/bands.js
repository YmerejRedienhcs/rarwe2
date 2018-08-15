// app/routes/bands.js
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';

import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    var blackDog = Song.create({
      title: 'Black Dog',
      band: 'Led Zeppelin',
      rating: 3
    });

    var yellowLedbetter = Song.create({
      title: 'Yellow Ledbetter',
      band: 'Pearl Jam',
      rating: 4
    });

    var pretender = Song.create({
      title: 'The Pretender',
      band: 'Foo Fighters',
      rating: 2
    });

    var daughter = Song.create({
      title: 'Daughter',
      band: 'Pearl Jam',
      rating: 5
    });

    var cowtown = Song.create({
      title: 'Cowtown',
      band: 'They Might Be Giants',
      rating: 5
    });

    var ledZeppelin = Band.create({
      name: 'Led Zeppelin',
      songs: [blackDog]
    });
    var pearlJam = Band.create({
      name: 'Pearl Jam',
      description: 'Perl Jam is an American rock band, formed in Seattle, Washington in 1990.',
      songs: [yellowLedbetter, daughter]
    });
    var fooFighters = Band.create({
      name: 'Foo Fighters',
      songs: [pretender]
    });
    var theyMightBeGiants = Band.create({
      name: 'They Might Be Giants',
      description: 'TMBG is the greatest band of all time.',
      songs: [cowtown]
    })

    return [ledZeppelin, pearlJam, fooFighters, theyMightBeGiants];
  },

  actions: {
    didTransition: function() {
      document.title= 'Bands - Rock & Roll';
    },
    createBand: function() {
      var name = this.get('controller').get('name');
      var band = Band.create({ name: name });
      this.modelFor('bands').pushObject(band);
      this.get('controller').set('name', '');
      this.transitionTo('bands.band.songs', band);
    }
  }
});
