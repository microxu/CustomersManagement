package com.FrankXu.Test.service;

import java.util.List;

import com.FrankXu.Test.entities.Customer;

public interface CustomerService {
	
    public Customer insert(Customer user);

    public void update(Customer user);
    
    public void delete(String id);
    
    public Customer find(String id);
    
    public List<Customer> findall();
    
    public List<Customer> findAPage(int currPage, int pageSize);

}
