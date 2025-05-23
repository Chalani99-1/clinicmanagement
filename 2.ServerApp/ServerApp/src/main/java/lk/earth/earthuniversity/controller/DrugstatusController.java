package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DrugstatusDao;
import lk.earth.earthuniversity.entity.Drugstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/drugstatuses")
public class DrugstatusController {

    @Autowired
    private DrugstatusDao drugstatusdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Drugstatus> get() {

        List<Drugstatus> drugstatuses = this.drugstatusdao.findAll();

        drugstatuses = drugstatuses.stream().map(
                drugstatus -> { Drugstatus ds = new Drugstatus();
                            ds.setId(drugstatus.getId());
                            ds.setName(drugstatus.getName());
                            return ds; }
        ).collect(Collectors.toList());

        return drugstatuses;

    }

}


