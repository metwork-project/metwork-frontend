import Controller from '@ember/controller';
import NavTabsMixin from 'metwork-frontend/mixins/nav-tabs';

export default Controller.extend(
  NavTabsMixin, {

  activeNav: 'info',

  didReceiveAttrs: function() {
      this.activeNav = 'info';
  },

  init() {
      this._super(...arguments);
      this.navParams = [
          {toggle: 'info', libelle: 'Info'},
          {toggle: 'data', libelle: 'Data', display:'saved'},
          {toggle: 'metabolization', libelle: 'Metabolization', display:'saved'},
          {toggle: 'fragmentation', libelle: 'Fragmentation', display:'saved'},
      ];
  },

});
