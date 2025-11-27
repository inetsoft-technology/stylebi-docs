package inetsoft.test.core;

import inetsoft.report.composition.ChangedAssemblyList;
import inetsoft.report.composition.RuntimeViewsheet;
import inetsoft.report.io.csv.CSVConfig;
import inetsoft.sree.security.SRPrincipal;
import inetsoft.web.messaging.MessageAttributes;
import inetsoft.web.viewsheet.command.ViewsheetCommand;
import inetsoft.web.viewsheet.event.OpenViewsheetEvent;
import inetsoft.web.viewsheet.service.CommandDispatcher;
import inetsoft.web.viewsheet.service.ExportResponse;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;

import java.security.Principal;

public class RuntimeViewsheetResource extends MockMessageResource {
   public RuntimeViewsheetResource(OpenViewsheetEvent openViewsheetEvent,
                                    ControllersResource controllersResource){
      this.openViewsheetEvent = openViewsheetEvent;
      this.controllersResource = controllersResource;
   }

   public String getRuntimeId() {
      return runtimeId;
   }

   public void initRuntimeVS(Principal principal) {
      runtimeId = mockMessage(principal, openViewsheetEvent, this::openViewsheet);
   }

   private String openViewsheet(OpenViewsheetEvent openViewsheetEvent) {
      try {
         controllersResource.getOpenViewsheetController().openViewsheet(
               openViewsheetEvent, getHeaderAccessor().getUser(), getCommandDispatcher(),
               "http://localhost:8080/sree");
      }
      catch(RuntimeException e) {
         throw e;
      }
      catch(Exception e) {
         throw new RuntimeException("Failed to open viewsheet", e);
      }
      return controllersResource.getRuntimeId();
   }

   public RuntimeViewsheet getRuntimeViewsheet(Principal principal) {
      try {
         return runtimeId == null ?
               null : controllersResource.getViewsheetService().getViewsheet(runtimeId, principal);
      }
      catch(RuntimeException e ) {
         throw e;
      }
      catch(Exception e) {
         throw new RuntimeException("Failed to get runtime viewsheet", e);
      }
   }

   public void exportVS(int format, boolean mactch, boolean expandSelections, boolean current,
                        boolean previewPrintLayout, boolean print, String[] bookmarks,
                        boolean embedded, boolean onlyDataComponents, CSVConfig csvConfig, ExportResponse response, SRPrincipal principal) throws Exception {
      runtimeViewsheet = getRuntimeViewsheet(principal);
      try {
         controllersResource.getVSExportService().exportViewsheet(runtimeViewsheet, format, mactch,
            expandSelections, current, previewPrintLayout, print, bookmarks, embedded, onlyDataComponents, csvConfig, response, principal);
      }
      catch (RuntimeException e) {
         throw e;
      }
      catch (Exception e) {
         throw new RuntimeException("Failed to export viewsheet", e);
      }
   }

   public void refreshViewsheet(SRPrincipal principal) {
      runtimeViewsheet = getRuntimeViewsheet(principal);
      CommandDispatcher commandDispatcher = createCommandDispather();
      try {
         controllersResource.getCoreLifecycleService().refreshViewsheet(runtimeViewsheet, runtimeId, null,
            commandDispatcher, true, true, true, new ChangedAssemblyList(true));
      } catch (Exception e) {
         e.printStackTrace();
      }
   }

   private CommandDispatcher createCommandDispather() {
      GenericMessage<String> message = new GenericMessage<>("simulated");
      MessageAttributes messageAttributes = new MessageAttributes(message);
      StompHeaderAccessor headerAccessor = messageAttributes.getHeaderAccessor();
      headerAccessor.setUser(null);
      SimpMessagingTemplate messagingTemplate = new SimpMessagingTemplate(new MessageChannel() {
         @Override
         public boolean send(Message<?> message) {
            return true;
         }

         @Override
         public boolean send(Message<?> message, long timeout) {
            return true;
         }
      });

      CommandDispatcher dispatcher = new CommandDispatcher(headerAccessor, messagingTemplate, null)
      {
         @Override
         public void sendCommand(String assemblyName, ViewsheetCommand command) {
            // NO-OP
         }

         @Override
         public void flush() {
            // NO-OP
         }

         @Override
         public CommandDispatcher detach() {
            return createCommandDispather();
         }
      };
      return dispatcher;
   }

   private final OpenViewsheetEvent openViewsheetEvent;
   private final ControllersResource controllersResource;
   private RuntimeViewsheet runtimeViewsheet;
   private String runtimeId;
   private CommandDispatcher commandDispatcher = createCommandDispather();
}
