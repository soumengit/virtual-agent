package com.luxottica.cognitive.chat.model;


import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "action")
public class Intent {
	
    private String intent;
    private String templateName;
    private String impact;
    private String urgency;
    private String incidentType;
    private String operationalCat1;
    private String operationalCat2;
    private String productName;
    private String productCat1;
    private String productCat2;
    private String productCat3;
    private String name;
    private String type;
    private String automate;
    private String polling;
    private String no_rx_name;
    private String no_rx_type;
    private String resolved_name;
    private String resolved_type;
    private String stop_resolved_polling;
    private String override_queue;
    

	public String getOperationalCat2() {
		return operationalCat2;
	}
	public void setOperationalCat2(String operationalCat2) {
		this.operationalCat2 = operationalCat2;
	}
	@XmlElement(name="no-rx-name")
    public String getNo_rx_name() {
		return no_rx_name;
	}
	public void setNo_rx_name(String no_rx_name) {
		this.no_rx_name = no_rx_name;
	}
    @XmlElement(name="no-rx-type")
	public String getNo_rx_type() {
		return no_rx_type;
	}
	public void setNo_rx_type(String no_rx_type) {
		this.no_rx_type = no_rx_type;
	}
    @XmlElement(name="resolved-name")
	public String getResolved_name() {
		return resolved_name;
	}
	public void setResolved_name(String resolved_name) {
		this.resolved_name = resolved_name;
	}
    @XmlElement(name="resolved-type")
	public String getResolved_type() {
		return resolved_type;
	}
	public void setResolved_type(String resolved_type) {
		this.resolved_type = resolved_type;
	}
	@XmlElement(name="stop-resolved-polling")
	public String getStop_resolved_polling() {
		return stop_resolved_polling;
	}
	public void setStop_resolved_polling(String stop_resolved_polling) {
		this.stop_resolved_polling = stop_resolved_polling;
	}
	@XmlElement(name="override-queue")
	public String getOverride_queue() {
		return override_queue;
	}
	public void setOverride_queue(String override_queue) {
		this.override_queue = override_queue;
	}    
	public String getIntent() {
		return intent;
	}
	public void setIntent(String intent) {
		this.intent = intent;
	}
	public String getTemplateName() {
		return templateName;
	}
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	public String getImpact() {
		return impact;
	}
	public void setImpact(String impact) {
		this.impact = impact;
	}
	public String getUrgency() {
		return urgency;
	}
	public void setUrgency(String urgency) {
		this.urgency = urgency;
	}
	public String getIncidentType() {
		return incidentType;
	}
	public void setIncidentType(String incidentType) {
		this.incidentType = incidentType;
	}
	public String getOperationalCat1() {
		return operationalCat1;
	}
	public void setOperationalCat1(String operationalCat1) {
		this.operationalCat1 = operationalCat1;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductCat1() {
		return productCat1;
	}
	public void setProductCat1(String productCat1) {
		this.productCat1 = productCat1;
	}
	public String getProductCat2() {
		return productCat2;
	}
	public void setProductCat2(String productCat2) {
		this.productCat2 = productCat2;
	}
	public String getProductCat3() {
		return productCat3;
	}
	public void setProductCat3(String productCat3) {
		this.productCat3 = productCat3;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAutomate() {
		return automate;
	}
	public void setAutomate(String automate) {
		this.automate = automate;
	}
	public String getPolling() {
		return polling;
	}
	public void setPolling(String polling) {
		this.polling = polling;
	}
    
    
}
