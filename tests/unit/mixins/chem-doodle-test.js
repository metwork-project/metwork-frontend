import EmberObject from '@ember/object';
import ChemDoodleMixin from 'metwork-frontend/mixins/chem-doodle';
import { module, test } from 'qunit';

module('Unit | Mixin | chem doodle');

// Replace this with your real tests.
test('it works', function(assert) {
  let ChemDoodleObject = EmberObject.extend(ChemDoodleMixin);
  let subject = ChemDoodleObject.create();
  assert.ok(subject);
});
