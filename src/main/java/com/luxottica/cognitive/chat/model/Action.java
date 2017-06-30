package com.luxottica.cognitive.chat.model;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "actions")
public class Action {
	
	private List<Intent> actions;

	@XmlElement(name = "action")
	public List<Intent> getActions() {
		return actions;
	}

	public void setActions(List<Intent> actions) {
		this.actions = actions;
	}    
}
