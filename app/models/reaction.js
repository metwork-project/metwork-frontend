import DS from 'ember-data';
import { memberAction/*, collectionAction*/ } from 'ember-api-actions';
import { computed } from '@ember/object';

export default DS.Model.extend({

  name: DS.attr('string', { defaultValue: 'New reaction' }),
  description: DS.attr('string'),
  tags_list: DS.attr(),
  user: DS.belongsTo('user'),
  user_id: DS.attr('number'),
  user_name: DS.attr('string'),
  reactants_number: DS.attr('number', { defaultValue: 0 }),
  has_no_project: DS.attr('boolean'),
  status_code: DS.attr('number', { defaultValue: 0 }),
  is_reactor: DS.attr('boolean'),
  smarts: DS.attr('string'),
  chemdoodle_json: DS.attr(),
  chemdoodle_json_error: DS.attr('string'),

  statusRef: function () {
    return {
      INIT: { code: 0, libelle: 'Initialized', class: 'secondary' },
      EDIT: { code: 10, libelle: 'Editing', class: 'warning' },
      VALID: { code: 20, libelle: 'Ready', class: 'info' },
      ACTIVE: { code: 30, libelle: 'Active', class: 'success' },
      OBSOLETE: { code: 40, libelle: 'Obsolete', class: 'danger' },
      ERROR: { code: 90, libelle: 'Error', class: 'danger' },
    }
  },

  statusCodesRef: function () {
    let statusRef = this.statusRef()
    return Object.keys(statusRef).reduce(function (total, status) {
      total[statusRef[status].code] = status
      return total
    }, {})
  },

  statusInfo: computed('status_code', function () {
    return this.statusRef()[
      this.statusCodesRef()[this.get('status_code')]
    ];
  }),

  isActive: computed('status_code', function () {
    return this.get('status_code') === this.statusRef().ACTIVE.code;
  }),

  isAtLeastValid: computed('status_code', function () {
    return this.get('status_code') >= this.statusRef().VALID.code;
  }),

  isReadyToActive: computed('status_code', function () {
    return this.get('status_code') === this.statusRef().VALID.code;
  }),

  isNotInit: computed('status_code', function () {
    return this.get('status_code') > this.statusRef().INIT.code
  }),

  isEditing: computed('status_code', function () {
    return this.get('status_code') < this.statusRef().VALID.code
  }),

  isEditable: computed('status_code', function () {
    return this.get('status_code') < this.statusRef().ACTIVE.code
  }),

  notObsolete: computed('status_code', function () {
    return this.get('status_code') < this.statusRef().OBSOLETE.code
  }),

  isObsolete: computed('status_code', function () {
    return this.get('status_code') === this.statusRef().OBSOLETE.code
  }),

  loadSmarts: memberAction({ path: 'load_smarts', type: 'patch' }),

  runReaction: memberAction({ path: 'run_reaction', type: 'post' }),

  getImage: memberAction({ path: 'get_image', type: 'get' }),

  addTag: memberAction({ path: 'add_tag', type: 'patch' }),

  removeTag: memberAction({ path: 'remove_tag', type: 'patch' }),

  display: computed('name', function () {
    return this.get('name');
  }),

  canvasId: computed(function () {
    return 'canvas-reaction-' + this.id
  }),

  hasTags: computed('tags_list', function () {
    return this.get('tags_list').length > 0
  })
});
