package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DrugformDao;
import lk.earth.earthuniversity.dao.DrugsheduleDao;
import lk.earth.earthuniversity.entity.Drugform;
import lk.earth.earthuniversity.entity.Drugshedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/drugshedules")
public class DrugsheduleController {

    @Autowired
    private DrugsheduleDao drugsheduledao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Drugshedule> get() {

        List<Drugshedule> drugshedules = this.drugsheduledao.findAll();

        drugshedules = drugshedules.stream().map(
                drugshedule -> { Drugshedule d = new Drugshedule();
                            d.setId(drugshedule.getId());
                            d.setName(drugshedule.getName());
                            return d; }
        ).collect(Collectors.toList());

        return drugshedules;

    }

}


