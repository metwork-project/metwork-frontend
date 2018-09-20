import EmberObject from '@ember/object';
import CytoscapeStyleMixin from 'metwork-frontend/mixins/cytoscape-style';
import { module, test } from 'qunit';

module('Unit | Mixin | cytoscape style');

// Replace this with your real tests.
test('it works', function(assert) {
  let CytoscapeStyleObject = EmberObject.extend(CytoscapeStyleMixin);
  let subject = CytoscapeStyleObject.create();
  assert.ok(subject);
});
