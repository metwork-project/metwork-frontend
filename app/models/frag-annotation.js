import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    ion_id: DS.attr('number'),
    name: DS.attr('string'),
    smiles: DS.attr('string'),
    db_source: DS.attr('string'),
    db_id: DS.attr('string'),
    has_no_project: DS.attr(),

    display: computed('ion_id', 'smiles', function() {
        return this.get('ion_id') + " | " + this.get('name');
    }),

});
