package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.dao.InvestigationstatusDao;
import lk.earth.earthuniversity.entity.Gender;
import lk.earth.earthuniversity.entity.Investigationstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/investigationstatuses")
public class InvestigationstatusController {

    @Autowired
    private InvestigationstatusDao investigationstatusdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Investigationstatus> get() {

        List<Investigationstatus> investigationstatuses= this.investigationstatusdao.findAll();

        investigationstatuses = investigationstatuses.stream().map(
                investigationstatus -> { Investigationstatus i = new Investigationstatus();
                            i.setId(investigationstatus.getId());
                            i.setName(investigationstatus.getName());
                            return i; }
        ).collect(Collectors.toList());

        return investigationstatuses;

    }

}


