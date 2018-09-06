import DS from 'ember-data';
const { attr } = DS;
import { validator, buildValidations } from 'ember-cp-validations';
import { not } from '@ember/object/computed';
import {memberAction/*, collectionAction*/} from 'ember-api-actions';

const Validations = buildValidations({
  email: {
    disabled: not('model.checkEmail'),
    validators: [
      validator('presence', true),
      validator('format', {
        type: 'email'
      })
    ]
  },
  username: {
    disabled: not('model.checkUsername'),
    validators: [
      validator('presence', true),
      validator('length', {min: 3}),
    ]
  },
  organization: {
    disabled: not('model.checkOrganization'),
    validators: [
      validator('presence', true),
      validator('length', {min: 3}),
    ]
  },
  password: {
    disabled: not('model.checkPassword'),
    validators: [
      validator('presence', true),
      validator('length', {min: 5}),
    ]
  },
  confirm_password: {
    disabled: not('model.checkConfirmPassword'),
    validators: [
      validator('presence', true),
      validator('confirmation', {
        on: 'password',
        message: '{description} do not match',
        description: 'Password'
      })
    ]
  }
});

export default DS.Model.extend(Validations, {
  password: attr('string'),
  email: attr('string'),
  username: attr('string'),
  organization: attr('string'),

  changePassword: memberAction({
			path: 'change_password',
			type: 'patch' }),

});
