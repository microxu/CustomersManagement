package com.FrankXu.Test.mapper;


import java.util.List;

import com.FrankXu.Test.entities.CustomerNote;

public interface CustomerNoteMapper {
    public void insert(CustomerNote note);

    public void update(CustomerNote note);
    
    public void delete(String id);
    
    public List<CustomerNote> find(String id);
    


}
