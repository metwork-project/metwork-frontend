import EmberObject from '@ember/object';
import CytoscapeTipMixin from 'metwork-frontend/mixins/cytoscape-tip';
import { module, test } from 'qunit';

module('Unit | Mixin | cytoscape tip');

// Replace this with your real tests.
test('it works', function(assert) {
  let CytoscapeTipObject = EmberObject.extend(CytoscapeTipMixin);
  let subject = CytoscapeTipObject.create();
  assert.ok(subject);
});
