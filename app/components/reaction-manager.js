import ItemsManager from 'metwork-frontend/components/items-manager';
import { reactionStatus } from '../models/reaction'

export default ItemsManager.extend(
    {
        availableStatus: [10, 20, 30],
        dataLabel: 'reaction',
        itemIdsLabel: "reaction_ids",


        getItemStatus() {
            return reactionStatus
        },

    });
