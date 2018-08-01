import EmberObject from '@ember/object';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedControllerObject = EmberObject.extend(PaginatedControllerMixin);
  let subject = PaginatedControllerObject.create();
  assert.ok(subject);
});
