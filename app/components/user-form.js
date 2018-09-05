import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({

  error:'',
  signupComplete: false,

  getFields: computed( function() {
    switch( this.get('formType') ) {
      case 'login':
        return this.logFields();
      case 'register':
        return this.infoFields().concat(this.logFields()).concat(this.confirmPasswordFields());
    }
  }),

  logFields:  function() {
    return [{
      controlType: "email",
      label: "Email",
      placeholder: "your@email.com",
      property: "email",
      value: '',
    },{
      controlType: "password",
      label: "Password",
      placeholder: "Password",
      property: "password",
      value: '',
    }]
  },

  infoFields:  function() {
    return [{
      controlType: "text",
      label: "User name",
      placeholder: "John Doe",
      property: "username",
      value: '',
    },{
      controlType: "text",
      label: "Organization",
      placeholder: "Organization",
      property: "organization",
      value: '',
    }];
  },

  confirmPasswordFields:  function() {
    return [{
      controlType: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      property: "confirm_password",
      value: '',
    }];
  },

  actions: {
    submitAction: function() {
      switch( this.get('formType') ) {
        case 'login':
          this.authenticate(this.model.getProperties('email', 'password'));
          break;
        case 'register':
          this.register();
          break;
      }
    }
  },

});
