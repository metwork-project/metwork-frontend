import Component from '@ember/component';

const tagLengthMin = 3

export default Component.extend({

    classNames: ['tag-manager emberTagInput ember-view'],


    init() {
      this._super(...arguments);
      this.set('tags', [])
    },
  
    existingTags: function(query, syncResults) {
      var names = ['Stefan', 'Miguel', 'Tomster', 'Pluto'];
      syncResults(names)
    },

          
    removeSelection: function(tag) {
        if (tag && tag.length >= tagLengthMin) {
            return ''
        } else {
            return tag
        }
    },

    actions: {
        addTag(tag) {
            if (tag && tag.length >= tagLengthMin) {
                this.get('tags').pushObject(tag)}
          },
       
          removeTagAtIndex(index) {
            this.get('tags').removeAt(index);
          },
        },
    

});
