package com.luxottica.cognitive.chat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Map;

/**
 * @author IBM
 * @version 1.0.0
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class ConversationContext implements Serializable{
	
	private static final long serialVersionUID = 6354245456500637183L;
	
	private Map<String,Object> context;
	
	private String inputText;

	public Map<String, Object> getContext() {
		return context;
	}

	public void setContext(Map<String, Object> context) {
		this.context = context;
	}

	public String getInputText() {
		return inputText;
	}

	public void setInputText(String inputText) {
		this.inputText = inputText;
	}
}