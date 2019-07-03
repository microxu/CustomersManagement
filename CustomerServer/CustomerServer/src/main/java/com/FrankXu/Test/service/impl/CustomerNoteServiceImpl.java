package com.FrankXu.Test.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FrankXu.Test.entities.CustomerNote;
import com.FrankXu.Test.mapper.CustomerNoteMapper;
import com.FrankXu.Test.service.CustomerNoteService;

@Service
public class CustomerNoteServiceImpl implements CustomerNoteService{

	@Autowired
	CustomerNoteMapper customerNoteMapper;

	@Override
	public CustomerNote insert(CustomerNote note) {
		customerNoteMapper.insert(note);
		return note;
	}

	@Override
	public void update(CustomerNote note) {
		customerNoteMapper.update(note);
	}

	@Override
	public void delete(String id) {
		customerNoteMapper.delete(id);
	}

	@Override
	public List<CustomerNote> find(String userId) {
		return customerNoteMapper.find(userId);
	}
	
}
