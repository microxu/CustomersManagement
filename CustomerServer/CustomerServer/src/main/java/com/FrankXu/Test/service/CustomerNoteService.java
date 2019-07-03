package com.FrankXu.Test.service;

import java.util.List;

import com.FrankXu.Test.entities.CustomerNote;

public interface CustomerNoteService {

	
    public CustomerNote insert(CustomerNote note);

    public void update(CustomerNote note);
    
    public void delete(String id);
    
    public List<CustomerNote> find(String userId);
    


}
