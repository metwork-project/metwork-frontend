import DS from 'ember-data';
import { later } from '@ember/runloop'

export default DS.Model.extend({

  available: DS.attr('boolean'),
  molecules_count: DS.attr('number'),
  achieved_projects_count: DS.attr('number'),
  running_projects_count: DS.attr('number'),

  didLoad: function(){
    this.poll();
  },

  poll: function() {
    var this_ = this;
    later( function() {
      this_.reload().then(
        function(model) {
          model.set('available', true)
        },
        function() {
          this_.set('available', false)
        }
      );
      this_.poll();
    }, 3000);
  },

});
