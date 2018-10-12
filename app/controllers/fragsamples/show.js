import Controller from '@ember/controller';

import NavTabsMixin from 'metwork-frontend/mixins/nav-tabs';

export default Controller.extend(
  NavTabsMixin, {

    activeNav: 'info',
    dataToDelete: false,

    init() {
        this._super(...arguments);
        this.navParams = [
          {toggle: 'info', libelle: 'Info'},
          {toggle: 'annotations', libelle: 'Annotations'},
          {toggle: 'network', libelle: 'Network'},
        ];
    },


});
