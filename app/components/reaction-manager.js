import ItemsManager from 'metwork-frontend/components/items-manager';
import { reactionStatus } from '../models/reaction'

export default ItemsManager.extend(
    {
        availableStatus: [10, 20, 30, 40],
        text: null,
        my: false,
        user: null,
        dataLabel: 'reaction',
        itemIdsLabel: "reaction_ids",


        getItemStatus() {
            return reactionStatus
        },

        getFilter() {
            return {
                text: this.get('text'),
                status: this.get("status"),
                my: this.get('my'),
                user: this.get('user'),
                project_id: this.get('project_id'),
                selected: this.get('selected')
            }
        },



    });
