// app/routes/index.js
import Route from '@ember/routing/route';
export default Route.extend({
  beforeModel() {
    this.transitionTo('bands');
  }
});
