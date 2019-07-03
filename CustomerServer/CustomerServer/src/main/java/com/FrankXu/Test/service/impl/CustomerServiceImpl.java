package com.FrankXu.Test.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FrankXu.Test.entities.Customer;
import com.FrankXu.Test.mapper.CustomerMapper;
import com.FrankXu.Test.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService{
	@Autowired
	CustomerMapper customerMapper;
	
	@Override
	public Customer insert(Customer user) {
		customerMapper.insert(user);
		return user;
		
	}

	@Override
	public void update(Customer user) {
		customerMapper.update(user);
		
	}

	@Override
	public void delete(String id) {
		customerMapper.delete(id);
		
	}

	@Override
	public Customer find(String id) {
		return customerMapper.find(id);
	}

	@Override
	public List<Customer> findall() {
		return customerMapper.findAll();
	}
	

	 @Override
	 public List<Customer> findAPage(int currPage, int pageSize) {

	        Map<String, Object> data = new HashMap<String,Object>();
	        data.put("currIndex", (currPage-1)*pageSize);
	        data.put("pageSize", pageSize);
	        return customerMapper.findAPage(data);
	    }

}
