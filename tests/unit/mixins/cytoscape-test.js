import EmberObject from '@ember/object';
import CytoscapeMixin from 'metwork-frontend/mixins/cytoscape';
import { module, test } from 'qunit';

module('Unit | Mixin | cytoscape');

// Replace this with your real tests.
test('it works', function(assert) {
  let CytoscapeObject = EmberObject.extend(CytoscapeMixin);
  let subject = CytoscapeObject.create();
  assert.ok(subject);
});
