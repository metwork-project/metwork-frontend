import DS from 'ember-data';
import {memberAction/*, collectionAction*/} from 'ember-api-actions';
import { computed } from '@ember/object';

export default DS.Model.extend({

    name: DS.attr('string'),
    description: DS.attr('string'),
    user: DS.belongsTo('user'),
    reactants_number: DS.attr('number', {defaultValue: 0}),
    has_no_project: DS.attr('boolean'),
    status_code: DS.attr('number',
        {defaultValue: 0}),
    is_reactor: DS.attr('boolean'),

    statusRef: function(status) {
      return {
        INIT:   {code: 0, libelle: 'Initialized', class: 'secondary'},
        EDIT:  {code: 10, libelle: 'Editing' , class: 'info'},
        VALID: {code: 20, libelle: 'Valid', class: 'warning'},
        ACTIVE:  {code: 30, libelle: 'Active' , class: 'warning'},
        OBSOLETE: {code: 40, libelle: 'Obsolete', class: 'warning'},
        ERROR:   {code: 90, libelle: 'Error', class: 'danger'},
      }[status]
    },

    isActive: computed('status_code', function() {
        return this.get('status_code') == this.statusRef('ACTIVE').code;
    }),

    isEditable: computed('status_code', function() {
      let status_code = this.get('status_code');
      return status_code >= this.statusRef('EDIT').code
        &&   status_code < this.statusRef('ACTIVE').code
    }),

    runReaction: memberAction({ path: 'run_reaction', type: 'get' }),

    getImage: memberAction({ path: 'get_image', type: 'get' }),

    display: computed('name', function() {
        return this.get('name');
    }),

});
