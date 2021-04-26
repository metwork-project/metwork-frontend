import ItemsIndexMenu from 'metwork-frontend/components/items-index-menu';
import { reactionStatus } from '../models/reaction'


export default ItemsIndexMenu.extend({

    inputText: null,
    inputMy: false,
    inputUser: null,

    setCustomFileds() {
        this.set('inputText', this.get('text'))
        this.set('inputMy', this.get('my'))
        this.set('inputUser', this.get('user'))
        this.set('availableStatus', [10, 20, 30, 40])
    },

    getItemStatus() {
        return reactionStatus
    },

    updateCustomFilter() {
        this.set("text", this.get('inputText'))
        let my = this.get('inputMy')
        this.set("my", my)
        if (!my) {
            this.set("user", this.get('inputUser'))
        }
    },

});
