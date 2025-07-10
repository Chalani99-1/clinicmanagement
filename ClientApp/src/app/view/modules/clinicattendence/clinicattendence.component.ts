import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Patientattendence} from "../../../entity/patientattendence";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Clinicattendence} from "../../../entity/clinicattendence";
import {Clinic} from "../../../entity/clinic";
import {Employee} from "../../../entity/employee";
import {UiAssist} from "../../../util/ui/ui.assist";
import {DatePipe} from "@angular/common";
import {RegexService} from "../../../service/regexservice";
import {EmployeeService} from "../../../service/employeeservice";
import {MatDialog} from "@angular/material/dialog";
import {Clinicattendenceservice} from "../../../service/clinicattendenceservice";
import {Patientattendencestatus} from "../../../entity/patientattendencestatus";
import {Patient} from "../../../entity/patient";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {Clinicservice} from "../../../service/clinicservice";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {DesignationService} from "../../../service/designationservice";
import {Designation} from "../../../entity/designation";
import {clinic} from "@igniteui/material-icons-extended";

@Component({
  selector: 'app-clinicattendence',
  templateUrl: './clinicattendence.component.html',
  styleUrls: ['./clinicattendence.component.css']
})
export class ClinicattendenceComponent {
  columns: string[] = ['namemodi','clinic','designation','starttime', 'endtime'];
  headers: string[] = ['Employee Name', 'Clinic','Designation','Start Time','End Time'];
  binders: string[] = ['getNamemodi()', 'getClinic()','employee.designation.name','starttime', 'endtime'];

  cscolumns: string[] = ['csnamemodi', 'csclinic','csdesignation','csstarttime', 'csendtime'];
  csprompts: string[] = ['Search by Employee', 'Search by Clinic', 'Search by Start Time','Search by Patient Attendence Status',
    'Search by Time In', 'Search by Time Out', 'Search by Employee Name'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  clinicattendences: Array<Clinicattendence> = [];
  data!: MatTableDataSource<Clinicattendence>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  clinicattendence!: Clinicattendence;
  oldclinicattendence!: Clinicattendence;

  regexes: any;
  selectedrow: any;

  clinics:Array<Clinic>=[];
  employees:Array<Employee>=[];
  designations:Array<Designation>=[];

  uiassist: UiAssist;

  constructor(
    private cas: Clinicattendenceservice,
    private fb: FormBuilder,
    private cs: Clinicservice,
    private ds:DesignationService,
    private dp: DatePipe,
    private rs: RegexService,
    private es: EmployeeService,
    private dg: MatDialog,){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csnamemodi": new FormControl(),
      "csclinic": new FormControl(),
      "csdesignation": new FormControl(),
      "csstarttime": new FormControl(),
      "csendtime": new FormControl(),
    });

    this.ssearch = this.fb.group({
      "ssemployee": new FormControl(),
      "ssclinict":new FormControl(),
      "ssdate": new FormControl()
    });

    this.form = this.fb.group({
      //"number": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
      "clinic": new FormControl('', [Validators.required]),
      //"designation": new FormControl('', [Validators.required]),
      "starttime": new FormControl('', [Validators.required]),
      "endtime": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.es.getAll("?fullname").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.ds.getAllList().then((dess: Designation[]) => {
      this.designations = dess;
    });

    this.cs.getAll("?clinicstatus=1").then((clncs: Clinic[]) => {
      this.clinics = clncs;
    });

    this.rs.get('clinicattendence').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });
  }

  createForm() {
    // this.form.controls['number'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['clinic'].setValidators([Validators.required]);
    //this.form.controls['designation'].setValidators([Validators.required])
    this.form.controls['starttime'].setValidators([Validators.required,Validators.pattern(this.regexes['starttime']['regex'])]);
    this.form.controls['endtime'].setValidators([Validators.required,Validators.pattern(this.regexes['endtime']['regex'])]);
    this.form.controls['description'].setValidators([Validators.required,Validators.pattern(this.regexes['description']['regex'])]);

    console.log('regexes');

    Object.values(this.form.controls).forEach(control => {control.markAsTouched();});

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.markAsUntouched();
      control.valueChanges.subscribe(value => {

        if (this.oldclinicattendence != undefined && control.valid) {
          // @ts-ignore
          if (value === this.clinicattendence[controlName]) {
            control.markAsPristine();
          } else {
            control.markAsDirty();
          }
        } else {
          control.markAsPristine();
        }
      });

    }
    this.enableButtons(true, false, false);

  }

  enableButtons(add: boolean, upd: boolean, del: boolean) {
    this.enaadd = add;
    this.enaupd = upd;
    this.enadel = del;
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }
  loadTable(query: string) {

    this.cas.getAll(query)
      .then((clncattends: Clinicattendence[]) => {
        this.clinicattendences = clncattends.reverse();
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.clinicattendences);
        this.data.paginator = this.paginator;
      });

  }

  getClinic(element: Clinicattendence) {
    return element.clinic.clinictype.name + '(' + element.clinic.date + ')';

  }

  getNamemodi(element: Clinicattendence) {
    return element.employee.callingname + '(' + element.employee.number+ ')';

  }


  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();
    // let clinicattendence.clinic= this.clinicattendence.clinic.clinictype.name + "-(" + this.clinicattendence.clinic.date;


    this.data.filterPredicate = (clinicattendence: Clinicattendence, filter: string) => {
      return (cserchdata.csnamemodi == null || this.getNamemodi(clinicattendence).includes(cserchdata.csnamemodi)) &&
        (cserchdata.csclinic == null || this.getClinic(clinicattendence).includes(cserchdata.csclinic)) &&
        (cserchdata.csdesignation == null || clinicattendence.employee.designation.name.includes(cserchdata.csdesignation)) &&
        (cserchdata.csstarttime == null || clinicattendence.starttime.toString().includes(cserchdata.csstarttime)) &&
        (cserchdata.csendtime == null || clinicattendence.endtime.toString().includes(cserchdata.csendtime));

    };

    this.data.filter = 'xx';

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
        data: {heading: "Errors - Clinic Attendence Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.clinicattendence = this.form.getRawValue();
      //let clinicattendence.clinic= this.clinicattendence.clinic.clinictype.name + "-(" + this.clinicattendence.clinic.date;


      let clncattendenced: string = "";

      clncattendenced = clncattendenced + "<br>Employee is : " + this.clinicattendence.employee.callingname;
      clncattendenced = clncattendenced + "<br>Clinic Type is : " + this.clinicattendence.clinic.clinictype.name;
      clncattendenced= clncattendenced + "<br>Date is: " + this.clinicattendence.clinic.date;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Clinic Attendence Add",
          message: "Are you sure to Add the following Attendence? <br> <br>" + clncattendenced
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("EmployeeService.add(emp)");

          this.cas.add(this.clinicattendence).then((responce: [] | undefined) => {
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
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Attendence Add", message: addmessage}
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


  fillForm(clinicattendence: Clinicattendence) {

    // this.enableButtons(false,true,true);

    this.selectedrow=clinicattendence;

    this.clinicattendence = JSON.parse(JSON.stringify(clinicattendence));
    this.oldclinicattendence = JSON.parse(JSON.stringify(clinicattendence));

    //@ts-ignore
    this.clinicattendence.employee = this.employees.find(e => e.id === this.clinicattendence.employee.id);

    // //@ts-ignore
    // this.clinicattendence.employee.number = this.employees.find(e => e.id === this.clinicattendence.employee.number.id);


    //@ts-ignore
    this.clinicattendence.clinic = this.clinics.find(e => e.id === this.clinicattendence.clinic.id);

    // //@ts-ignore
    // this.clinicattendence.clinic.clinictype+'('+clinic.date+')' == this.clinics.find(c => c.id === this.clinicattendence.clinic.id);

    this.form.patchValue(this.clinicattendence);
    this.form.markAsPristine();

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
        data: {heading: "Errors - Clinic Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Attendence Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.clinicattendence = this.form.getRawValue();

            this.clinicattendence.id=this.oldclinicattendence.id;

            this.cas.update(this.clinicattendence).then((responce: [] | undefined) => {
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
                Object.values(this.form.controls).forEach(control => {control.markAsTouched();});
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Clinic Attendence Update", message: updmessage}
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
          data: {heading: "Confirmation - Clinic Attendence Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }
  }

  clear():void{
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Attendence Clear",
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
        heading: "Confirmation - Clinic Attendence Delete",
        message: "Are you sure to Delete following Employee? <br> <br>" + this.clinicattendence.employee.callingname +"          " + '|' + "       " + this.clinicattendence.clinic.clinictype.name +"       "  +'|' + "       " + this.clinicattendence.clinic.date
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.cas.delete(this.clinicattendence.id).then((responce: [] | undefined) => {

          if (responce != undefined) { // @ts-ignore
            delstatus = responce['errors'] == "";
            if (!delstatus) { // @ts-ignore
              delmessage = responce['errors'];
            }
          } else {
            delstatus = false;
            delmessage = "Content Not Found"
          }
        } ).finally(() => {
          if (delstatus) {
            delmessage = "Successfully Deleted";
            this.form.reset();
            Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Clinic Attendence Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

        });
      }
    });
  }


  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();



    let clinicid = sserchdata.ssclinict;
    let employeeid = sserchdata.ssemployee;
    let date = sserchdata.ssdate

    let query = "";

    if (employeeid != null) query = query + "&employeeid=" + employeeid;
    if (clinicid != null) query = query + "&clinicid=" + clinicid;
    if (date != null && date.trim() != "") query = query + "&date=" + date;


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
}
