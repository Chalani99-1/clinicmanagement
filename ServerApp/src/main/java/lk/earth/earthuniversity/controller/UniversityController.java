package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.dao.UniversityDao;
import lk.earth.earthuniversity.entity.Gender;
import lk.earth.earthuniversity.entity.University;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/universities")
public class UniversityController {

    @Autowired
    private UniversityDao universitydao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<University> get(@RequestParam HashMap<String,String>params) {

        List<University> universities = this.universitydao.findAll();

       if(params.isEmpty()) return universities;
       String countryid = params.get("countryid");

        System.out.println(countryid);
       Stream<University> ustream = universities.stream();
       if(countryid!=null) ustream = ustream.filter((u->u.getCountry().getId()==Integer.parseInt(countryid)));
       return ustream.collect(Collectors.toList());

    }

}


