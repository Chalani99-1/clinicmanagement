package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.EmployeeDao;
import lk.earth.earthuniversity.dao.PatientattendenceDao;
import lk.earth.earthuniversity.entity.Employee;
import lk.earth.earthuniversity.entity.Patientattendence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/patientattendences")
public class PatientattendenceController {

    @Autowired
    private PatientattendenceDao patientattendencedao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Patientattendence> get(@RequestParam HashMap<String, String> params) {

        List<Patientattendence> patientattendences = this.patientattendencedao.findAll();

        if(params.isEmpty())  return patientattendences;

        String date = params.get("date");
        String patientid= params.get("patientid");
        String clinicid= params.get("clinicid");
        String patientattendencestatusid= params.get("patientattendencestatusid");

        Stream<Patientattendence> pastream = patientattendences.stream();

        if(date!=null) pastream = pastream.filter(pa -> pa.getDate().toString().equals(date));
        if(patientid!=null) pastream = pastream.filter(pa -> pa.getPatient().getId()==Integer.parseInt(patientid));
        if(patientattendencestatusid!=null) pastream = pastream.filter(pa -> pa.getPatientattendencestatus().getId()==Integer.parseInt(patientattendencestatusid));
        if(clinicid!=null) pastream = pastream.filter(pa -> pa.getClinic().getId()==Integer.parseInt(clinicid));
        return pastream.collect(Collectors.toList());

    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String,String> add(@RequestBody Patientattendence patientattendence){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(errors=="")
        patientattendencedao.save(patientattendence);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(patientattendence.getId()));
        responce.put("url","/patientattendences/"+patientattendence.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Patientattendence patientattendence){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(errors=="") patientattendencedao.save(patientattendence);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(patientattendence.getId()));
        responce.put("url","/patientattendences/"+patientattendence.getId());
        responce.put("errors",errors);

        return responce;
    }

//
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Patientattendence pntatndnc = patientattendencedao.findByMyId(id);

        if(pntatndnc==null)
            errors = errors+"<br> Patient Attendence Does Not Existed";

        if(errors=="") patientattendencedao.delete(pntatndnc);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/patientattendences/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




