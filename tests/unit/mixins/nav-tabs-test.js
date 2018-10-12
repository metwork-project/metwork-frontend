import EmberObject from '@ember/object';
import NavTabsMixin from 'metwork-frontend/mixins/nav-tabs';
import { module, test } from 'qunit';

module('Unit | Mixin | nav tabs');

// Replace this with your real tests.
test('it works', function(assert) {
  let NavTabsObject = EmberObject.extend(NavTabsMixin);
  let subject = NavTabsObject.create();
  assert.ok(subject);
});
