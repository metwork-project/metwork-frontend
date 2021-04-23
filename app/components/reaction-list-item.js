import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({



    isSelected: computed('triggerSelected', function() {
        let reactionIds = this.get('updatedReactionIds')
        if (reactionIds) {
            return reactionIds.includes(parseInt(this.get('reaction').id))
        } else {
            return null
        }

    }),

    isSelectable: computed('reaction.status', function() {
        let reactionIds = this.get('updatedReactionIds')
        return reactionIds && this.get('reaction').isActive
    }),


    actions: {
        toggleSlelect() {
            let reactionIds = this.get('updatedReactionIds')
            let reactionId = parseInt(this.get('reaction').id)
            if (this.get('isSelected')) {
                const index = reactionIds.indexOf(reactionId);
                if (index > -1) {
                    reactionIds.splice(index, 1);
                }
            } else {
                reactionIds.push(reactionId)
            }
            this.set("updatedReactionIds", reactionIds)
            this.set('triggerSelected', !this.get('triggerSelected'))
            this.set('hasChanges', true)
        }
    }
});
