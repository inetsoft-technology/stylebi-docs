/*
 * Copyright (c) 2018, InetSoft Technology Corp, All Rights Reserved.
 *
 * The software and information contained herein are copyrighted and
 * proprietary to InetSoft Technology Corp. This software is furnished
 * pursuant to a written license agreement and may be used, copied,
 * transmitted, and stored only in accordance with the terms of such
 * license and with the inclusion of the above copyright notice. Please
 * refer to the file "COPYRIGHT" for further copyright and licensing
 * information. This software and information or any other copies
 * thereof may not be provided or otherwise made available to any other
 * person.
 */
package inetsoft.test.core;

import inetsoft.web.messaging.MessageAttributes;
import inetsoft.web.messaging.MessageContextHolder;
import inetsoft.web.viewsheet.service.CommandDispatcher;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;

import java.security.Principal;
import java.util.function.*;

public abstract class MockMessageResource {
   public String getRuntimeId() {
      return null;
   }

   public Principal getUser() {
      return headerAccessor == null ? null : headerAccessor.getUser();
   }

   public SimpMessagingTemplate getMessagingTemplate() {
      return messagingTemplate;
   }

   public StompHeaderAccessor getHeaderAccessor() {
      return headerAccessor;
   }

   public CommandDispatcher getCommandDispatcher() {
      return commandDispatcher;
   }

   protected <T, R> R mockMessage(Principal principal, T t, Function<T, R> action) {
      GenericMessage<String> message = new GenericMessage<>("test");
      MessageAttributes messageAttributes = new MessageAttributes(message);

      if(getRuntimeId() != null) {
         messageAttributes.setAttribute("sheetRuntimeId", getRuntimeId());
      }

      headerAccessor = messageAttributes.getHeaderAccessor();
      headerAccessor.setUser(principal);
      messagingTemplate = new SimpMessagingTemplate(new MessageChannel() {
         @Override
         public boolean send(Message<?> message) {
            return true;
         }

         @Override
         public boolean send(Message<?> message, long timeout) {
            return true;
         }
      });
      commandDispatcher = new CommandDispatcher(headerAccessor, messagingTemplate, null);
      MessageContextHolder.setMessageAttributes(messageAttributes);

      try {
         return action.apply(t);
      }
      finally {
         commandDispatcher = null;
         headerAccessor = null;
         messagingTemplate = null;
         MessageContextHolder.setMessageAttributes(null);
      }
   }

   protected <T> T mockMessage(Supplier<T> action) {
      return mockMessage(null, "", (Function<String, T>) ignore -> action.get());
   }

   protected <T> void mockMessage(T t, Consumer<T> action) {
      mockMessage(null, t, param -> {
         action.accept(param);
         return null;
      });
   }

   protected void mockMessage(Runnable action) {
      mockMessage(null,"", (Function<String, Void>) ignore -> {
         action.run();
         return null;
      });
   }

   private SimpMessagingTemplate messagingTemplate;
   private StompHeaderAccessor headerAccessor;
   private CommandDispatcher commandDispatcher;
}
