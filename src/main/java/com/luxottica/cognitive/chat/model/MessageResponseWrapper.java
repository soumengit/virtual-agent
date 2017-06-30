package com.luxottica.cognitive.chat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

/**
 * @author IBM
 * @version 1.0.0
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageResponseWrapper implements Serializable {

	
	private static final long serialVersionUID = 5254262087570434056L;
	
	public MessageResponseWrapper(){
		
	}
	private String messageResponse;

	public String getMessageResponse() {
		return messageResponse;
	}

	public void setMessageResponse(String messageResponse) {
		this.messageResponse = messageResponse;
	}
	

}