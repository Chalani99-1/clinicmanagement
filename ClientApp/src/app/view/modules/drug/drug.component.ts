import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../entity/user";
import {MatPaginator} from "@angular/material/paginator";
import {Employee} from "../../../entity/employee";
import {Drug} from "../../../entity/drug";
import {UiAssist} from "../../../util/ui/ui.assist";
import {EmployeeService} from "../../../service/employeeservice";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {RegexService} from "../../../service/regexservice";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Drugservice} from "../../../service/drugservice";
import {Userstatus} from "../../../entity/userstatus";
import {Usrtype} from "../../../entity/usrtype";
import {Role} from "../../../entity/role";
import {Brand} from "../../../entity/brand";
import {Generic} from "../../../entity/generic";
import {Drugstatus} from "../../../entity/drugstatus";
import {Drugform} from "../../../entity/drugform";
import {Drugroute} from "../../../entity/drugroute";
import {Brandservice} from "../../../service/brandservice";
import {Gender} from "../../../entity/gender";
import {Genericservice} from "../../../service/genericservice";
import {Drugstatusservice} from "../../../service/drugstatusservice";
import {Drugformservice} from "../../../service/drugformservice";
import {Drugrouteservice} from "../../../service/drugrouteservice";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {MatSelectionList} from "@angular/material/list";
import {Contrantindication} from "../../../entity/contrantindication";
import {Contrantindicationservice} from "../../../service/contrantindicationservice";
import {Drugcontraindication} from "../../../entity/drugcontraindication";
import {Userrole} from "../../../entity/userrole";
import {Adverseeffect} from "../../../entity/adverseeffect";
import {Drugadverseeffect} from "../../../entity/drugadverseeffect";
import {Drugindication} from "../../../entity/drugindication";
import {Indication} from "../../../entity/indication";
import {Adverseeffectservice} from "../../../service/adverseeffectservice";
import {Indicationservice} from "../../../service/indicationservice";
import {MessageComponent} from "../../../util/dialog/message/message.component";

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent  {

  columns: string[] = ['code','name','brand', 'drugstatus','qoh'];
  headers: string[] = ['Code','Name', 'Brand','Status','Quantity'];
  binders: string[] = ['code','name','brand.name', 'drugstatus.name','qoh'];

  cscolumns: string[] = ['cscode','csname', 'csbrand','csdrugstatus','csqoh'];
  csprompts: string[] = ['Search by Code','Search by Name','Search by Brand',
    'Search by Drug Status','Search by Quantity'];


  productionordersubscription: any;

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  drugs: Array<Drug> = [];
  data!: MatTableDataSource<Drug>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  imageempurl: string = 'assets/ddrug.png'

  employees: Array<Employee> = [];
  brands : Array<Brand>=[];
  generics:Array<Generic> =[];
  drugstatuses:Array<Drugstatus>=[];
  drugforms:Array<Drugform>=[];
  drugroutes:Array<Drugroute>=[];
  drugcontraindications:Array<Drugcontraindication>=[];
  drugadverseeffects:Array<Drugadverseeffect>=[];
  drugindications:Array<Drugindication>=[];


  @Input()contraindications: Array<Contrantindication> = [];
  oldcontraindications:Array<Contrantindication>=[];
  @Input()selectedcontraindications: Array<Contrantindication> =[];

  @Input()adverseeffects: Array<Adverseeffect> = [];
  oldadverseeffects:Array<Adverseeffect>=[];
  @Input()selectedadverseeffects: Array<Adverseeffect> =[];

  @Input()indications: Array<Indication> = [];
  oldindications:Array<Indication>=[];
  @Input()selectedindications: Array<Indication> =[];

  uiassist: UiAssist;

  regexes:any;
  selectedrow: any;

  enaadd:boolean = false;
  enaupd:boolean = false;
  enadel:boolean = false;

  drug!:Drug;
  olddrug!:Drug;


  @ViewChild('availablelist1') availablelist1!: MatSelectionList;
  @ViewChild('selectedlist1') selectedlist1!: MatSelectionList;

  @ViewChild('availablelist2') availablelist2!: MatSelectionList;
  @ViewChild('selectedlist2') selectedlist2!: MatSelectionList;

  @ViewChild('availablelist3') availablelist3!: MatSelectionList;
  @ViewChild('selectedlist3') selectedlist3!: MatSelectionList;

  constructor(
    private ds:Drugservice,
    private fb:FormBuilder,
    private bs:Brandservice,
    private gs:Genericservice,
    private dss:Drugstatusservice,
    private dfs:Drugformservice,
    private drs:Drugrouteservice,
    private es:EmployeeService,
    private cs:Contrantindicationservice,
    private as:Adverseeffectservice,
    private ins:Indicationservice,
    private dp:DatePipe,
    private dg:MatDialog,
    private rx:RegexService,
    public authService:AuthorizationManager
  ){

    this.uiassist = new UiAssist(this);
    this.drug = new Drug();

    this.csearch = this.fb.group({
      "csname": new FormControl(),
      "csbrand": new FormControl(),
      "csdrugstatus": new FormControl(),
      "csqoh": new FormControl(),
      "cscode": new FormControl()
    });

    this.ssearch = this.fb.group({
      "ssgeneric": new FormControl(),
      "ssbrand": new FormControl(),
      "ssdrugstatus": new FormControl(),
      "ssdrugform": new FormControl(),
      "ssdrugroute": new FormControl(),
      "sscode": new FormControl()
    });

    this.form = this.fb.group({
      "code": new FormControl('',[Validators.required]),
      "generic": new FormControl('',[Validators.required]),
      "brand": new FormControl('',[Validators.required]),
      "drugform": new FormControl('',[Validators.required]),
      "drugroute": new FormControl('',[Validators.required]),
      "strength": new FormControl('',[Validators.required]),
      "photo": new FormControl(),
      "qoh": new FormControl('',[Validators.required]),
      "rop": new FormControl('',[Validators.required]),
      "drugstatus": new FormControl('',[Validators.required]),
      //"dointroduced": new FormControl('',[Validators.required]),
      "drugcontraindications": new FormControl(),
      "drugadverseeffects": new FormControl(),
      "drugindications": new FormControl(),
      "employee": new FormControl('',[Validators.required]),

    },{updateOn:'change'});
  }


  async ngOnInit(): Promise<void> {
    this.initialize();
  }

  initialize(){

    this.createView();

    this.bs.getAllList().then((brnds: Brand[]) => {
      this.brands = brnds;
    });

    this.gs.getAllList().then((gnrcs: Generic[]) => {
      this.generics = gnrcs;
    });

    this.dss.getAllList().then((drugss: Drugstatus[]) => {
      this.drugstatuses = drugss;
    });

    this.es.getAll("?designationid=3").then((emps: Employee[]) => {
      this.employees = emps;
    });

    this.dfs.getAllList().then((drugfs: Drugform[]) => {
      this.drugforms = drugfs;
    });

    this.drs.getAllList().then((drugrd: Drugroute[]) => {
      this.drugroutes = drugrd;
    });

    this.cs.getAllList().then((cntri:Contrantindication[])=>{
      this.contraindications = cntri;
      this.oldcontraindications = Array.from(this.contraindications);
    });

    this.as.getAllList().then((adve:Adverseeffect[])=>{
      this.adverseeffects = adve;
      this.oldadverseeffects = Array.from(this.adverseeffects);
    });

    this.ins.getAllList().then((inds:Indication[])=>{
      this.indications = inds;
      this.oldindications = Array.from(this.indications);
    });

    this.rx.get("drugs").then((regs:[])=>{
      this.regexes = regs;
      this.createForm();
    });
  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }

  loadTable(query:string):void{


    this.ds.getAll(query)
      .then((drgs: Drug[]) => {
        this.drugs = drgs;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.drugs);
        this.data.paginator = this.paginator;
      });

  }


  // generateName(brand:string, generic:string,strength:string){
  //   return brand+ "-("+generic+")-"+strength;
  // }

  // getnameModi(element:Drug){
  //   return element.brand.name + "-("+element.generic.name+")-"+element.strength;
  // }
  filterTable(): void {
    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (drug: Drug, filter: string) => {
      return (cserchdata.cscode == null || drug.code.toString().includes(cserchdata.cscode)) &&
        // (cserchdata.csgeneric == null || drug.generic.name.includes(cserchdata.csgeneric)) &&
        //  (cserchdata.csbrand == null || drug.brand.name.includes(cserchdata.csbrand)) &&
        (cserchdata.csqoh == null || drug.qoh.toString().includes(cserchdata.csqoh)) &&
        (cserchdata.csdrugstatus == null || drug.drugstatus.name.includes(cserchdata.csdrugstatus))&&
        (cserchdata.csname == null || drug.name.includes(cserchdata.csname));
    };

    this.data.filter = 'xx';

  }

  createForm() {
    this.form.controls['code'].setValidators([Validators.required,Validators.pattern(this.regexes['code']['regex'])]);
    this.form.controls['generic'].setValidators([Validators.required]);
    this.form.controls['brand'].setValidators([Validators.required]);
    this.form.controls['drugform'].setValidators([Validators.required]);
    this.form.controls['drugruote'].setValidators([Validators.required]);
    this.form.controls['strength'].setValidators([Validators.required]);
    this.form.controls['photo'].setValidators([Validators.required]);
    this.form.controls['qoh'].setValidators([Validators.required,Validators.pattern(this.regexes['qoh']['regex'])]);
    this.form.controls['rop'].setValidators([Validators.required,Validators.pattern(this.regexes['rop']['regex'])]);
    this.form.controls['drugstatus'].setValidators([Validators.required]);
    //this.form.controls['dointroduced'].setValidators([Validators.required]);
    this.form.controls['drugcontraindications'].setValidators([Validators.required]);
    this.form.controls['drugadverseeffects'].setValidators([Validators.required]);
    this.form.controls['drugindications'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);
    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "dointroduced")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

          if (this.olddrug != undefined && control.valid) {
            // @ts-ignore
            if (value === this.drug[controlName]) {
              control.markAsPristine();
            } else {
              control.markAsDirty();
            }
          } else {
            control.markAsPristine();
          }
        }
      );

    }

    this.enableButtons(true,false,false);
    this.filterBrand()
  }

  enableButtons(add:boolean, upd:boolean, del:boolean){
    this.enaadd=add;
    this.enaupd=upd;
    this.enadel=del;
  }
  filterBrand(){
    if (this.productionordersubscription) {
      this.productionordersubscription.unsubscribe();
    }
    this.productionordersubscription = this.form.get("generic")?.valueChanges.subscribe((g: Generic) => {
      if (g) {
        console.log(g)
        this.brands = g.brands.filter((b:Brand) => b.generic.id === g.id);

      }
    });
  }

  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageempurl = event.target.result;
        this.form.controls['photo'].clearValidators();
      }
    }
  }

  clearImage(): void {
    this.imageempurl = 'assets/ddrug.png';
    this.form.controls['photo'].setErrors({'required': true});
  }



  rightSelected1(): void {
    this.drug.drugcontraindications = this.availablelist1.selectedOptions.selected.map(option => {
      const drugContri = new Drugcontraindication(option.value);
      this.contraindications = this.contraindications.filter(contraindication => contraindication !== option.value); //Remove Selected
      this.drugcontraindications.push(drugContri); // Add selected to Right Side
      return drugContri;
    });

    this.form.controls["drugcontraindications"].clearValidators();
    this.form.controls["drugcontraindications"].updateValueAndValidity(); // Update status
  }

  leftSelected1(): void {
    const selectedOptions = this.selectedlist1.selectedOptions.selected; // Right Side
    for (const option of selectedOptions) {
      const extDrugContr = option.value;
      this.drugcontraindications = this.drugcontraindications.filter(contraindication =>{
        contraindication !== extDrugContr
      }); // Remove the Selected one From Right Side
      this.contraindications.push(extDrugContr.contraindication);
    }

  }

  rightAll1(): void {
    this.drug.drugcontraindications = this.availablelist1.selectAll().map(option => {
      const drugContr = new Drugcontraindication(option.value);
      this.contraindications = this.contraindications.filter(contraindication => contraindication !== option.value);
      this.drugcontraindications.push(drugContr);
      return drugContr;
    });

    this.form.controls["drugcontraindications"].clearValidators();
    this.form.controls["drugcontraindications"].updateValueAndValidity();

  }

  leftAll1():void{
    for(let drugcontraindication of this.drugcontraindications) this.contraindications.push(drugcontraindication.contraindication);
    this.drugcontraindications = [];
  }

  // ************************************************************


  rightSelected2(): void {
    this.drug.drugadverseeffects = this.availablelist2.selectedOptions.selected.map(option => {
      const drugAdve = new Drugadverseeffect(option.value);
      this.adverseeffects = this.adverseeffects.filter(adverseeffect => adverseeffect !== option.value); //Remove Selected
      this.drugadverseeffects.push(drugAdve); // Add selected to Right Side
      return drugAdve;
    });

    this.form.controls["drugadverseeffects"].clearValidators();
    this.form.controls["drugadverseeffects"].updateValueAndValidity(); // Update status
  }

  leftSelected2(): void {
    const selectedOptions = this.selectedlist2.selectedOptions.selected; // Right Side
    for (const option of selectedOptions) {
      const extDrugAdvs = option.value;
      this.drugadverseeffects = this.drugadverseeffects.filter(adverseeffect =>{
        adverseeffect !== extDrugAdvs
      }); // Remove the Selected one From Right Side
      this.adverseeffects.push(extDrugAdvs.adverseeffect);
    }

  }

  rightAll2(): void {
    this.drug.drugadverseeffects = this.availablelist2.selectAll().map(option => {
      const drugAdv = new Drugadverseeffect(option.value);
      this.adverseeffects = this.adverseeffects.filter(adverseeffect => adverseeffect !== option.value);
      this.drugadverseeffects.push(drugAdv);
      return drugAdv;
    });

    this.form.controls["drugadverseeffects"].clearValidators();
    this.form.controls["drugadverseeffects"].updateValueAndValidity();

  }

  leftAll2():void{
    for(let drugadverseeffect of this.drugadverseeffects) this.adverseeffects.push(drugadverseeffect.adverseeffect);
    this.drugadverseeffects = [];
  }

  // ************************************************************

  rightSelected3(): void {
    this.drug.drugindications = this.availablelist3.selectedOptions.selected.map(option => {
      const drugInde = new Drugindication(option.value);
      this.indications = this.indications.filter(indication => indication !== option.value); //Remove Selected
      this.drugindications.push(drugInde); // Add selected to Right Side
      return drugInde;
    });

    this.form.controls["drugindications"].clearValidators();
    this.form.controls["drugindications"].updateValueAndValidity(); // Update status
  }

  leftSelected3(): void {
    const selectedOptions = this.selectedlist3.selectedOptions.selected; // Right Side
    for (const option of selectedOptions) {
      const extDrugInd = option.value;
      this.drugindications = this.drugindications.filter(indication =>{
        indication !== extDrugInd
      }); // Remove the Selected one From Right Side
      this.indications.push(extDrugInd.indication);
    }

  }

  rightAll3(): void {
    this.drug.drugindications = this.availablelist3.selectAll().map(option => {
      const drugIndi = new Drugindication(option.value);
      this.indications = this.indications.filter(indication => indication !== option.value);
      this.drugindications.push(drugIndi);
      return drugIndi;
    });

    this.form.controls["drugindications"].clearValidators();
    this.form.controls["drugindications"].updateValueAndValidity();

  }

  leftAll3():void{
    for(let drugindication of this.drugindications) this.indications.push(drugindication.indication);
    this.drugindications = [];
  }




  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();


    let code = sserchdata.sscode;
    let brandid = sserchdata.ssbrand;
    let genericid = sserchdata.ssgeneric;
    let drugstatusid = sserchdata.ssdrugstatus;
    let drugformid = sserchdata.ssdrugform;
    let drugrouteid = sserchdata.ssdrugroute

    let query = "";

    if (code != null && code.toString().trim() != "") query = query + "&code=" + code;
    if (brandid != null) query = query + "&brandid=" + brandid;
    if (genericid != null) query = query + "&genericid=" + genericid;
    if (drugstatusid != null) query = query + "&drugstatusid=" + drugstatusid;
    if (drugformid != null) query = query + "&drugformid=" + drugformid;
    if (drugrouteid != null) query = query + "&drugrouteid=" + drugrouteid;

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

    let errors: string = ""

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
    console.log(this.drug)

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Drug Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      let drug:Drug = this.form.getRawValue();

      drug.name = drug.generic.name + "-(" + drug.brand.name + ")-" + drug.strength;


      // console.log(user);
      drug.drugcontraindications = this.drug.drugcontraindications;
      drug.drugadverseeffects = this.drug.drugadverseeffects;
      drug.drugindications = this.drug.drugindications;

      this.drug = drug;

      this.drug.photo = btoa(this.imageempurl);

      let drgdata: string = "";

      //drgdata = drgdata + "<br>Drug name is : " + this.drug.name + ;
      drgdata = drgdata + "<br>Code is : " + this.drug.code;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Drug Add",
          message: "Are you sure to Add the folowing Drug? <br> <br>" + drgdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          console.log(JSON.stringify(this.drug));
          this.ds.add(this.drug).then((responce: [] | undefined) => {
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
              this.drugcontraindications = [];
              this.drugadverseeffects=[];
              this.drugindications=[];
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Drug Add", message: addmessage}
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


  fillForm(drug: Drug) {

    this.enableButtons(false,true,true);

    this.contraindications = Array.from(this.oldcontraindications);
    this.adverseeffects = Array.from(this.oldadverseeffects);
    this.indications = Array.from(this.oldindications);


    this.selectedrow=drug;

    this.drug = JSON.parse(JSON.stringify(drug));
    this.olddrug = JSON.parse(JSON.stringify(drug));

    if (this.drug.photo != null) {
      this.imageempurl = atob(this.drug.photo);
      this.form.controls['photo'].clearValidators();
    } else {
      this.clearImage();
    }
    this.drug.photo = "";

    //@ts-ignore
    this.drug.generic = this.generics.find(g => g.id === this.drug.generic.id);

    //@ts-ignore
    this.drug.brand = this.brands.find(b => b.id === this.drug.brand.id);

    //@ts-ignore
    this.drug.drugform = this.drugforms.find(df => df.id === this.drug.drugform.id);

    //@ts-ignore
    this.drug.drugroute = this.drugroutes.find(dr => dr.id === this.drug.drugroute.id);

    //@ts-ignore
    this.drug.drugstatus = this.drugstatuses.find(ds => ds.id === this.drug.drugstatus.id);

    //@ts-ignore
    this.drug.drugstatus = this.drugstatuses.find(ds => ds.id === this.drug.drugstatus.id);

    //@ts-ignore
    this.drug.employee = this.employees.find(e => e.id === this.drug.employee.id);
    // //@ts-ignore
    // this.user.usestatus = this.userstatues.find(s => s.id === this.user.usestatus.id);
    //
    // //@ts-ignore
    // this.user.usetype = this.usertypes.find(s => s.id === this.user.usetype.id);

    this.drugcontraindications = this.drug.drugcontraindications; // Load Drug Contraindications
    this.drugadverseeffects = this.drug.drugadverseeffects;
    this.drugindications = this.drug.drugindications;

    this.drug.drugcontraindications.forEach((dc)=> this.contraindications = this.contraindications.filter((c)=> c.id != dc.contraindication.id )); // Load or remove contraindication by comparing with drug.drugcontraindication
    this.drug.drugadverseeffects.forEach((da)=> this.adverseeffects = this.adverseeffects.filter((a)=> a.id != da.adverseeffect.id ));
    this.drug.drugindications.forEach((di)=> this.indications = this.indications.filter((i)=> i.id != di.indication.id ));

    this.form.patchValue(this.drug);
    // this.form.controls["username"].disable();
    this.form.markAsPristine();

  }

  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1)+" Changed";
      }
    }
    return updates;
  }

  update() {

    let errors = this.getErrors();

    if (errors != "") {

      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Drug Update ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Drug Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("EmployeeService.update()");
            this.drug = this.form.getRawValue();
            if (this.form.controls['photo'].dirty) this.drug.photo = btoa(this.imageempurl);
            else this.drug.photo = this.olddrug.photo;
            this.drug.id = this.olddrug.id;

            this.ds.update(this.drug).then((responce: [] | undefined) => {
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
            } ).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                this.clearImage();
                this.leftAll1();
                this.leftAll2();
                this.leftAll3();
                Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Drug Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
      }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Drug Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }
  }

  delete() : void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Drug Delete",
        message: "Are you sure to Delete following Drug? <br> <br>" + this.drug.code
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.ds.delete(this.drug.id).then((responce: [] | undefined) => {

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
            this.leftAll1();
            this.leftAll2();
            this.leftAll3();
            Object.values(this.form.controls).forEach(control => {
              control.markAsTouched();
            });
            this.loadTable("");
          }
          const stsmsg = this.dg.open(MessageComponent, {
            width: '500px',
            data: {heading: "Status -Drug Delete ", message: delmessage}
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

  clear():void{
    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Drug Clear",
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
