import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: {
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },
  username: {
    validators: [
      validator('presence', true),
    ]
  },
  organization: {
    validators: [
      validator('presence', true),
    ]
  },
  password: {
    validators: [
      validator('presence', true),
      validator('length', {min: 5}),
    ]
  },
  confirm_password: [
    validator('presence', true),
    validator('confirmation', {
      on: 'password',
      message: '{description} do not match',
      description: 'Password'
    })
  ]
});

export default DS.Model.extend(Validations, {

});
