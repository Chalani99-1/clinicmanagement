package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ClinicattendenceDao;
import lk.earth.earthuniversity.entity.Clinicattendence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@CrossOrigin
@RestController
@RequestMapping(value = "/clinicattendences")
public class ClinicattendenceController {

    @Autowired
    private ClinicattendenceDao clinicattendencedao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Clinicattendence> get(@RequestParam HashMap<String, String> params) {

        List<Clinicattendence> clinicattendences = this.clinicattendencedao.findAll();

        if(params.isEmpty())  return clinicattendences;
        System.out.println(clinicattendences);


        String employeeid= params.get("employeeid");
        String clinicid= params.get("clinicid");
        String date = params.get("date");

        Stream<Clinicattendence> castream = clinicattendences.stream();

        if(employeeid!=null) castream = castream.filter(ca -> ca.getEmployee().getId()==Integer.parseInt(employeeid));
        if(clinicid!=null) castream = castream.filter(ca -> ca.getClinic().getId()==Integer.parseInt(clinicid));
        if(date!=null) castream = castream.filter(ca -> ca.getClinic().getDate().equals(date));
        return castream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Insert')")
    public HashMap<String,String> add(@RequestBody Clinicattendence clinicattendence){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(errors=="")
            clinicattendencedao.save(clinicattendence);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(clinicattendence.getId()));
        responce.put("url","/clinicattendences/"+clinicattendence.getId());
        responce.put("errors",errors);

        return responce;
    }


    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Clinicattendence clinicattendence){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(errors=="") clinicattendencedao.save(clinicattendence);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(clinicattendence.getId()));
        responce.put("url","/clinicattendences/"+clinicattendence.getId());
        responce.put("errors",errors);

        return responce;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Clinicattendence clcattendence = clinicattendencedao.findByMyId(id);

        if(clcattendence==null)
            errors = errors+"<br> Clinic Attendence Does Not Existed";

        if(errors=="") clinicattendencedao.delete(clcattendence);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/clinicattendences/"+id);
        responce.put("errors",errors);

        return responce;
    }

}

