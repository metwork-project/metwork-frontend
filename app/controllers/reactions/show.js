import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed } from '@ember/object';

export default Controller.extend({

    image: "",
    currentUser: service('current-user'),
    editReaction: false,

    editMode: computed('model.status_code', 'editReaction', function() {
      return this.model.get('isReadyToActive') && this.get('editReaction')
        || this.model.get('isEditable') && ! this.model.get('isReadyToActive')
    }),

    editInfo: computed('model.status_code', 'editReaction', function() {
      if (this.get('editReaction')) {
        return { btnType: 'secondary', label: 'Cancel Edit' }
      } else {
        return { btnType: 'warning', label: 'Edit Reaction' }
      }
    }),

    saveInfo: computed('model.status_code', 'editReaction', function() {
      if (this.model.get('isNew')) {
        return { btnType: 'success', label: 'Create Reaction' }
      } else if ( this.get('editMode') ) {
        return { btnType: 'primary', label: 'Update Reaction' }
      } else if ( this.model.get('isReadyToActive') ) {
        return { btnType: 'success', label: 'Validate Reaction' }
      }
    }),

    actions: {
        save_reaction () {
            let this_ = this;
            let isNew = this.model.get('isNew');
            this.model.save().then(function() {
                if (isNew) {
                  this_.model.set('user', this_.get('currentUser').user)
                  let id = this_.model.get('id');
                  this_.get('target').transitionTo('/reactions/'+ id);
                }
                this_.getImage();
            });
        },
        runReaction() {
            let self = this;
            this.model.runReaction({smiles: this.reactants})
                .then(function(response) {
                let display = response.data.products.reduce(
                    function (disp, value, ind) {
                        if (ind === 0) {
                            return value;
                        } else {
                            return disp + '\n' +  value;
                        }
                    }, '')
                self.set('products',display);

            });
        },
    },
    getImage: function() {
        let self = this;
        self.set('image', '');
        if(this.model.get('is_reactor')) {
          this.model.getImage()
              .then(function(response) {
                  self.set('image', response.data.image);
              });
        }
    },

});
