import Component from '@ember/component';
import { computed } from '@ember/object';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Component.extend(
  PaginatedControllerMixin,
  {

    selected: "all",
    TriggerUpdateFilter: false,
    triggerSelected: false,
    triggerAddItems: "init",

    init() {
      this._super(...arguments);
      this.set('inputSelected', this.get('selected'))
    },

    WatchUpdateFilter: computed('TriggerUpdateFilter', function () {
      this.send('updateDataFilter')
      return null
    }),

    WatchAddItems: computed('triggerAddItems', function () {
      if (this.get("triggerAddItems") != "init") {
        this.send('addItems')
      }
      return null
    }),

    selectedCount: computed('triggerSelected', function () {
      return this.get('updatedItemIds').length
    }),

    actions: {
      updateDataFilter() {
        this.setFilter()
        this.get('updateDataPage')(this.get('modelName'), 1, this.get('filter'))
        return null
      },
      addItems() {
        var this_ = this
        this.get('project').addItems({
          dataLabel: this.get('modelName'),
          item_ids: this.get('updatedItemIds')
        })
          .then(function (/*response*/) {
            let itemIds = [...this_.get('updatedItemIds')]
            this_.set('project.' + this_.get("itemIdsLabel"), itemIds)
            this_.set('hasChanges', false)
          });
      },
    },


    setFilter() {
      this.set('filter', this.getFilter())
    }
  });
