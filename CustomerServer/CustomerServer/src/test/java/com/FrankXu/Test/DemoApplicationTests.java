package com.FrankXu.Test;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import org.springframework.http.MediaType;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

	@Autowired
	private WebApplicationContext wac;

	private MockMvc mockMvc;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}
	@Test
	public void whenGetInfoSuccess() throws Exception {
		String result = mockMvc.perform( get("/customer/1ed5256e-a35a-4b27-b6cb-a60c57655f2e")
				.contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.userName").value("Frank"))
				.andReturn().getResponse().getContentAsString();
		
		System.out.println("return is Json----"+ result);
	}
	@Test
	public void whenDeleteFail() throws Exception {	

		String result = mockMvc.perform( delete("/customer/1ed5256e-a35a-4b27-b6cb-a60c57655f2e")
				.contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		
		System.out.println("return is nothing----"+result);
		
	
	}
	@Test
	public void whenCreateFail() throws Exception {		
		Date date = new Date();
		System.out.println(date.getTime());
		String content = "{\"id\":\"1ed5256e-a35a-4b27-b6cb-a60c57655f2e\",\"userStatus\":null,"
				+ "\"userName\":\"XU\",\"gender\":\"M\",\"age\":21,\"phoneNumber\":\"123\","
				+ "\"createDate\":"+date.getTime()+"}";
		String reuslt = mockMvc.perform(post("/customer").contentType(MediaType.APPLICATION_JSON)
				.content(content))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		System.out.println("return is json----"+reuslt);		
	
	}
	@Test
	public void whenFindAPageFail() throws Exception {		

		String result = mockMvc.perform( get("/customer/1/8")
				.contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		System.out.println("return is json----"+result);
		
	
	}
	@Test
	public void whenUpdateFail() throws Exception {		
		Date date = new Date();
		System.out.println(date.getTime());
		String content = "{\"id\":\"1ed5256e-a35a-4b27-b6cb-a60c57655f2e\",\"userStatus\":\"prospective\","
				+ "\"userName\":\"XUmutian\",\"gender\":\"M\",\"age\":21,\"phoneNumber\":\"123\","
				+ "\"createDate\":"+date.getTime()+"}";
		String reuslt = mockMvc.perform(put("/customer").contentType(MediaType.APPLICATION_JSON)
				.content(content))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		System.out.println("return is nothing----"+reuslt);
		
	}
	@Test
	public void whenNoteCreateFail() throws Exception {
		
		Date date = new Date();

		System.out.println(date.getTime());

		String content = "{\"userId\":\"NNN5458e-a35a-4d28-b6cb-a60c57655f2e\",\"note\":\"I love xumutian\"}";
		String reuslt = mockMvc.perform(post("/customer/note").contentType(MediaType.APPLICATION_JSON)
				.content(content))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		System.out.println("return is json----"+reuslt);
	
	}
	@Test
	public void whenGetNoteInfoSuccess() throws Exception {
		String result = mockMvc.perform( get("/customer/NNN5458e-a35a-4d28-b6cb-a60c57655f2e/note")
				.contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		
		System.out.println("return is json----"+ result);
	}
	@Test
	public void whenNoteUpdateFail() throws Exception {
		
		Date date = new Date();

		System.out.println(date.getTime());

		String content = "{\"id\":\"4\",\"userId\":\"NNN5458e-a35a-4d28-b6cb-a60c57655f2e\",\"note\":\"nancy\"}";
		String reuslt = mockMvc.perform(put("/customer/note").contentType(MediaType.APPLICATION_JSON)
				.content(content))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		System.out.println("return is nothing----"+reuslt);
	
	}
}
