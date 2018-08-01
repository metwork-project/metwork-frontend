import EmberObject from '@ember/object';
import PaginatedRouteMixin from 'metwork-frontend/mixins/paginated-route';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated route');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedRouteObject = EmberObject.extend(PaginatedRouteMixin);
  let subject = PaginatedRouteObject.create();
  assert.ok(subject);
});
