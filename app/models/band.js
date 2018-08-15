// app/models/band.js
import DS from 'ember-data';

export default DS.Model.extend({
  name:        DS.attr('string'), // This param could be left out,
  description: DS.attr(), // since by default, it's a string
  songs:       DS.hasMany('song')
});
