import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({

  error:'',
  signupComplete: false,

  getFields: computed( function() {
    let fields = {
      email: {
        controlType: "email",
        label: "Email",
        placeholder: "your@email.com",
        property: "email",
        value: '',
      },
      password: {
        controlType: "password",
        label: "Password",
        placeholder: "Password",
        property: "password",
        value: '',
      },
      username: {
        controlType: "text",
        label: "User name",
        placeholder: "John Doe",
        property: "username",
        value: '',
      },
      organization: {
        controlType: "text",
        label: "Organization",
        placeholder: "Organization",
        property: "organization",
        value: '',
      },
      confirmPassword: {
        controlType: "password",
        label: "Confirm Password",
        placeholder: "Confirm Password",
        property: "confirm_password",
        value: '',
      }
    };

    switch( this.get('formType') ) {
      case 'login':
        return [fields.email, fields.password];
      case 'register':
        return [fields.email, fields.username, fields.organization, fields.password, fields.confirmPassword];
      case 'info':
        return [fields.email, fields.username, fields.organization];
      case 'changePassword':
        return [fields.password, fields.confirmPassword];
    }
  }),

  actions: {
    submitAction: function() {
      switch( this.get('formType') ) {
        case 'login':
          this.authenticate(this.model.getProperties('email', 'password'));
          break;
        case 'register':
          this.register();
          break;
        case 'info':
          this.model.save();
          break;
        case 'changePassword':
          this.model.changePassword(this.model.getProperties('password'));
          break;
      }
    }
  },

});