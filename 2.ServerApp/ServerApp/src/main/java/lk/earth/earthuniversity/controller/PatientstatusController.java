package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.dao.PatientstatusDao;
import lk.earth.earthuniversity.entity.Gender;
import lk.earth.earthuniversity.entity.Patientstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/patientstatuses")
public class PatientstatusController {

    @Autowired
    private PatientstatusDao patientstatusdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Patientstatus> get() {

        List<Patientstatus> patientstatuses = this.patientstatusdao.findAll();

        patientstatuses = patientstatuses.stream().map(
                patientstatus -> { Patientstatus ps = new Patientstatus();
                            ps.setId(patientstatus.getId());
                            ps.setName(patientstatus.getName());
                            return ps; }
        ).collect(Collectors.toList());

        return patientstatuses;

    }

}


