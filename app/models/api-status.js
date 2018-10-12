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
		var _this = this;
		later( function() {
			_this.reload();
			_this.poll();
		}, 3000);
	},

});
