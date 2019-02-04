import * as _ from 'lodash'


export  function validateInput(value:any) {
  let errors = {'Inventory': ''}
   
  if (value.length === 0) {
    errors.Inventory = 'Please Select Valid Inventory'
  }
  return {
    errors,
    isValid: errors.Inventory.length === 0 
  }
}