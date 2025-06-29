import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Clinic} from "../../../entity/clinic";
import {UiAssist} from "../../../util/ui/ui.assist";
import {Clinicservice} from "../../../service/clinicservice";
import {RegexService} from "../../../service/regexservice";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Clinictypeservice} from "../../../service/clinictypeservice";
import {Wardservice} from "../../../service/wardservice";
import {Clinicroomservice} from "../../../service/clinicroomservice";
import {Clinicstatusservice} from "../../../service/clinicstatusservice";
import {Clinictype} from "../../../entity/clinictype";
import {Clinicroom} from "../../../entity/clinicroom";
import {Clinicstatus} from "../../../entity/clinicstatus";
import {Ward} from "../../../entity/ward";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {Employee} from "../../../entity/employee";
import {EmployeeService} from "../../../service/employeeservice";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Allergyservice} from "../../../service/allergyservice";
import {Symptomservice} from "../../../service/symptomservice";
import {Diseaseservice} from "../../../service/diseaseservice";
import {Clinicattendence} from "../../../entity/clinicattendence";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit{
  columns: string[] = ['clinictype', 'ward', 'clinicroom', 'clinicstatus' , 'date','starttime','endtime'];
  headers: string[] = ['Clinic Type', 'Ward', 'Clinic Room', 'Clinic Status', 'Date','starttime','endtime'];
  binders: string[] = ['clinictype.name', 'ward.name', 'clinicroom.name', 'clinicstatus.name', 'date','starttime','endtime'];

  cscolumns: string[] = ['csclinictype', 'csward', 'csclinicroom', 'csclinicstatus', 'csdate','csstarttime','csendtime'];
  csprompts: string[] = ['Search by Clinic Type', 'Search by Ward', 'Search by Clinic Room',
    'Search by Clinic Status', 'Search by Date','Start Time','End Time'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  clinic!: Clinic;
  oldclinic!:Clinic;

  selectedrow: any;


  clinics: Array<Clinic> = [];
  data!: MatTableDataSource<Clinic>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  employees: Array<Employee> = [];
  clinictypes:Array<Clinictype> =[];
  clinicrooms:Array<Clinicroom> =[];
  clinicstatuses:Array<Clinicstatus> = [];
  wards:Array<Ward> = [];

  regexes: any;

  uiassist: UiAssist;

  constructor(
    private cs: Clinicservice,
    private fb: FormBuilder,
    private es:EmployeeService,
    private rs: RegexService,
    private dg: MatDialog,
    private dp: DatePipe,
    private tp: DatePipe,
    private cts: Clinictypeservice,
    private ws: Wardservice,
    private crs: Clinicroomservice,
    private css: Clinicstatusservice,
    public authService:AuthorizationManager,
  ){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csclinictype": new FormControl(),
      "csward": new FormControl(),
      "csclinicroom": new FormControl(),
      "csclinicstatus": new FormControl(),
      "csdate": new FormControl(),
      "csstarttime": new FormControl(),
      "csendtime": new FormControl(),

    });

    this.ssearch = this.fb.group({
      "ssclinictype": new FormControl(),
      "ssclinicstatus": new FormControl(),
      "ssward": new FormControl(),

    });

    this.form = this.fb.group({
      "employee": new FormControl('', [Validators.required]),
      "clinictype": new FormControl('', [Validators.required]),
      "ward": new FormControl,
      "clinicroom": new FormControl('', [Validators.required]),
      "clinicstatus": new FormControl('', [Validators.required]),
      "date": new FormControl('', [Validators.required]),
      "starttime": new FormControl(),
      "endtime": new FormControl(),
      "description": new FormControl,
      "patientcount": new FormControl('', [Validators.required]),
      "dopublish": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.cts.getAllList().then((clinicts: Clinictype[]) => {
      this.clinictypes = clinicts;
    });

    this.crs.getAllList().then((clinicrs: Clinicroom[]) => {
      this.clinicrooms = clinicrs;
    });

    this.ws.getAllList().then((wrds: Ward[]) => {
      this.wards = wrds;
    });

    this.es.getAll("?designationid=2").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.css.getAllList().then((clinicss: Clinicstatus[]) => {
      this.clinicstatuses = clinicss;
    });

    this.rs.get('clinic').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  createForm() {

    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['clinictype'].setValidators([Validators.required]);
    this.form.controls['ward'].setValidators([Validators.required]);
    this.form.controls['clinicroom'].setValidators([Validators.required]);
    this.form.controls['clinicstatus'].setValidators([Validators.required]);
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['starttime'].setValidators([Validators.required,Validators.pattern(this.regexes['starttime']['regex'])]);
    this.form.controls['endtime'].setValidators([Validators.required,Validators.pattern(this.regexes['endtime']['regex'])]);
    this.form.controls['description'].setValidators([Validators.required,Validators.pattern(this.regexes['description']['regex'])]);
    this.form.controls['patientcount'].setValidators([Validators.required,Validators.pattern(this.regexes['patientcount']['regex'])]);
    this.form.controls['dopublish'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach(control => {control.markAsTouched();});

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
        //@ts-ignore
        if (controlName == "date" || controlName == "dopublish")
          value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

        if (this.oldclinic != undefined && control.valid) {
          // @ts-ignore
          if (value === this.clinic[controlName]) {
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

    // this.cs.getAll(query)
    //   .then((clinics: Clinic[]) => {
    //     this.clinics = clinics;
    //     this.imageurl = 'assets/fullfilled.png';
    //   })
    this.cs.getAll(query)
      .then((clinics: Clinic[]) => {
        this.clinics = clinics.reverse(); // Reverse the order
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.clinics);
        this.data.paginator = this.paginator;
      });

  }

 // return element.clinic.clinictype.name + '(' + element.clinic.date + ')';
 //  getDuration(element: Clinic) {
 //    return this.tp.transform(element.endtime?.toString());
 //  }



  // getDuration(element: Clinic) {
  //   return this.dp.transform(element.starttime,element.endtime);
  // }
  // getDuration(element: Clinic): string {
  //   // Calculate the duration
  //   const startTime = element.starttime();
  //   const endTime = element.endtime();
  //   const durationMs = endTime - startTime;
  //
  //   // Convert duration from milliseconds to hours and minutes
  //   const durationMinutes = Math.floor(durationMs / (1000 * 60));}

  filterTable(): void {

    const csearchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (clinic: Clinic, filter: string) => {
      return (csearchdata.csclinictype == null || clinic.clinictype.name.includes(csearchdata.csclinictype)) &&
        (csearchdata.csward == null || clinic.ward.name.includes(csearchdata.csward)) &&
        (csearchdata.csclinicroom == null || clinic.clinicroom.name.includes(csearchdata.csclinicroom)) &&
        (csearchdata.csclinicstatus == null || clinic.clinicstatus.name.includes(csearchdata.csclinicstatus)) &&
        (csearchdata.csdate == null || clinic.date.includes(csearchdata.csdate));

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const ssearchdata = this.ssearch.getRawValue();

    let clinictypeid = ssearchdata.ssclinictype;
    let clinicstatusid = ssearchdata.ssclinicstatus;
    let wardid = ssearchdata.ssward;

    let query = "";

    if (clinictypeid != null) query = query + "&clinictypeid=" + clinictypeid;
    if (clinicstatusid != null) query = query + "&clinicstatusid=" + clinicstatusid;
    if (wardid != null) query = query + "&wardid=" + wardid;


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

    console.log(this.clinic)

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Clinic Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.clinic = this.form.getRawValue();

      let clncdata: string = "";
      clncdata = clncdata + "<br>Clinic Type is : " + this.clinic.clinictype.name;
      clncdata = clncdata + "<br>Clinic Start Time is : " + this.clinic.starttime;
      clncdata = clncdata + "<br>Clinic End Time is : " + this.clinic.endtime;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Clinic Add",
          message: "Are you sure to Add the following Clinic? <br> <br>" + clncdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {

          this.cs.add(this.clinic).then((responce: [] | undefined) => {
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
              data: {heading: "Status -Clinic Add", message: addmessage}
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


  fillForm(clinic: Clinic) {

    // this.enableButtons(false,true,true);

    this.selectedrow=clinic;

    this.clinic = JSON.parse(JSON.stringify(clinic));
    this.oldclinic = JSON.parse(JSON.stringify(clinic));

    console.log(this.clinic.date);

    //@ts-ignore
    this.clinic.employee = this.employees.find(e => e.id === this.clinic.employee.id);

    //@ts-ignore
    this.clinic.clinictype = this.clinictypes.find(ct => ct.id === this.clinic.clinictype.id);

    //@ts-ignore
    this.clinic.ward = this.wards.find(w => w.id === this.clinic.ward.id);

    //@ts-ignore
    this.clinic.clinicroom = this.clinicrooms.find(cr => cr.id === this.clinic.clinicroom.id);

    //@ts-ignore
    this.clinic.clinicstatus = this.clinicstatuses.find(cs => cs.id === this.clinic.clinicstatus.id);

    this.form.patchValue(this.clinic);
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
            heading: "Confirmation - Clinic Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.clinic = this.form.getRawValue();

            this.clinic.id=this.oldclinic.id;

            this.cs.update(this.clinic).then((responce: [] | undefined) => {
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
                data: {heading: "Status -Clinic Update", message: updmessage}
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
          data: {heading: "Confirmation - Clinicr Update", message: "Nothing Changed"}
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
        message: "Are you sure to Delete following Clinic? <br> <br>" + this.clinic.clinictype.name
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.cs.delete(this.clinic.id).then((responce: [] | undefined) => {

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
            data: {heading: "Status - Clinic Delete ", message: delmessage}
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
        heading: "Confirmation - Clinic Clear",
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


