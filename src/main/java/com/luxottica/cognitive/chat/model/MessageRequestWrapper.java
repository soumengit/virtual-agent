package com.luxottica.cognitive.chat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

/**
 * @author IBM
 * @version 1.0.0
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageRequestWrapper implements Serializable{
	
	private static final long serialVersionUID = -7659783414274836732L;
	
	public MessageRequestWrapper(){
		
	}
	private String messageRequest;

	public String getMessageRequest() {
		return messageRequest;
	}

	public void setMessageRequest(String messageRequest) {
		this.messageRequest = messageRequest;
	}

}
