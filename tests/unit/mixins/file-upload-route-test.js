import EmberObject from '@ember/object';
import FileUploadRouteMixin from 'metwork-frontend/mixins/file-upload-route';
import { module, test } from 'qunit';

module('Unit | Mixin | file upload route');

// Replace this with your real tests.
test('it works', function(assert) {
  let FileUploadRouteObject = EmberObject.extend(FileUploadRouteMixin);
  let subject = FileUploadRouteObject.create();
  assert.ok(subject);
});
