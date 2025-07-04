import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MainwindowComponent } from './view/mainwindow/mainwindow.component';
import { EmployeeComponent } from './view/modules/employee/employee.component';
import { UserComponent } from './view/modules/user/user.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MessageComponent } from "./util/dialog/message/message.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EmployeeService } from "./service/employeeservice";
import { MatSelectModule } from "@angular/material/select";
import { ConfirmComponent } from "./util/dialog/confirm/confirm.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { DatePipe } from "@angular/common";
import { ArrearsByProgramComponent } from './report/view/arrearsbyprogram/arrearsbyprogram.component';
import { CountByDesignationComponent } from "./report/view/countbydesignation/countbydesignation.component";
import { MatChipsModule } from "@angular/material/chips";
import { PrivilageComponent } from './view/modules/privilage/privilage.component';
import { JwtInterceptor } from "./service/JwtInterceptor";
import { AuthorizationManager } from "./service/authorizationmanager";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { OperationComponent } from './view/modules/operation/operation.component';
import { PaymentComponent } from './view/modules/payment/payment.component';
import { AttendanceComponent } from './view/modules/attendance/attendance.component';
import { StudentComponent } from './view/modules/student/student.component';
import { BatchregistrationComponent } from './view/modules/batchregistration/batchregistration.component';
import { ClassComponent } from './view/modules/class/class.component';
import { BookdistributionComponent } from './view/modules/bookdistribution/bookdistribution.component';
import { PatientComponent } from './view/modules/patient/patient.component';
import { PatientcountbybloodgroupComponent } from './report/view/patientcountbybloodgroup/patientcountbybloodgroup.component';
import { DoctorComponent } from './view/modules/doctor/doctor.component';
import { DoctorcountbyspecialityComponent } from './report/view/doctorcountbyspeciality/doctorcountbyspeciality.component';
import { ClinicComponent } from './view/modules/clinic/clinic.component';
import { WardassignmentComponent } from './view/modules/wardassignment/wardassignment.component';
import { PatientattendenceComponent } from './view/modules/patientattendence/patientattendence.component';
import { DrugComponent } from './view/modules/drug/drug.component';
import { ClinicattendenceComponent } from './view/modules/clinicattendence/clinicattendence.component';
import { DiagnosisComponent } from './view/modules/diagnosis/diagnosis.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { PrescriptionComponent } from './view/modules/prescription/prescription.component';
import { InvestigationComponent } from './view/modules/investigation/investigation.component';
import { PatientcountbyclinicbytimeComponent } from './report/view/patientcountbyclinicbytime/patientcountbyclinicbytime.component';
import { DrugbybrandgenericstatusComponent } from './report/view/drugbybrandgenericstatus/drugbybrandgenericstatus.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {IgxIconModule, IgxInputGroupModule, IgxTimePickerModule} from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainwindowComponent,
    EmployeeComponent,
    UserComponent,
    ConfirmComponent,
    ArrearsByProgramComponent,
    CountByDesignationComponent,
    MessageComponent,
    PrivilageComponent,
    OperationComponent,
    PaymentComponent,
    AttendanceComponent,
    StudentComponent,
    BatchregistrationComponent,
    ClassComponent,
    BookdistributionComponent,
    PatientComponent,
    PatientcountbybloodgroupComponent,
    DoctorComponent,
    DoctorcountbyspecialityComponent,
    ClinicComponent,
    WardassignmentComponent,
    PatientattendenceComponent,
    DrugComponent,
    ClinicattendenceComponent,
    DiagnosisComponent,
    DashboardComponent,
    PrescriptionComponent,
    InvestigationComponent,
    PatientcountbyclinicbytimeComponent,
    DrugbybrandgenericstatusComponent,

  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    IgxTimePickerModule,
    IgxInputGroupModule,
    IgxIconModule,
    FormsModule
  ],
  providers: [
    OperationComponent,
    EmployeeService,
    DatePipe,
    AuthorizationManager,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
