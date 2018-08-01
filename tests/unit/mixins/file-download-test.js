import EmberObject from '@ember/object';
import FileDownloadMixin from 'metwork-frontend/mixins/file-download';
import { module, test } from 'qunit';

module('Unit | Mixin | file download');

// Replace this with your real tests.
test('it works', function(assert) {
  let FileDownloadObject = EmberObject.extend(FileDownloadMixin);
  let subject = FileDownloadObject.create();
  assert.ok(subject);
});
