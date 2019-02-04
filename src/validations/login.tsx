
import * as EmailValidator from 'email-validator'
import { LOGINFORMPASSWORD} from '../common/constants/form.const'

export default function validateInput(data:any) {
  let errors = {'email':'', 'password':''}

  
  if (!EmailValidator.validate(data.Email)) {
    errors.email = 'Invalid Email'
  }
 
  if (!data.Password.match(LOGINFORMPASSWORD)) {
    errors.password = 'Password should be minimum 8 letters with alphaNumeric'
  }
  

  return {
    errors,
    isValid: errors.email.length === 0 && errors.password.length === 0
  }
}