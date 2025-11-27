package inetsoft.test.core;

import inetsoft.analytic.composition.ViewsheetEngine;
import inetsoft.analytic.composition.ViewsheetService;
import inetsoft.enterprise.web.api.file.FileApiService;
import inetsoft.report.composition.WorksheetEngine;
import inetsoft.report.composition.WorksheetService;
import inetsoft.sree.internal.SUtil;
import inetsoft.sree.schedule.ScheduleManager;
import inetsoft.sree.security.SecurityEngine;
import inetsoft.sree.security.SecurityProvider;
import inetsoft.uql.XFactory;
import inetsoft.uql.asset.AssetRepository;
import inetsoft.web.admin.content.repository.ContentRepositoryTreeService;
import inetsoft.web.admin.content.repository.RepletRegistryManager;
import inetsoft.web.admin.content.repository.ResourcePermissionService;
import inetsoft.web.admin.deploy.DeployService;
import inetsoft.web.admin.schedule.ScheduleTaskFolderService;
import inetsoft.web.binding.drm.*;
import inetsoft.web.binding.model.*;
import inetsoft.web.binding.service.*;
import inetsoft.web.composer.vs.VSObjectTreeService;
import inetsoft.web.composer.vs.controller.VSLayoutService;
import inetsoft.web.service.LicenseService;
import inetsoft.web.viewsheet.controller.OpenViewsheetController;
import inetsoft.web.viewsheet.model.*;
import inetsoft.web.viewsheet.model.annotation.VSAnnotationModel;
import inetsoft.web.viewsheet.model.calendar.VSCalendarModel;
import inetsoft.web.viewsheet.model.chart.VSChartModel;
import inetsoft.web.viewsheet.model.table.VSCalcTableModel;
import inetsoft.web.viewsheet.model.table.VSCrosstabModel;
import inetsoft.web.viewsheet.model.table.VSEmbeddedTableModel;
import inetsoft.web.viewsheet.model.table.VSTableModel;
import inetsoft.web.viewsheet.service.*;

import java.rmi.RemoteException;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import org.mockito.Mockito;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class ControllersResource extends MockMessageResource {

   public void initControllers() {
      mockMessage(this::createControllers);
   }

   public void destroy() {
      viewsheetService = null;
      vsLifecycleService = null;
      runtimeViewsheetManager = null;
      objectModelFactoryService = null;
      objectTreeService = null;
      securityEngine = null;
      objectService = null;
      bookmarkService = null;
      dataRefModelFactoryService = null;
      assetRepository = null;
      openViewsheetController = null;
      worksheetService = null;
   }

   private void createControllers() {
      viewsheetService = ViewsheetEngine.getViewsheetEngine();
      worksheetService = WorksheetEngine.getWorksheetService();

      runtimeViewsheetRef = new RuntimeViewsheetRef(viewsheetService) {
         @Override
         public String getRuntimeId() {
            return ControllersResource.this.runtimeId;
         }

         @Override
         public void setRuntimeId(String runtimeId) {
            ControllersResource.this.runtimeId = runtimeId;
         }
      };

      runtimeViewsheetManager = new RuntimeViewsheetManager(viewsheetService, worksheetService);
      List<VSObjectModelFactory<?, ?>> modelFactories = Arrays.asList(
            new VSCalcTableModel.VSCalcTableModelFactory(),
            new VSCheckBoxModel.VSCheckBoxModelFactory(),
            new VSComboBoxModel.VSComboBoxModelFactory(),
            new VSCylinderModel.VSCylinderModelFactory(),
            new VSEmbeddedTableModel.VSEmbeddedTableModelFactory(),
            new VSGaugeModel.VSGaugeModelFactory(),
            new VSImageModel.VSImageModelFactory(),
            new VSLineModel.VSLineModelFactory(),
            new VSOvalModel.VSOvalModelFactory(),
            new VSRadioButtonModel.VSRadioButtonModelFactory(),
            new VSRangeSliderModel.VSRangeSliderModelFactory(),
            new VSRectangleModel.VSRectangleModelFactory(),
            new VSSelectionContainerModel.VSSelectionContainerModelFactory(),
            new VSSelectionListModel.VSSelectionListModelFactory(),
            new VSSelectionTreeModel.VSSelectionTreeModelFactory(),
            new VSSliderModel.VSSliderModelFactory(),
            new VSSlidingScaleModel.VSThermometerModelFactory(),
            new VSSpinnerModel.VSSpinnerModelFactory(),
            new VSSubmitModel.VSSubmitModelFactory(),
            new VSTableModel.VSTableModelFactory(),
            new VSCrosstabModel.VSCrosstabModelFactory(),
            new VSTextInputModel.VSTextInputModelFactory(),
            new VSTextModel.VSTextModelFactory(),
            new VSThermometerModel.VSThermometerModelFactory(),
            new VSViewsheetModel.VSViewsheetModelFactory(),
            new VSAnnotationModel.VSAnnotationModelFactory(),
            new VSCalendarModel.VSCalendarModelFactory(),
            new VSChartModel.VSChartModelFactory(),
            new VSGroupContainerModel.VSGaugeModelFactory(),
            new VSTabModel.VSTabModelFactory()
      );
      objectModelFactoryService = new VSObjectModelFactoryService(modelFactories);
      assetRepository = (AssetRepository) SUtil.getRepletRepository();
      objectTreeService = new VSObjectTreeService(objectModelFactoryService);
      securityEngine = SecurityEngine.getSecurity();

      VSLayoutService vsLayoutService = new VSLayoutService(objectModelFactoryService);
      VSCompositionService vsCompositionService = Mockito.mock(VSCompositionService.class);
      ParameterService parameterService = new ParameterService(viewsheetService);
      coreLifecycleService = new CoreLifecycleService(objectModelFactoryService, viewsheetService, vsLayoutService, parameterService,vsCompositionService);
      SharedFilterService sharedFilterService = new SharedFilterService(Mockito.mock(SimpMessagingTemplate.class), viewsheetService);
      objectService = new VSObjectService(coreLifecycleService, viewsheetService, securityEngine, sharedFilterService);

      bookmarkService = new VSBookmarkService(objectService, coreLifecycleService);
      List<DataRefModelFactory<?, ?>> dataRefModelFactories = Arrays.asList(
            new AggregateRefModel.AggregateRefModelFactory(),
            new AliasDataRefModel.AliasDataRefModelFactory(),
            new AttributeRefModel.AttributeRefModelFactory(),
            new BAggregateRefModel.VSAggregateRefModelFactory(),
            new BDimensionRefModel.VSDimensionRefModelFactory(),
            new BaseFieldModel.BaseFieldModelFactory(),
            new CalculateRefModel.CalculateRefModelFactory(),
            new ColumnRefModel.ColumnRefModelFactory(),
            new DateRangeRefModel.DateRangeRefModelFactory(),
            new FormRefModel.FormRefModelFactory(),
            new FormulaFieldModel.FormulaFieldModelFactory(),
            new ExpressionRefModel.ExpressionRefModelFactory(),
            new GroupRefModel.GroupRefModelFactory(),
            new NumericRangeRefModel.NumericRangeRefModelFactory()
      );

      dataRefModelFactoryService = new DataRefModelFactoryService(dataRefModelFactories);
      dataRefModelFactories.stream().forEach(f -> {
         if(f instanceof DataRefModelWrapperFactory) {
            ((DataRefModelWrapperFactory) f).setDataRefModelFactoryService(dataRefModelFactoryService);
         }
      });

      vsLifecycleService = new VSLifecycleService(
            viewsheetService, assetRepository, coreLifecycleService, bookmarkService,
            dataRefModelFactoryService, vsCompositionService, parameterService);
      licenseService = new LicenseService();
      openViewsheetController = new OpenViewsheetController(
            runtimeViewsheetRef, runtimeViewsheetManager, objectTreeService, viewsheetService,
            vsLifecycleService, licenseService);
      
      vsExportService = new VSExportService(viewsheetService, coreLifecycleService, parameterService);

      securityProvider = SecurityEngine.getSecurity().getSecurityProvider();
      resourcePermissionService = new ResourcePermissionService(securityProvider, SecurityEngine.getSecurity());
      repletRegistryManager = new RepletRegistryManager();
      scheduleTaskFolderService = new ScheduleTaskFolderService(ScheduleManager.getScheduleManager(), SecurityEngine.getSecurity(),
              securityProvider);
      try {
         contentRepositoryTreeService = new ContentRepositoryTreeService(securityProvider, XFactory.getRepository(),
               resourcePermissionService, repletRegistryManager, scheduleTaskFolderService);
      } catch (RemoteException e) {
         e.printStackTrace();
      }

      deployService = new DeployService(contentRepositoryTreeService,  SecurityEngine.getSecurity());
      fileApiService = new FileApiService(deployService, contentRepositoryTreeService, securityProvider);
   }

   @Override
   public String getRuntimeId() {
      return runtimeId;
   }

   public ViewsheetService getViewsheetService() {
      return viewsheetService;
   }

   public OpenViewsheetController getOpenViewsheetController() {
      return openViewsheetController;
   }

   public VSExportService getVSExportService() { return vsExportService; }

   public FileApiService getFileApiService() { return fileApiService; }
   public CoreLifecycleService getCoreLifecycleService() { return coreLifecycleService; }

   private String runtimeId;
   private RuntimeViewsheetRef runtimeViewsheetRef;
   private ViewsheetService viewsheetService;
   private WorksheetService worksheetService;
   private VSLifecycleService vsLifecycleService;
   private RuntimeViewsheetManager runtimeViewsheetManager;
   private VSObjectModelFactoryService objectModelFactoryService;
   private VSObjectTreeService objectTreeService;
   private SecurityEngine securityEngine;
   private VSObjectService objectService;
   private VSBookmarkService bookmarkService;
   private DataRefModelFactoryService dataRefModelFactoryService;
   private AssetRepository assetRepository;
   private OpenViewsheetController openViewsheetController;
   private LicenseService licenseService;
   private VSExportService vsExportService;
   private SecurityProvider securityProvider;
   private ResourcePermissionService resourcePermissionService;
   private ContentRepositoryTreeService contentRepositoryTreeService;
   private RepletRegistryManager repletRegistryManager;
   private DeployService deployService;
   private ScheduleTaskFolderService scheduleTaskFolderService;

   private FileApiService fileApiService;
   private CoreLifecycleService coreLifecycleService;
}
