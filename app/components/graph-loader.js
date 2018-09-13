import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNameBindings: ['diplayRule'],

  diplayRule: computed('spinnerStatus', function(){
    if (this.get('spinnerStatus') === 'stop')
    return 'd-none';
  })

});
