import Component from '@ember/component';
import { computed } from '@ember/object';
import ENV from '../config/environment'

export default Component.extend({
  classNameBindings: ['diplayRule'],
  colors: ENV.colors,

  diplayRule: computed('spinnerStatus', function(){
    if (this.get('spinnerStatus') === 'stop')
    return 'd-none';
  })

});
