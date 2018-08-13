// app/components/star-rating.js
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  classNames: ['rating-panel'],

  rating:     0,
  maxRating:  5,
  item:       null,
  "on-click": null,

  stars: computed('rating', 'maxRating', function() {
    var rating = this.get('rating');
    var fullStars = this.starRange(1, rating, 'full');
    var emptyStars = this.starRange(rating + 1, this.get('maxRating'), 'empty');
    return fullStars.concat(emptyStars);
  }),

  starRange: function(start, end, type) {
    var starsData = [];
    for (var i = start; i <= end; i++) {
      starsData.push({ rating: i, full: type === 'full' });
    }
    return starsData;
  },

  actions: {
    setRating: function(newRating) {
      this.get('on-click')({
        item: this.get('item'),
        rating: newRating
      });
    }
  }
});
