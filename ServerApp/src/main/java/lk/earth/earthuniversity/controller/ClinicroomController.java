package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ClinicroomDao;
import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.entity.Clinicroom;
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
@RequestMapping(value = "/clinicrooms")
public class ClinicroomController {

    @Autowired
    private ClinicroomDao clinicroomdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Clinicroom> get() {

        List<Clinicroom> clinicrooms = this.clinicroomdao.findAll();

        clinicrooms = clinicrooms.stream().map(
                clinicroom -> { Clinicroom cr = new Clinicroom();
                            cr.setId(clinicroom.getId());
                            cr.setName(clinicroom.getName());
                            return cr; }
        ).collect(Collectors.toList());

        return clinicrooms;

    }

}


