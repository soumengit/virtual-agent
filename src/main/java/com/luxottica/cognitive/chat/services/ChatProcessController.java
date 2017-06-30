package com.luxottica.cognitive.chat.services;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
        import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
        import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;
        import org.springframework.web.bind.annotation.CrossOrigin;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PathVariable;
        import org.springframework.web.bind.annotation.RestController;
        import java.util.Map;

/**
 * @author IBM
 * @version 1.0.0
 */
@CrossOrigin(maxAge = 6000)
@RestController
public class ChatProcessController {

    public static Map<String, Object> context=null;
    public static ConversationService service=null;

    @GetMapping("/processRequest/{val}")
    public MessageResponse rest(@PathVariable String val){

        if (service == null){
            createConnection();
            // populateContext(val);

        }
        MessageRequest newMessage = new MessageRequest.Builder().context(context).inputText(val).build();
        MessageResponse response = service.message("c4d5335b-354f-412c-8a6c-8619b2592a1f", newMessage).execute();
        context=response.getContext();

        System.out.println(response);
        return response;
    }

    public static ConversationService createConnection(){
        service = new ConversationService(ConversationService.VERSION_DATE_2016_07_11);
        service.setUsernameAndPassword("a9fc724c-1df5-46bb-a8e7-bcc1346c1a03", "c24QqE01Junu");
        return service;

    }

}