import DS from 'ember-data';
import {memberAction/*, collectionAction*/} from 'ember-api-actions';
import { computed } from '@ember/object';

export default DS.Model.extend({

    name: DS.attr('string'),
    description: DS.attr('string'),
    user: DS.belongsTo('user'),
    reactants_number: DS.attr('number'),
    has_no_project: DS.attr(),

    runReaction: memberAction({ path: 'run_reaction', type: 'get' }),

    getImage: memberAction({ path: 'get_image', type: 'get' }),

    display: computed('name', function() {
        return this.get('name');
    }),

});
