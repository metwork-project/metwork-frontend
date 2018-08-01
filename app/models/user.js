import DS from 'ember-data';
const { attr } = DS;
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
  password: {
    validators: [
      validator('presence', true),
      validator('length', {min: 5}),
    ]
  },
}); 


export default DS.Model.extend(Validations, {
  password: attr('string'),
  email: attr('string'),
  username: attr('string'),
});
