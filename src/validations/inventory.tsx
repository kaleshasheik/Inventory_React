import * as _ from 'lodash'


export  function validateInput(data:any) {
  let errors = {'InventoryType': '', 'Model': '','SerialNo':'' , 'SIM': '' }

  console.log('user validate input', data)

  if (data.InventoryType.length === 0) {
    errors.InventoryType = 'Please Provide a valid value'
  }
 

  if (data.Model.length === 0) {
    errors.Model = 'Please Provide a valid value'
  }
  if (data.SerialNo.length === 0) {
    errors.SerialNo = 'Please Provide a valid value'
  }
  if (data.InventoryType === 'DataCard' && data.SIM.length === 0) {
    errors.SIM = 'Please Provide a valid value'
  }

    return {
    errors,
    isValid: errors.InventoryType.length === 0 && errors.Model.length === 0 &&  errors.SerialNo.length === 0 && errors.SIM.length === 0 
                
  }
}

