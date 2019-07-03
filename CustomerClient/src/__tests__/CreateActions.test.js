import { createAction } from '../actions/action';
describe('create function actions', () => {
  it('should create an action', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: 'store/customer/updateCustomers',
      payload:text
    }
    expect(createAction ('store/customer/updateCustomers')(text)).toEqual(expectedAction)
  })
})