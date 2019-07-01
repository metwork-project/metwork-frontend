import Component from '@ember/component';

const tagLengthMin = 3

var convertTag = function(tag) {
  if (tag && !(typeof(tag)=='string')) {
    tag = tag.get('name')
  }
  return tag
}

export default Component.extend({

    classNames: ['tag-manager emberTagInput ember-view'],


    init() {
      this._super(...arguments);
      this.set('tags', this.model.get('tags_list'))
    },

    removeSelection: function(tagInput) {
        var tag = convertTag(tagInput)
        if (tag && tag.length >= tagLengthMin) {
            return ''
        } else {
            return tag
        }
    },

    actions: {
        addTag(tagInput) {
          var tag = convertTag(tagInput)
          if (tag && tag.length >= tagLengthMin) {
              this.get('tags').pushObject(tag)
              this.model.addTag(tag)
              }
          },
       
          removeTagAtIndex(index) {
            this.model.removeTag(this.get('tags')[index])
            this.get('tags').removeAt(index);
          },
        },
    

});
