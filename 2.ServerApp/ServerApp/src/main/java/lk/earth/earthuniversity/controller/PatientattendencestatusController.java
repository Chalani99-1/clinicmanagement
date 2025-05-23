package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.PatientattendencestatusDao;
import lk.earth.earthuniversity.entity.Patientattendencestatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/patientattendencestatuses")
public class PatientattendencestatusController {

    @Autowired
    private PatientattendencestatusDao patientattendencestatusdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Patientattendencestatus> get() {

        List<Patientattendencestatus> patientattendencestatuses = this.patientattendencestatusdao.findAll();

        patientattendencestatuses = patientattendencestatuses.stream().map(
                patientattendencestatus -> { Patientattendencestatus pas = new Patientattendencestatus();
                            pas.setId(patientattendencestatus.getId());
                            pas.setName(patientattendencestatus.getName());
                            return pas; }
        ).collect(Collectors.toList());

        return patientattendencestatuses;

    }

}


