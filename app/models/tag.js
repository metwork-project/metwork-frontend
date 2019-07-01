import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({

	name: DS.attr('string'),

	displayName: computed('name', function(){
		return this.get('name')
	})

});
