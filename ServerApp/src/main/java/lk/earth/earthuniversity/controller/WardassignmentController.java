package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DoctorDao;
import lk.earth.earthuniversity.dao.WardassignmentDao;
import lk.earth.earthuniversity.entity.Clinic;
import lk.earth.earthuniversity.entity.Doctor;
import lk.earth.earthuniversity.entity.Wardassignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@CrossOrigin
@RestController
@RequestMapping(value = "/wardassignments")
public class WardassignmentController {

    @Autowired
    private WardassignmentDao wardassignmentdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('employee-select')")
    public List<Wardassignment> get(@RequestParam HashMap<String,String> params) {
        List<Wardassignment> wardassignments= this.wardassignmentdao.findAll();

        if(params.isEmpty()) return wardassignments;

        String wardid = params.get("wardid");
        String employeeid = params.get("employeeid");
        String assignmentstatusid = params.get("assignmentstatusid");
        String designationid = params.get("designationid");

        Stream<Wardassignment> wastream = wardassignments.stream();


        if(wardid!=null) wastream = wastream.filter(wa->wa.getWard().getId()==Integer.parseInt(wardid));
        if(employeeid!=null) wastream = wastream.filter(wa->wa.getEmployee().getId()==Integer.parseInt(employeeid));
        if(assignmentstatusid!=null) wastream = wastream.filter(wa->wa.getAssignmentstatus().getId()==Integer.parseInt(assignmentstatusid));
        if(designationid!=null) wastream = wastream.filter(wa->wa.getEmployee().getDesignation().getId()==Integer.parseInt(designationid));


        return wastream.collect(Collectors.toList());

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)

    public HashMap<String,String> add(@RequestBody Wardassignment wardassignment){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

//        if(wardassignmentdao.findByMyEmpId(wardassignment.getEmployee().getNumber())!=null)
//            errors = errors+"<br> Existing Employee";

        if(errors=="")
            wardassignmentdao.save(wardassignment);
        else
            errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(wardassignment.getId()));
        responce.put("url","/wardassignments/"+wardassignment.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Employee-Update')")
    public HashMap<String,String> update(@RequestBody Wardassignment wardassignment){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";


        if(errors=="") wardassignmentdao.save(wardassignment);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(wardassignment.getId()));
        responce.put("url","/wardassignments/"+wardassignment.getId());
        responce.put("errors",errors);

        return responce;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        System.out.println(id);

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Wardassignment wrdas = wardassignmentdao.findByMyId(id);

        if(wrdas==null)
            errors = errors+"<br> Ward Assignment Does Not Existed";

        if(errors=="") wardassignmentdao.delete(wrdas);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/wardassignments/"+id);
        responce.put("errors",errors);

        return responce;
    }
}




