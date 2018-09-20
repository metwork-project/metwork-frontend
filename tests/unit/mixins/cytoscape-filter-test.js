import EmberObject from '@ember/object';
import CytoscapeFilterMixin from 'metwork-frontend/mixins/cytoscape-filter';
import { module, test } from 'qunit';

module('Unit | Mixin | cytoscape filter');

// Replace this with your real tests.
test('it works', function(assert) {
  let CytoscapeFilterObject = EmberObject.extend(CytoscapeFilterMixin);
  let subject = CytoscapeFilterObject.create();
  assert.ok(subject);
});
