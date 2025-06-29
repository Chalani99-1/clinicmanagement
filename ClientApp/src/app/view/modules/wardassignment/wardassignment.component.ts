import {Component, ViewChild} from '@angular/core';
import {Doctor} from "../../../entity/doctor";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Wardassignment} from "../../../entity/wardassignment";
import {Employee} from "../../../entity/employee";
import {Ward} from "../../../entity/ward";
import {Assignmentstatus} from "../../../entity/assignmentstatus";
import {UiAssist} from "../../../util/ui/ui.assist";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Wardassignmentservice} from "../../../service/wardassignmentservice";
import {EmployeeService} from "../../../service/employeeservice";
import {Wardservice} from "../../../service/wardservice";
import {Assignmentstatusservice} from "../../../service/assignmentstatusservice";
import {RegexService} from "../../../service/regexservice";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Patient} from "../../../entity/patient";
import {Speciality} from "../../../entity/speciality";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Clinic} from "../../../entity/clinic";
import {Patientattendence} from "../../../entity/patientattendence";
import {DesignationService} from "../../../service/designationservice";
import {Designation} from "../../../entity/designation";

@Component({
  selector: 'app-wardassignment',
  templateUrl: './wardassignment.component.html',
  styleUrls: ['./wardassignment.component.css']
})
export class WardassignmentComponent {
  columns: string[] = ['number','employee','ward', 'assignmentstatus','designation','assignmentdate'];
  headers: string[] = ['ENumber','Employee Name','Ward',  'Assignment Status','Designation','Assigned Date'];
  binders: string[] = ['employee.number','employee.fullname','ward.name', 'assignmentstatus.name','employee.designation.name','getDate()'];

  cscolumns: string[] = ['csnumber','csemployee','csward','csassignmentstatus','csdesignation','csassignmentdate'];
  csprompts: string[] = ['ENumber','Name','Ward','Assignment status','Designation','Assign date'];

  wardassignment!: Wardassignment;
  oldwardassignment!: Wardassignment;

  selectedrow: any;

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  wardassignments: Array<Wardassignment> = [];
  data!: MatTableDataSource<Wardassignment>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  wards: Array<Ward> =[];
  employees: Array<Employee> = [];
  assignmentstatuses: Array<Assignmentstatus> =[];
  designations: Array<Designation> =[];


  uiassist: UiAssist;
  regexes: any;

  constructor(
    private fb:FormBuilder,
    private was:Wardassignmentservice,
    private ws:Wardservice,
    private dp: DatePipe,
    private ass:Assignmentstatusservice,
    private es:EmployeeService,
    private rs: RegexService,
    private ds: DesignationService,
    private dg: MatDialog,
    public authService:AuthorizationManager){

    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      'csemployee': new FormControl(),
      'csward': new FormControl(),
      'csassignmentstatus': new FormControl(),
      'csassignmentdate': new FormControl(),
      'csnumber': new FormControl()
    });

    this.ssearch = this.fb.group({
      "ssemployee": new FormControl(),
      "ssward": new FormControl(),
      "ssassignmentstatus": new FormControl(),
      "ssnumber": new FormControl(),
      "ssdesignation": new FormControl()

    });

    this.form = this.fb.group({
      "employee": new FormControl('', [Validators.required]),
      "ward": new FormControl('', [Validators.required]),
      "assignmentstatus": new FormControl('', [Validators.required]),
      "assignmentdate": new FormControl('', [Validators.required]),
      "resignateddate": new FormControl(),
      "description": new FormControl(),
    }, {updateOn: 'change' });
  }


  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.createView();

    this.ws.getAllList().then((ws: Ward[]) => {
      this.wards = ws;
    });

    this.ass.getAllList().then((ass: Assignmentstatus[]) => {
      this.assignmentstatuses = ass;
    });

    this.ds.getAllList().then((des: Designation[]) => {
      this.designations = des;
    });

    this.es.getAll("?fullname").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.rs.get('wardassignment').then((regs: []) => {
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
    this.form.controls['ward'].setValidators([Validators.required]);
    this.form.controls['assignmentstatus'].setValidators([Validators.required]);
    this.form.controls['assignmentdate'].setValidators([Validators.required]);
    this.form.controls['resignateddate'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach(control => {control.markAsTouched();});

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
        //@ts-ignore
        if (controlName == "assignmentdate" || controlName == "resignateddate")
          value = this.dp.transform(new Date(value), 'yyyy-MM-dd');


        if (this.oldwardassignment != undefined && control.valid) {
          // @ts-ignore
          if (value === this.wardassignment[controlName]) {
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

    this.was.getAll(query)
      .then((wardassignments: Wardassignment[]) => {
        this.wardassignments = wardassignments;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.wardassignments);
        this.data.paginator = this.paginator;
      });
  }

  filterTable() {
    const csearchdata = this.csearch.getRawValue();

    this.data.filterPredicate = ((wardassignment:Wardassignment,filter)=>{
      return (csearchdata.csemployee.regno==null||wardassignment.employee.number.includes(csearchdata.csemployee.regno)) &&
        (csearchdata.csward==null||wardassignment.ward.name.includes(csearchdata.csward))  &&
        (csearchdata.csassignmentstatus==null||wardassignment.assignmentstatus.name.includes(csearchdata.csassignmentstatus)) &&
        (csearchdata.csassignmentdate == null || wardassignment.assignmentdate.toLowerCase().includes(csearchdata.csassignmentdate))&&
        (csearchdata.csnumber == null || wardassignment.employee.number.toLowerCase().includes(csearchdata.csnumber)) ;
    });
    this.data.filter = 'xx';
  }

  getDate(element: Wardassignment) {
    return this.dp.transform(element.assignmentdate,'yyyy-MM-dd');
  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();
    let employeeid = sserchdata.ssemployee;
    let wardid = sserchdata.ssward;
    let assignmentstatusid = sserchdata.ssassignmentstatus;
    let designationid = sserchdata.ssdesignation;

    let query = "";

    if(employeeid!= null) query = query + "&employeeid=" +employeeid;
    if (wardid != null) query = query + "&wardid=" + wardid;
    if (assignmentstatusid != null) query = query + "&assignmentstatusid=" + assignmentstatusid;
    if (designationid != null) query = query + "&designationid=" + designationid;


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
        data: {heading: "Errors - Employee assigned to ward ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.wardassignment = this.form.getRawValue();

      let wrdasgndata: string = "";
      wrdasgndata = wrdasgndata + "<br>Employee is : " + this.wardassignment.employee.callingname;
      wrdasgndata = wrdasgndata + "<br>Employee number is : " + this.wardassignment.employee.number;
      wrdasgndata = wrdasgndata + "<br>Ward is : " + this.wardassignment.ward.name;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Ward assignment Add",
          message: "Are you sure to assign this Employee to following Ward? <br> <br>" + wrdasgndata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {

          this.was.add(this.wardassignment).then((responce: [] | undefined) => {
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
              addmessage = "Successfully Added";
              this.form.reset();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Ward assignment Add", message: addmessage}
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


    fillForm(wardassignment: Wardassignment)
    {

      // this.enableButtons(false,true,true);

      this.selectedrow = wardassignment;

      this.wardassignment = JSON.parse(JSON.stringify(wardassignment));
      this.oldwardassignment = JSON.parse(JSON.stringify(wardassignment));

      //@ts-ignore
      this.wardassignment.employee = this.employees.find(e => e.id === this.wardassignment.employee.id);

      //@ts-ignore
      this.wardassignment.ward = this.wards.find(w => w.id === this.wardassignment.ward.id);

      //@ts-ignore
      this.wardassignment.assignmentstatus = this.assignmentstatuses.find(as => as.id === this.wardassignment.assignmentstatus.id);

      this.form.patchValue(this.wardassignment);
      this.form.markAsPristine();

    }

  clear(): void {
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Ward Assignment Clear",
        message: "Are you sure to Clear following Details ? <br> <br>"
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.form.reset()
      }
    });
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


  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Ward Assignment Delete",
        message: "Are you sure to Delete following Ward Assignment? <br> <br>" + this.wardassignment.employee.fullname
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.was.delete(this.wardassignment.id).then((responce: [] | undefined) => {

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
            Object.values(this.form.controls).forEach(control => {
              control.markAsTouched();
            });
            this.loadTable("");
          }

          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status - Ward Assignment Delete ", message: delmessage}
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


  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Ward Asssignment Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Doctor Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.wardassignment = this.form.getRawValue();

            this.wardassignment.id=this.oldwardassignment.id;

            this.was.update(this.wardassignment).then((responce: [] | undefined) => {
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
                data: {heading: "Status -Ward Assignment Update", message: updmessage}
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
          data: {heading: "Confirmation - Ward Assignment Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => {
          if (!result) {
            return;
          }
        });

      }
    }
  }
}
