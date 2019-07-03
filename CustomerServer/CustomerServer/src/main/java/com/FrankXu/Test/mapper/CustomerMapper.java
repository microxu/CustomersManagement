package com.FrankXu.Test.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.FrankXu.Test.entities.Customer;

@Mapper
public interface  CustomerMapper {
    public void insert(Customer user);

    public void update(Customer user);
    
    public void delete(String id);
    
    public Customer find(String id);
    
    public List<Customer> findAll();
    
    List<Customer> findAPage(Map<String,Object> data);

}
