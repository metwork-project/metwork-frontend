import Mixin from '@ember/object/mixin';
import Inflector from 'ember-inflector';

export default Mixin.create({

  actions: {
    navigateTo(navToggle) {
      var inflector = new Inflector(Inflector.defaultRules);
      var route = inflector.pluralize(this.model.constructor.modelName)
      route += '.show.' + navToggle
      this.transitionToRoute(route, this.model)
    },
  },

});
