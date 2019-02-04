import * as _ from 'lodash'


export  function validateInput(data:any, dashBoardData: any) {
  let errors = {'Inventory': '', 'StartDate': '','EndDate':'' , 'Reason': '' , 'Pending': false}
console.log('dashBoardData', dashBoardData)
   
  if (data.Inventory.length === 0) {
    errors.Inventory = 'Please Select Valid Inventory'
  }
 
  if (data.StartDate === null) {
    errors.StartDate = 'Please Select Valid Start Date'
  }
 
  if (data.EndDate === null) {
    errors.EndDate = 'Please Select Valid End Date'
  }
 
  if (data.Reason.length === 0) {
    errors.Reason = 'Please provide reason'
  }

  if(dashBoardData && dashBoardData != undefined && dashBoardData.data.laptopRequest!=undefined  && _.size(dashBoardData.data.laptopRequest)> 0){
   console.log('in lap pedning')
    errors.Pending = true
  }

  if(dashBoardData && dashBoardData != undefined && dashBoardData.data.laptopRequest!=undefined && _.size(dashBoardData.data.datacardRequest)> 0){
    console.log('in data pedning')
    errors.Pending = true
  }

  return {
    errors,
    isValid: errors.Inventory.length === 0 && errors.StartDate.length === 0 && errors.EndDate.length === 0
  }
}



export  function validatePendingRequests(dashBoardData: any, inventoryType: string) {
  let errors = {'Pending': false, 'message': ''}
console.log('validatePendingRequests', dashBoardData, inventoryType)
   
  if(inventoryType === 'Laptop'){
    console.log('validatePendingRequests laptop')

    if(_.size(dashBoardData.data.laptopRequest)> 0){
 
      errors.Pending = true
      errors.message = 'There is already Laptop Pending Request'
    }

  }else if(inventoryType === 'DataCard'){
     
    console.log('validatePendingRequests DataCard')


    if(_.size(dashBoardData.data.datacardRequest)> 0){
 
      errors.Pending = true
      errors.message = 'There is already Datacard Pending Request'
    }

  }
  else if(inventoryType === 'Both'){
 
    console.log('validatePendingRequests both')


    if(_.size(dashBoardData.data.datacardRequest)> 0 || _.size(dashBoardData.data.laptopRequest)> 0 ){
 
      errors.Pending = true
      errors.message = 'There is already Laptop/Datacard Pending Request'

    }


  }

  
  else {
    console.log('validatePendingRequests else')


    errors.Pending = true
  }
  
 console.log('validatePendingRequests ', errors, errors.Pending)

  return {
    errors,
    isPending: errors.Pending == true
  }
}