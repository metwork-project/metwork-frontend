import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chemical-select-item', 'Integration | Component | chemical select item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{chemical-select-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#chemical-select-item}}
      template block text
    {{/chemical-select-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
