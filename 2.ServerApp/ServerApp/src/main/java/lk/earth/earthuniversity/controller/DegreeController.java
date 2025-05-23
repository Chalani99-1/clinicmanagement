package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DegreeDao;
import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.entity.Degree;
import lk.earth.earthuniversity.entity.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/degrees")
public class DegreeController {

    @Autowired
    private DegreeDao degreedao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Degree> get(@RequestParam HashMap<String,String>params) {

        List<Degree> degrees = new ArrayList<Degree>();

        if(params.isEmpty()) degrees = this.degreedao.findAll();
        String universityid = params.get("universityid");

        if(universityid!=null) degrees=this.degreedao.findAllByDegree(Integer.parseInt(universityid));

        return degrees;
    }

}


