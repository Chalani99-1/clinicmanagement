package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.TreatmentplanDao;
import lk.earth.earthuniversity.entity.Treatmentplan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/treatmentplans")
public class TreatmentplanController {

    @Autowired
    private TreatmentplanDao treatmentplandao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Treatmentplan> get() {

        List<Treatmentplan> treatmentplans = this.treatmentplandao.findAll();

        treatmentplans = treatmentplans.stream().map(
                treatmentplan -> { Treatmentplan t = new Treatmentplan();
                            t.setId(treatmentplan.getId());
                            t.setName(treatmentplan.getName());
                            return t; }
        ).collect(Collectors.toList());

        return treatmentplans;

    }

}


