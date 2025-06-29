package lk.earth.earthuniversity.controller;


import lk.earth.earthuniversity.dao.DrugDao;
import lk.earth.earthuniversity.entity.Drug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/drugs")
public class DrugController {

    @Autowired
    private DrugDao drugdao;

    @GetMapping(produces = "application/json")
    public List<Drug> get(@RequestParam HashMap<String, String> params) {
        List<Drug> drugs = this.drugdao.findAll();

        if (params.isEmpty()) {
            return drugs;
        }

        String brandid = params.get("brandid");
        String drugstatusid = params.get("drugstatusid");
        String code = params.get("code");
        String drugformid = params.get("drugformid");
        String drugrouteid = params.get("drugrouteid");
        String genericid = params.get("genericid");

        Stream<Drug> dstream = drugs.stream();
        if (genericid!=null) dstream = dstream.filter(d->d.getGeneric().getId()==Integer.parseInt(genericid));
        if (brandid != null) dstream = dstream.filter(d -> d.getBrand().getId()==Integer.parseInt(brandid));
        if (drugstatusid != null) dstream = dstream.filter(d -> d.getDrugstatus().getId()==Integer.parseInt(drugstatusid));
        if (drugformid != null) dstream = dstream.filter(d -> d.getDrugform().getId()==Integer.parseInt(drugformid));
        if (code!=null) dstream = dstream.filter(d -> d.getCode().contains(code));
        if (drugrouteid != null) dstream = dstream.filter(d -> d.getDrugroute().getId()==Integer.parseInt(drugrouteid));

        return dstream.collect(Collectors.toList());
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> add(@RequestBody Drug drug){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

       if(drugdao.findByCode(drug.getCode())!=null)
           errors = errors+"<br> Existing Code";

//        if(drugdao.findByName(drug.getName())!=null)
//            errors = errors+"<br> Existing Name";

        if(errors==""){

            drugdao.save(drug);

            responce.put("id",String.valueOf(drug.getId()));
            responce.put("url","/drugs/"+drug.getId());
            responce.put("errors",errors);

            return responce;
        }

        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(drug.getId()));
        responce.put("url","/drugs/"+drug.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> update(@RequestBody Drug drug) {

        HashMap<String, String> response = new HashMap<>();
        String errors = "";

        Drug drug1=  drugdao.findByCode(drug.getCode());
       // Drug drug2=  drugdao.findByName(drug.getName());

        if(drug1!=null && drug.getId()!=drug1.getId())
            errors = errors+"<br> Existing Drug ";

//        if(drug2!=null && drug.getId()!=drug2.getId())
//            errors = errors+"<br> Existing Drug ";

        if(errors=="") drugdao.save(drug);
        else errors = "Server Validation Errors : <br> "+errors;

        response.put("id",String.valueOf(drug.getId()));
        response.put("url","/drugs/"+drug.getId());
        response.put("errors",errors);

        return response;

        }




    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Drug drug = drugdao.findByMyId(id);

        if(drug==null)
            errors = errors+"<br>  Drug is Not Exist";

        if(errors=="") drugdao.delete(drug);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("username",String.valueOf(id));
        responce.put("url","/drugs/"+id);
        responce.put("errors",errors);

        return responce;
    }

}
