// app/controllers/bands/band/songs.js
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { capitalize } from 'rarwe/helpers/capitalize';
import { sort, empty, bool, or } from '@ember/object/computed';

export default Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },
  songCreationStarted: false,
  name: '',
  sortBy: 'ratingDesc',
  sortProperties: computed('sortBy', function() {
    const options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  searchTerm: '',

  matchingSongs: computed('model.songs.@each.title', 'searchTerm', function() {
    return this.get('model.songs').filter((song) => {
      let searchTerm = this.get('searchTerm').toLowerCase();
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  sortedSongs: sort('matchingSongs', 'sortProperties'),

  isAddButtonDisabled: empty('title'),

  hasSongs: bool('model.songs.length'),
  canCreateSong: or('songCreationStarted', 'hasSongs'),

  newSongPlaceholder: computed('model.name', function() {
    let bandName = this.get('model.name');
    return `New ${capitalize(bandName)} song`;
  }),

  actions: {
    enableSongCreation() {
      this.set('songCreationStarted', true);
    },
    updateRating(song, rating) {
      if (song.get('rating') === rating) {
        rating = 0;
      }
      song.set('rating', rating);
      return song.save();
    },
    setSorting(option) {
      this.set('sortBy', option);
    },
  }
});
