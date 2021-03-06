import Component from '@ember/component';
import { computed } from '@ember/object';
import PaginatedControllerMixin from 'metwork-frontend/mixins/paginated-controller';

export default Component.extend(
  PaginatedControllerMixin,
  {

    TriggerUpdateFilter: false,
    triggerSelected: false,
    triggerAddItems: "init",
    dataToDelete: false,


    init() {
      this._super(...arguments);
      // if (!this.get("project.editable")) { this.set("selected", "selected") }
    },

    WatchUpdateFilter: computed('TriggerUpdateFilter', function() {
      this.send('updateDataFilter')
      return null
    }),

    WatchAddItems: computed('triggerAddItems', function() {
      if (this.get("triggerAddItems") != "init") {
        this.send('addItems')
      }
      return null
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
          .then(function(/*response*/) {
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
