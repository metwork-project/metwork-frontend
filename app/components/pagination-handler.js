import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

    count: computed( 'data.meta.pagination.{last.page,self.page}', function() {
        const total = this.get('data.meta.pagination.last.page') || this.get('data.meta.pagination.self.page');
        if (!total) return [];
        return new Array(total+1).join('x').split('').map((e,i) => i+1);
    }),

});
