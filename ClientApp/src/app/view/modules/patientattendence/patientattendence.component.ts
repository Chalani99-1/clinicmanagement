import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Patientattendence} from "../../../entity/patientattendence";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Patientattendenceservice} from "../../../service/patientattendenceservice";
import {Employee} from "../../../entity/employee";
import {Patient} from "../../../entity/patient";
import {Clinic} from "../../../entity/clinic";
import {Patientattendencestatus} from "../../../entity/patientattendencestatus";
import {Gender} from "../../../entity/gender";
import {Patientservice} from "../../../service/patientservice";
import {Clinicservice} from "../../../service/clinicservice";
import {Patientattendencestatusservice} from "../../../service/patientattendencestatusservice";
import {EmployeeService} from "../../../service/employeeservice";
import {Doctorgrade} from "../../../entity/doctorgrade";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {RegexService} from "../../../service/regexservice";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {User} from "../../../entity/user";

@Component({
  selector: 'app-patientattendence',
  templateUrl: './patientattendence.component.html',
  styleUrls: ['./patientattendence.component.css']
})
export class PatientattendenceComponent  {

  columns: string[] = ['patient', 'clinicmodi', 'patientattendencestatus', 'timein', 'timeout', 'employee'];
  headers: string[] = ['Patient Name', 'Clinic','Attendence Status', 'Time In', 'Time Out', 'Employee Name'];
  binders: string[] = ['patient.name', 'getClinicmodi()', 'patientattendencestatus.name', 'timein', 'timeout', 'employee.fullname'];

  cscolumns: string[] = ['cspatient', 'csclinicmodi', 'cspatientattendencestatus', 'cstimein', 'cstimeout', 'csemployee'];
  csprompts: string[] = ['Search by Patient Name', 'Search by Clinic Type and Date','Search by Patient Attendence Status',
    'Search by Time In', 'Search by Time Out', 'Search by Employee Name'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  patientattendences: Array<Patientattendence> = [];
  data!: MatTableDataSource<Patientattendence>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  patientattendence!: Patientattendence;
  oldpatientattendence!: Patientattendence;

  regexes: any;
  selectedrow: any;

  patients:Array<Patient>=[];
  clinics:Array<Clinic>=[];
  patientattendencestatuses:Array<Patientattendencestatus>=[];
  employees :Array<Employee>=[];

  uiassist: UiAssist;

  constructor(
      private fb: FormBuilder,
      private pas: Patientattendenceservice,
      private dp: DatePipe,
      private ps: Patientservice,
      private cs: Clinicservice,
      private rs: RegexService,
      private pass: Patientattendencestatusservice,
      private es: EmployeeService,
      private dg: MatDialog,){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "cspatient": new FormControl(),
      "csclinicmodi": new FormControl(),
      //"csdate": new FormControl(),
      "cspatientattendencestatus": new FormControl(),
      "cstimein": new FormControl(),
      "cstimeout": new FormControl(),
      "csemployee": new FormControl(),
    });

    this.ssearch = this.fb.group({
      "sspatientattendencestatus": new FormControl(),
      "ssclinic": new FormControl(),
      "sspatient": new FormControl(),
      "ssdate": new FormControl(),

    });

    this.form = this.fb.group({
      //"nic": new FormControl('', [Validators.required]),
      "patient": new FormControl('', [Validators.required]),
      //"clinictype": new FormControl('', [Validators.required]),
      "clinic": new FormControl('', [Validators.required]),
      "patientattendencestatus": new FormControl('', [Validators.required]),
      //"date": new FormControl('', [Validators.required]),
      "timein": new FormControl('', [Validators.required]),
      "timeout": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});



  }


  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.pass.getAllList().then((pntattendences: Patientattendencestatus[]) => {
      this.patientattendencestatuses = pntattendences;
    });

    this.cs.getAll("").then((clncs: Clinic[]) => {
      this.clinics = clncs;
    });

    this.ps.getAll("").then((pnts: Patient[]) => {
      this.patients = pnts;
    });

    this.es.getAll("?designationid=2").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.rs.get('patientattendence').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {
   // this.form.controls['nic'].setValidators([Validators.required]);
    this.form.controls['patient'].setValidators([Validators.required]);
    //this.form.controls['clinictype'].setValidators([Validators.required]);
    this.form.controls['clinic'].setValidators([Validators.required]);
    this.form.controls['patientattendencestatus'].setValidators([Validators.required]);
   // this.form.controls['date'].setValidators([Validators.required,Validators.pattern(this.regexes['date']['regex'])]);
    this.form.controls['timein'].setValidators([Validators.required,Validators.pattern(this.regexes['timein']['regex'])]);
    this.form.controls['timeout'].setValidators([Validators.required,Validators.pattern(this.regexes['timeout']['regex'])]);
    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required,Validators.pattern(this.regexes['description']['regex'])]);



    Object.values(this.form.controls).forEach(control => {control.markAsTouched();});

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.markAsUntouched();
      control.valueChanges.subscribe(value => {
        //@ts-ignore
        if (controlName == "date" )
          value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

        if (this.oldpatientattendence != undefined && control.valid) {
          // @ts-ignore
          if (value === this.patientattendence[controlName]) {
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


  loadTable(query: string) {

    this.pas.getAll(query)
        .then((pntattends: Patientattendence[]) => {
          this.patientattendences = pntattends.reverse();
          this.imageurl = 'assets/fullfilled.png';
        })
        .catch((error) => {
          console.log(error);
          this.imageurl = 'assets/rejected.png';
        })
        .finally(() => {
          this.data = new MatTableDataSource(this.patientattendences);
          this.data.paginator = this.paginator;
        });

  }

  getDate(element: Patientattendence) {
    return this.dp.transform(element.date,'yyyy-MM-dd');
  }
  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let patientattendencestatusid = sserchdata.sspatientattendencestatus;
    let clinicid = sserchdata.ssclinic;
    let patientid = sserchdata.sspatient;
   // let date = sserchdata.ssdate;

    let query = "";

   // if (date != null && date.trim() != "") query = query + "&date=" + date;
    if (patientattendencestatusid != null) query = query + "&patientattendencestatusid=" + patientattendencestatusid;
    if (clinicid != null) query = query + "&clinicid=" + clinicid;
    if (patientid != null) query = query + "&patientid=" + patientid;


    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }


  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '450px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  fillForm(patientattendence: Patientattendence) {

    // this.enableButtons(false,true,true);

    this.selectedrow=patientattendence;

    this.patientattendence = JSON.parse(JSON.stringify(patientattendence));
    this.oldpatientattendence = JSON.parse(JSON.stringify(patientattendence));

    //@ts-ignore
    this.patientattendence.patient = this.patients.find(p => p.id === this.patientattendence.patient.id);

    //@ts-ignore
    this.patientattendence.employee = this.employees.find(e => e.id === this.patientattendence.employee.id);
//@ts-ignore
    this.patientattendence.clinic = this.clinics.find(c=> c.id ===this.patientattendence.clinic.id);
    //@ts-ignore
    this.patientattendence.patientattendencestatus = this.patientattendencestatuses.find(ps => ps.id === this.patientattendence.patientattendencestatus.id);

    this.form.patchValue(this.patientattendence);
    this.form.markAsPristine();

  }

  getClinicmodi(element: Patientattendence) {
    return element.clinic.clinictype.name + '(' + element.clinic.date + ')';

  }

  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (patientattendence: Patientattendence, filter: string) => {
      return (cserchdata.cspatient == null || patientattendence.patient.name.includes(cserchdata.cspatient)) &&
          (cserchdata.csclinicmodi == null || this.getClinicmodi(patientattendence).includes(cserchdata.csclinicmodi))&&
          (cserchdata.csdate == null || patientattendence.date.toLowerCase().includes(cserchdata.csdate)) &&
          (cserchdata.cspatientattendencestatus == null || patientattendence.patientattendencestatus.name.includes(cserchdata.cspatientattendencestatus)) &&
          (cserchdata.cstimein == null || patientattendence.timein.includes(cserchdata.cstimein)) &&
          (cserchdata.cstimeout == null || patientattendence.timeout.toString().includes(cserchdata.cstimeout)) &&
          (cserchdata.csemployee == null || patientattendence.employee.fullname.includes(cserchdata.csemployee))
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
        data: {heading: "Errors - Patient Attendence Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.patientattendence = this.form.getRawValue();

      let pntattendencedata: string = "";
      pntattendencedata = pntattendencedata + "<br>Patient Name is : " + this.patientattendence.patient.name;
      // pntattendencedata = pntattendencedata + "<br>Clinic type is : " + this.patientattendence.clinic.clinictype.name;
      // pntattendencedata = pntattendencedata + "<br>Attendence Date is : " + this.patientattendence.date;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Patient Attendence Add",
          message: "Are you sure to Add the following Patient Attendence? <br> <br>" + pntattendencedata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {

          this.pas.add(this.patientattendence).then((responce: [] | undefined) => {
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
              data: {heading: "Status -Patient Attendence Add", message: addmessage}
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
        data: {heading: "Errors - Patient Attendence Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Patient Attendence Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.patientattendence = this.form.getRawValue();

            this.patientattendence.id=this.oldpatientattendence.id;

            this.pas.update(this.patientattendence).then((responce: [] | undefined) => {
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
                data: {heading: "Status -Patient Attendence Update", message: updmessage}
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
          data: {heading: "Confirmation - Patient Attendence Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }
  }


  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Clinic Delete",
        message: "Are you sure to Delete following Patient Attendence? <br> <br>" + this.patientattendence.patient.name
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.pas.delete(this.patientattendence.id).then((responce: [] | undefined) => {

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
            data: {heading: "Status - Patient Attendence Delete ", message: delmessage}
          });
          stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

        });
      }
    });
  }

  clear():void{
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Patient attendence Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
      }
    });
  }


}
