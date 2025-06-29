package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.BloodgroupDao;
import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.entity.Bloodgroup;
import lk.earth.earthuniversity.entity.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/bloodgroups")
public class BloodgroupController {

    @Autowired
    private BloodgroupDao bloodgroupdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Bloodgroup> get() {

        List<Bloodgroup> bloodgroups = this.bloodgroupdao.findAll();

        bloodgroups = bloodgroups.stream().map(
                bloodgroup -> { Bloodgroup bg = new Bloodgroup();
                            bg.setId(bloodgroup.getId());
                            bg.setName(bloodgroup.getName());
                            return bg; }
        ).collect(Collectors.toList());

        return bloodgroups;

    }

}


