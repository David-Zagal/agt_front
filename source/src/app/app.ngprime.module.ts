import { NgModule } from '@angular/core';
import {
    PaginatorModule, DialogModule, CheckboxModule, RadioButtonModule, CardModule,
    AccordionModule, BreadcrumbModule, ButtonModule, CalendarModule, ChartModule,
    ConfirmDialogModule, DataViewModule, DynamicDialogModule, InputTextareaModule,
    InputTextModule, MegaMenuModule, MessageModule, MessagesModule, OverlayPanelModule,
    PanelModule, ProgressSpinnerModule, SelectButtonModule, SidebarModule, TableModule,
    TabViewModule, ToastModule, TreeModule, FileUploadModule, MultiSelectModule
} from 'primeng';

@NgModule({
    exports: [
        InputTextModule,
        TreeModule,
        ConfirmDialogModule,
        ButtonModule,
        PanelModule,
        ToastModule,
        MegaMenuModule,
        TableModule,
        AccordionModule,
        MessageModule,
        CardModule,
        ChartModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,
        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule,
        MessagesModule,
        SelectButtonModule,
        DataViewModule,
        PaginatorModule,
        DialogModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        FileUploadModule,
        MultiSelectModule
    ]
})
export class NgPrimeModule { }
