package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.PrescriptionstatusDao;
import lk.earth.earthuniversity.entity.Prescriptionstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/prescriptionstatuses")
public class PrescriptionstatusController {

    @Autowired
    private PrescriptionstatusDao prescriptionstatusdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Prescriptionstatus> get() {

        List<Prescriptionstatus> prescriptionstatuses = this.prescriptionstatusdao.findAll();

        prescriptionstatuses = prescriptionstatuses.stream().map(
                prescriptionstatus -> { Prescriptionstatus ps = new Prescriptionstatus();
                            ps.setId(prescriptionstatus.getId());
                            ps.setName(prescriptionstatus.getName());
                            return ps; }
        ).collect(Collectors.toList());

        return prescriptionstatuses;

    }

}


