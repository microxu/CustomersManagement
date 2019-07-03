import { customersReducer } from '../reducers/customers'
//import * as actions from '../actions/customer';
const getCustomers = [
  {
    id: '962c067f-8bd7-4945-883d-42ef9fcd1534',
    userStatus: 'notcurrent',
    userName: 'Customer A',
    gender: 'F',
    age: 20,
    phoneNumber: '0812345678',
    createDate: new Date().toISOString()
  }
]
const orgcustomer = {
  '962c067f-8bd7-4945-883d-42ef9fcd1534': {
    id: '962c067f-8bd7-4945-883d-42ef9fcd1534',
    userStatus: 'current',
    userName: 'Customer A',
    gender: 'M',
    age: 60,
    phoneNumber: '0812345678',
    createDate: new Date().toISOString()
  }
}
const oneCustomer =
  {
    id: '962c067f-8bd7-4945-883d-42ef9fcd1534',
    userStatus: 'notcurrent',
    userName: 'Customer A',
    gender: 'F',
    age: 20,
    phoneNumber: '0812345678',
    createDate: new Date().toISOString()
  }
const lastoneCustomer = {
  '962c067f-8bd7-4945-883d-42ef9fcd1534':
  {
    id: '962c067f-8bd7-4945-883d-42ef9fcd1534',
    userStatus: 'notcurrent',
    userName: 'Customer A',
    gender: 'F',
    age: 20,
    phoneNumber: '0812345678',
    createDate: new Date().toISOString()
  }
}

describe('customers reducer', () => {

  it('should update a customer', () => {
    expect(
      customersReducer(orgcustomer, {
          type: 'store/customer/updateCustomer',
          payload: oneCustomer
        }
      )
    ).toEqual(lastoneCustomer)

    expect(
      customersReducer([], {
        type: 'store/customer/updateCustomers',
        payload:getCustomers})
    ).toEqual(lastoneCustomer)

  })
})

