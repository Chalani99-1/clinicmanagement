package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ClinicattendenceDao;
import lk.earth.earthuniversity.dao.InvestigationDao;
import lk.earth.earthuniversity.entity.Clinicattendence;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Investigation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@CrossOrigin
@RestController
@RequestMapping(value = "/investigations")
public class InvestigationController {

    @Autowired
    private InvestigationDao investigationdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Investigation> get(@RequestParam HashMap<String, String> params) {

        List<Investigation> investigations = this.investigationdao.findAll();

        if(params.isEmpty())  return investigations;
        System.out.println(investigations);


        String employeeid= params.get("employeeid");
        String patientattendenceid= params.get("patientattendenceid");
        String patientnic = params.get("patientnic");
        String investigationstatusid = params.get("investigationstatusid");
        String investigationresultid = params.get("investigationresultid");
        String reporttypeid = params.get("reporttypeid");



        Stream<Investigation> istream = investigations.stream();

        if(employeeid!=null) istream = istream.filter(ca -> ca.getEmployee().getId()==Integer.parseInt(employeeid));
        if(patientattendenceid!=null) istream = istream.filter(ca -> ca.getPatientattendence().getPatient().getId()==Integer.parseInt(patientattendenceid));
        if(patientnic!=null) istream = istream.filter(e -> e.getPatientattendence().getPatient().getNic().equals(patientnic));
        if(investigationstatusid!=null) istream = istream.filter(ca -> ca.getInvestigationstatus().getId()==Integer.parseInt(investigationstatusid));
        if(investigationresultid!=null) istream = istream.filter(ca -> ca.getInvestigationresult().getId()==Integer.parseInt(investigationresultid));
        if(reporttypeid!=null) istream = istream.filter(ca -> ca.getReporttype().getId()==Integer.parseInt(reporttypeid));
        return istream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String,String> add(@RequestBody Investigation investigation){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(errors=="")
            investigationdao.save(investigation);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(investigation.getId()));
        responce.put("url","/investigations/"+investigation.getId());
        responce.put("errors",errors);

        return responce;
    }


    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Investigation investigation){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(errors=="") investigationdao.save(investigation);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(investigation.getId()));
        responce.put("url","/investigations/"+investigation.getId());
        responce.put("errors",errors);

        return responce;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Investigation inv = investigationdao.findByMyId(id);

        if(inv==null)
            errors = errors+"<br> Investigation Does Not Existed";

        if(errors=="") investigationdao.delete(inv);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/investigations/"+id);
        responce.put("errors",errors);

        return responce;
    }

}

