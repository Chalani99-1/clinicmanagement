package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DistrictDao;
import lk.earth.earthuniversity.entity.District;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/districts")
public class DistrictController {

    @Autowired
    private DistrictDao districtdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<District> get(@RequestParam HashMap<String,String>params) {

        List<District> districts = this.districtdao.findAll();

        if(params.isEmpty()) return districts;

        String provinceid = params.get("provinceid");

        Stream<District> dstream = districts.stream();

        if(provinceid!=null) dstream=dstream.filter((s->s.getProvince().getId()==Integer.parseInt(provinceid)));

        return dstream.collect(Collectors.toList());


    }

}


