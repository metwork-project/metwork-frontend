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
  name: {
    validators: [
      validator('presence', true),
    ]
  },
  organization: {
    validators: [
      validator('presence', true),
    ]
  },

});

export default DS.Model.extend(Validations, {

});
