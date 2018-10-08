import DS from 'ember-data';
import {/*memberAction, */collectionAction} from 'ember-api-actions';

export default DS.Model.extend({

  smiles: DS.attr('string'),
  chemdoodle_json: DS.attr(),

  loadSmiles: collectionAction({ path: 'load_smiles', type: 'patch' }),

});
