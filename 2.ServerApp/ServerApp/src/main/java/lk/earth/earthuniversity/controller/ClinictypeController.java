package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ClinictypeDao;
import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.entity.Clinictype;
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
@RequestMapping(value = "/clinictypes")
public class ClinictypeController {

    @Autowired
    private ClinictypeDao clinictypedao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Clinictype> get() {

        List<Clinictype> clinictypes = this.clinictypedao.findAll();

        clinictypes = clinictypes.stream().map(
                clinictype-> { Clinictype ct = new Clinictype();
                            ct.setId(clinictype.getId());
                            ct.setName(clinictype.getName());
                            return ct; }
        ).collect(Collectors.toList());

        return clinictypes;

    }

}


