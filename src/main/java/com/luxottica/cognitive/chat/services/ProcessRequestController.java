package com.luxottica.cognitive.chat.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;
import com.luxottica.cognitive.chat.model.ConversationContext;
import com.luxottica.cognitive.chat.model.MessageResponseWrapper;


/**
 * @author IBM
 * @version 1.0.0
 */
@CrossOrigin(maxAge = 6000)
@RefreshScope
@RestController
@RequestMapping("conversation/v1/")
public class ProcessRequestController {


    @Value("${WorkspaceId}")
    private String workspaceId;
    
    @Value("${WscUserName}")
    private String username;
    
    @Value("${WcsPassword}")
    private String password;
    
    public static ConversationService service = null;
    
    //public static final String WORKSPACE_ID = "ef346869-e09a-45c8-a9b5-6e94927ca1bd";
    //public static final String WORKSPACE_ID = "21f8f5c4-898e-4131-a385-052745fbfa1a";
    //public static final String USER_NAME = "6787d5ab-abd1-4ebe-ac6d-6310b0e80a65";
    //public static final String PASSWORD = "SUR7GCH5QbTD";

    //public static final String WCS_REST_SERVICE_URI = "https://localhost:8443/callWCS/v1/invoke";

    @RequestMapping(value = "processConversation",
            method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public MessageResponse processRequest(@RequestBody ConversationContext context) {

        MessageRequest request = buildMessageRequest(context);
        MessageResponse response = null;
        if (request != null) {
            response = callWCS(request);

        }
        return response;
    }

    private MessageRequest buildMessageRequest(ConversationContext conversationContext) {

        MessageRequest request = null;

        Object chatTrace = null;
        Map<String, Object> context = null;
        String inputText = "";
        if (null != conversationContext) {
            inputText = conversationContext.getInputText() == null ? "" : conversationContext.getInputText();
            context = conversationContext.getContext();
        }

        if (null != context) {
            // Create a new request without the chat trace
            chatTrace = context.get("chatTrace");
            System.out.println(chatTrace);
            context.remove("chatTrace");
        }
        System.out.println("inputText = " + inputText);
        request = new MessageRequest.Builder().context(context).inputText(inputText).build();
        if (chatTrace != null) {
            context.put("chatTrace", chatTrace);
        }
        return request;
    }

    private MessageResponse callWCS(MessageRequest request) {

        MessageResponse response = null;

        //add logic
        /*RestTemplate restTemplate = new RestTemplate();

        String jsonString = new Gson().toJson(request, MessageRequest.class);
        System.out.println("request jsonString=\n"+jsonString);
        MessageRequestWrapper wrapper = new MessageRequestWrapper();
        wrapper.setMessageRequest(jsonString);*/

        // TODO: 4/25/17   will invoke this piece of code when call WCS is deployed as a separate service.
        /*MessageResponseWrapper responseWrapper = restTemplate.postForObject(WCS_REST_SERVICE_URI, wrapper, MessageResponseWrapper.class);
        if(null != responseWrapper){
        	response = GsonSingleton.getGson().fromJson(responseWrapper.getMessageResponse(), MessageResponse.class);
    	} */

        //  System.out.println("WCS response="+response);

        return callWCSAPI(request);
    }

    private MessageResponse callWCSAPI(MessageRequest messageRequest) {
        System.out.println("Enter into callWCS()...");
        // make the call to WCS
        MessageResponseWrapper responseWrapper = new MessageResponseWrapper();
        ;

        // make the call to WCS refer to Demo Controller
        if (service == null) {
            createConnection();
            // load xml data to local cache
            //   processMappingData.loadMappingData();
        }

        // call WCS service
        MessageResponse response = service.message(workspaceId, messageRequest).execute();
        responseWrapper.setMessageResponse(new Gson().toJson(response, MessageResponse.class));
        System.out.println("Exit from callWCS()...");
        System.out.println(response);
        return response;

    }

    public ConversationService createConnection() {
        service = new ConversationService(ConversationService.VERSION_DATE_2016_07_11);
        service.setUsernameAndPassword(username, password);
        return service;

    }
}


