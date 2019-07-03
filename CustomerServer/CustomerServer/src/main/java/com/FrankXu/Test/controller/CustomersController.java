package com.FrankXu.Test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.FrankXu.Test.entities.Customer;
import com.FrankXu.Test.service.CustomerService;
import com.FrankXu.Test.entities.CustomerNote;
import com.FrankXu.Test.service.CustomerNoteService;

@RestController
@CrossOrigin
public class CustomersController {
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private CustomerNoteService customerNoteService;

	@RequestMapping(value = "/customer", method = RequestMethod.POST)
	public Customer insert(@RequestBody Customer customer) {
		return customerService.insert(customer);
	}
	
	@RequestMapping(value = "/customer/{id}", method = RequestMethod.GET)
	public Customer find(@PathVariable("id") String id) {
		Customer customer = customerService.find(id);
/*		if (customer == null) {
			throw new RuntimeException("ID=" + id + "invalid date");
		}*/
		return customer;
	}
	
	@RequestMapping(value = "/customer", method = RequestMethod.GET)
	public List<Customer> findall() {

		return customerService.findall();

	}
	@RequestMapping(value = "/customer", method = RequestMethod.PUT)
	public void update(@RequestBody Customer customer) {
		customerService.update(customer);
	}
	
	@RequestMapping(value = "/customer/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") String id) {
		customerService.delete(id);

	}
	
    @ResponseBody
    @RequestMapping(value = "/customer/{currPage}/{pageSize}", method = RequestMethod.GET)
    public List<Customer> findAPage(@PathVariable("currPage") int currPage, @PathVariable("pageSize") int pageSize) {
        List<Customer> customers = customerService.findAPage(currPage, pageSize);
        return customers;
    }
    
	@RequestMapping(value = "/customer/note", method = RequestMethod.POST)
	public CustomerNote insertNote(@RequestBody CustomerNote customernote) {
		return customerNoteService.insert(customernote);
		
	}

	@RequestMapping(value = "/customer/{id}/note", method = RequestMethod.GET)
	public List<CustomerNote> findNote(@PathVariable("id") String id) {
		return customerNoteService.find(id);

	}
	
	@RequestMapping(value = "/customer/note", method = RequestMethod.PUT)
	public void updateNote(@RequestBody CustomerNote customernote) {
		customerNoteService.update(customernote);
	}

}
