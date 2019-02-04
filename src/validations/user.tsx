import * as _ from 'lodash'
import * as EmailValidator from 'email-validator'


export  function validateInput(data:any) {
  let errors = {'UserId': '', 'Name': '','ContactNumber':'' , 'Role': '' , 'MailId': ''}

  console.log('user validate input', data)

  if (data.UserId.length === 0) {
    errors.UserId = 'Please Provide a valid value'
  }
 
  if (!EmailValidator.validate(data.MailId)) {
    errors.MailId = 'Invalid Email'
  }

  if (data.Name.length === 0) {
    errors.Name = 'Please Provide a valid value'
  }
  if (data.ContactNumber.length === 0 ||  data.ContactNumber.length!= 10) {
    errors.ContactNumber = 'Please Provide a valid value'
  }
  if (data.Role.length === 0) {
    errors.Role = 'Please Provide a valid value'
  }

    return {
    errors,
    isValid: errors.UserId.length === 0 && errors.MailId.length === 0 &&  errors.Name.length === 0 && errors.ContactNumber.length === 0 
                 &&  errors.Role.length === 0
  }
}

