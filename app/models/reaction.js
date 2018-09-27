import DS from 'ember-data';
import {memberAction/*, collectionAction*/} from 'ember-api-actions';
import { computed } from '@ember/object';

export default DS.Model.extend({

    name: DS.attr('string', {defaultValue: 'New reaction'}),
    description: DS.attr('string'),
    user: DS.belongsTo('user'),
    user_name: DS.attr('string'),
    reactants_number: DS.attr('number', {defaultValue: 0}),
    has_no_project: DS.attr('boolean'),
    status_code: DS.attr('number', {defaultValue: 0}),
    is_reactor: DS.attr('boolean'),
    chemdoodle_json: DS.attr(),

    statusRef: function() {
      return {
        INIT:   {code: 0, libelle: 'Initialized', class: 'secondary'},
        EDIT:  {code: 10, libelle: 'Editing' , class: 'warning'},
        VALID: {code: 20, libelle: 'Ready to active', class: 'info'},
        ACTIVE:  {code: 30, libelle: 'Active' , class: 'success'},
        OBSOLETE: {code: 40, libelle: 'Obsolete', class: 'secondary'},
        ERROR:   {code: 90, libelle: 'Error', class: 'danger'},
      }
    },

    statusCodesRef: function() {
      let statusRef = this.statusRef()
  		return Object.keys(statusRef).reduce( function (total, status) {
        total[statusRef[status].code] = status
        return total
      }, {} )
  	},

    statusInfo: computed('status_code', function() {
  			return this.statusRef()[
  							this.statusCodesRef() [this.get('status_code')]
        ] ;
  	}),

    isActive: computed('status_code', function() {
        return this.get('status_code') == this.statusRef().ACTIVE.code;
    }),

    isReadyToActive: computed('status_code', function() {
        return this.get('status_code') == this.statusRef().VALID.code;
    }),

    isEditing: computed('status_code', function() {
      return this.get('status_code') < this.statusRef().VALID.code
    }),

    isEditable: computed('status_code', function() {
      return this.get('status_code') < this.statusRef().ACTIVE.code
    }),

    notObsolete: computed('status_code', function() {
      return this.get('status_code') < this.statusRef().OBSOLETE.code
    }),

    loadSmarts: memberAction({ path: 'load_smarts', type: 'patch' }),

    runReaction: memberAction({ path: 'run_reaction', type: 'get' }),

    getImage: memberAction({ path: 'get_image', type: 'get' }),

    display: computed('name', function() {
        return this.get('name');
    }),

});
