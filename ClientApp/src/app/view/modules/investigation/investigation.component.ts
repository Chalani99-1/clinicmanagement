import {Component, ViewChild} from '@angular/core';
import {Wardassignment} from "../../../entity/wardassignment";
import {Investigation} from "../../../entity/investigation";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UiAssist} from "../../../util/ui/ui.assist";
import {DatePipe} from "@angular/common";
import {RegexService} from "../../../service/regexservice";
import {MatDialog} from "@angular/material/dialog";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Ward} from "../../../entity/ward";
import {Assignmentstatus} from "../../../entity/assignmentstatus";
import {Designation} from "../../../entity/designation";
import {Employee} from "../../../entity/employee";
import {Investigationservice} from "../../../service/investigationservice";
import {Patient} from "../../../entity/patient";
import {Gender} from "../../../entity/gender";
import {Investigationstatus} from "../../../entity/investigationstatus";
import {Investigationresult} from "../../../entity/investigationresult";
import {Reporttype} from "../../../entity/reporttype";
import {Investigationstatusservice} from "../../../service/investigationstatusservice";
import {Investigationresultservice} from "../../../service/investigationresultservice";
import {Reporttypeservice} from "../../../service/reporttypeservice";
import {Patientattendence} from "../../../entity/patientattendence";
import {EmployeeService} from "../../../service/employeeservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {Patientattendenceservice} from "../../../service/patientattendenceservice";

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.css']
})
export class InvestigationComponent {
  columns: string[] = ['reporttype','investigationstatus','investigationresult', 'patient','reporteddate'];
  headers: string[] = ['Report Type','Investigation Status','Investigation Result',  'Patient','Reported Date'];
  binders: string[] = ['reporttype.name','investigationstatus.name','investigationresult.name', 'getPatient()','reporteddate'];

  cscolumns: string[] = ['csreporttype','csinvestigationstatus','csinvestigationresult','cspatient','csreporteddate'];
  csprompts: string[] = ['Report Type','Investigation Status','Result','Patient','Reported Date'];

  investigation!: Investigation;
  oldinvestigation!: Investigation;

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  selectedrow: any;

  regexes: any;

  investigations: Array<Investigation> = [];
  data!: MatTableDataSource<Investigation>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/report.png'

  investigationstatuses: Array<Investigationstatus> = [];
  investigationresults: Array<Investigationresult>=[];
  reporttypes: Array<Reporttype>=[];
  patientattendences:Array<Patientattendence>=[];
  employees:Array<Employee>=[];
  patients:Array<Patient>=[];

  uiassist: UiAssist;

  constructor(
    private is:Investigationservice,
    private iss:Investigationstatusservice,
    private irs:Investigationresultservice,
    private pst:Patientattendenceservice,
    private rts:Reporttypeservice,
    private fb:FormBuilder,
    private dp: DatePipe,
    private rs: RegexService,
    private dg: MatDialog,
    private es: EmployeeService,
    public authService:AuthorizationManager
  ){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      'csreporttype': new FormControl(),
      'csinvestigationstatus': new FormControl(),
      'csinvestigationresult': new FormControl(),
      'cspatient': new FormControl(),
      'csreporteddate': new FormControl()
    });

    this.ssearch = this.fb.group({
      "ssreporttype": new FormControl(),
      "ssinvestigationstatus": new FormControl(),
      "ssinvestigationresult": new FormControl(),
      "sspatientattendence": new FormControl(),
      "ssemployee": new FormControl(),

    });

    this.form = this.fb.group({
      "patientattendence": new FormControl('', [Validators.required]),
      "reporteddate": new FormControl('', [Validators.required]),
      "report": new FormControl('', [Validators.required]),
      "reporttype": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "investigationstatus": new FormControl('', [Validators.required]),
      "investigationresult": new FormControl('', [Validators.required]),
      "conclution": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();

    this.iss.getAllList().then((invesstatus: Investigationstatus[]) => {
      this.investigationstatuses = invesstatus;
    });

    this.irs.getAllList().then((invesresult: Investigationresult[]) => {
      this.investigationresults = invesresult;
    });

    this.pst.getAll("").then((patientAtt: Patientattendence[]) => {
      this.patientattendences = patientAtt;
    });

    this.rts.getAllList().then((report: Reporttype[]) => {
      this.reporttypes = report;
    });

    this.es.getAll("?designationid=1").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.rs.get('investigation').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {

    this.form.controls['patientattendence'].setValidators([Validators.required]);
    this.form.controls['reporteddate'].setValidators([Validators.required]);
    this.form.controls['report'].setValidators([Validators.required]);
    this.form.controls['reporttype'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['investigationstatus'].setValidators([Validators.required]);
    this.form.controls['investigationresult'].setValidators([Validators.required]);
    this.form.controls['conclution'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
        // @ts-ignore
        if (controlName == "reporteddate" || controlName == "date")
          value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

        if (this.oldinvestigation != undefined && control.valid) {
          // @ts-ignore
          if (value === this.form[controlName]) {
            control.markAsPristine();
          } else {
            control.markAsDirty();
          }
        } else {
          control.markAsPristine();
        }
      });
    }

  }
  loadTable(query: string) {

    this.is.getAll(query)
      .then((investigations: Investigation[]) => {
        this.investigations = investigations;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.investigations);
        this.data.paginator = this.paginator;
      });
  }

  getPatient(element: Investigation) {
    return element.patientattendence.patient.name + '(' + element.patientattendence.patient.nic + ')';

  }
  filterTable() {
    const csearchdata = this.csearch.getRawValue();

    this.data.filterPredicate = ((investigation:Investigation,filter)=>{
      return (csearchdata.csreporttype==null||investigation.reporttype.name.includes(csearchdata.csreporttype)) &&
        (csearchdata.csinvestigationstatus==null||investigation.investigationstatus.name.includes(csearchdata.csinvestigationstatus))  &&
        (csearchdata.csinvestigationresult==null||investigation.investigationresult.name.includes(csearchdata.csinvestigationresult)) &&
        (csearchdata.cspatient == null || this.getPatient(investigation).includes(csearchdata.cspatient))&&
        (csearchdata.csreporteddate == null || investigation.reporteddate.includes(csearchdata.csreporteddate));


    });
    this.data.filter = 'xx';
  }

  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageempurl = event.target.result;
        this.form.controls['report'].clearValidators();
      }
    }
  }

  clearImage(): void {
    this.imageempurl = 'assets/report.png';
    this.form.controls['report'].setErrors({'required': true});
  }
  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let reporttypeid = sserchdata.ssreporttype;
    let investigationstatusid = sserchdata.ssinvestigationstatus;
    let investigationresultid = sserchdata.ssinvestigationresult;
    let patientnic = sserchdata.sspatientattendence;
    let employeeid = sserchdata.ssemployee;

    let query = "";

    if (reporttypeid != null) query = query + "&reporttypeid=" + reporttypeid;
    if (investigationstatusid != null) query = query + "&investigationstatusid=" + investigationstatusid;
    if (investigationresultid != null) query = query + "&investigationresultid=" + investigationresultid;
    if (patientnic != null) query = query + "&patientnic=" + patientnic;
    if (employeeid != null) query = query + "&employeeid=" + employeeid;

    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }

  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  getErrors(): string {

    let errors: string = "";

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) {

        if (this.regexes[controlName] != undefined) {
          errors = errors + "<br>" + this.regexes[controlName]['message'];
        } else {
          errors = errors + "<br>Invalid " + controlName;
        }
      }
    }

    return errors;
  }


  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Investigation report Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.investigation = this.form.getRawValue();

      //console.log("Photo-Before"+this.employee.photo);
      this.investigation.report = btoa(this.imageempurl);
      //console.log("Photo-After"+this.employee.photo);
      let invdata: string = "";

      invdata = invdata + "<br>Patient name is : " + this.investigation.patientattendence.patient.name;
      invdata = invdata + "<br>Report type is : " + this.investigation.reporttype.name;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Investigation Add",
          message: "Are you sure to Add the following Investigation? <br> <br>" + invdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("EmployeeService.add(emp)");

          this.is.add(this.investigation).then((responce: [] | undefined) => {
            //console.log("Res-" + responce);
            //console.log("Un-" + responce == undefined);
            if (responce != undefined) { // @ts-ignore
              console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
              // @ts-ignore
              addstatus = responce['errors'] == "";
              console.log("Add Sta-" + addstatus);
              if (!addstatus) { // @ts-ignore
                addmessage = responce['errors'];
              }
            } else {
              console.log("undefined");
              addstatus = false;
              addmessage = "Content Not Found"
            }
          }).finally(() => {

            if (addstatus) {
              addmessage = "Successfully Saved";
              this.form.reset();
              this.clearImage();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Investigation Add", message: addmessage}
            });

            stsmsg.afterClosed().subscribe(async result => {
              if (!result) {
                return;
              }
            });
          });
        }
      });
    }
  }


  getUpdates(): string {
    let updates: string = '';

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1) + " Changed";
      }
    }
    return updates;
  }

  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors -  Investigation Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {if (!result) {return;} });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Investigation Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.investigation = this.form.getRawValue();
            if (this.form.controls['report'].dirty) this.investigation.report = btoa(this.imageempurl);
            else this.investigation.report = this.investigation.report;
            this.investigation.id=this.oldinvestigation.id;

            this.is.update(this.investigation).then((responce: [] | undefined) => {
              //console.log("Res-" + responce);
              // console.log("Un-" + responce == undefined);
              if (responce != undefined) { // @ts-ignore
                //console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
                // @ts-ignore
                updstatus = responce['errors'] == "";
                //console.log("Upd Sta-" + updstatus);
                if (!updstatus) { // @ts-ignore
                  updmessage = responce['errors'];
                }
              } else {
                //console.log("undefined");
                updstatus = false;
                updmessage = "Content Not Found"
              }
            }).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.clearImage();
                Object.values(this.form.controls).forEach(control => {control.markAsTouched();});
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Investigation Update", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => {
                if (!result) {
                  return;
                }
              });

            });
          }
        });
      } else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Investigation Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }
  }

  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Investigation Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
      }
    });
  }

  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Investigation Delete",
        message: "Are you sure to Delete following Investigation? <br> <br>" + this.investigation.patientattendence.patient.name
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.is.delete(this.investigation.id).then((responce: [] | undefined) => {

          if (responce != undefined) { // @ts-ignore
            delstatus = responce['errors'] == "";
            if (!delstatus) { // @ts-ignore
              delmessage = responce['errors'];
            }
          } else {
            delstatus = false;
            delmessage = "Content Not Found"
          }
        }).finally(() => {
          if (delstatus) {
            delmessage = "Successfully Deleted";
            this.form.reset();
            this.clearImage();
            Object.values(this.form.controls).forEach(control => {
              control.markAsTouched();
            });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Investigation Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => {
            if (!result) {
              return;
            }
          });

        });
      }
    });
  }

  fillForm(investigation: Investigation) {

    // this.enableButtons(false,true,true);

    this.selectedrow =investigation;

    this.investigation = JSON.parse(JSON.stringify(investigation));
    this.oldinvestigation = JSON.parse(JSON.stringify(investigation));

    if (this.investigation.report != null) {
      this.imageempurl = atob(this.investigation.report);
      this.form.controls['report'].clearValidators();
    } else {
      this.clearImage();
    }
    this.investigation.report = "";

    //@ts-ignore
    this.investigation.reporttype = this.reporttypes.find(r => r.id === this.investigation.reporttype.id);
    //@ts-ignore
    this.investigation.investigationstatus = this.investigationstatuses.find(is => is.id === this.investigation.investigationstatus.id);
    //@ts-ignore
    this.investigation.investigationresult = this.investigationresults.find(ir => ir.id === this.investigation.investigationresult.id);
    //@ts-ignore
    this.investigation.employee = this.employees.find(e => e.id === this.investigation.employee.id);
    //@ts-ignore
    this.investigation.patientattendence = this.patientattendences.find(e => e.id === this.investigation.patientattendence.id);

    this.form.patchValue(this.investigation);
    this.form.markAsPristine();

  }


}
