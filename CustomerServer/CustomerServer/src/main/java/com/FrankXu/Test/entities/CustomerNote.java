package com.FrankXu.Test.entities;

import java.io.Serializable;

public class CustomerNote implements Serializable {
	private static final long serialVersionUID = 2L;
	private long id;
    private String userId;
    private String note;
    public CustomerNote(){}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}

}
