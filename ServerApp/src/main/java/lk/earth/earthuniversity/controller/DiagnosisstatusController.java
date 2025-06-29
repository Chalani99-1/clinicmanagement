package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DiagnosisstatusDao;
import lk.earth.earthuniversity.entity.Diagnosisstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/diagnosisstatuses")
public class DiagnosisstatusController {

    @Autowired
    private DiagnosisstatusDao diagnosisstatusdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Diagnosisstatus> get() {

        List<Diagnosisstatus> diagnosisstatuses = this.diagnosisstatusdao.findAll();

        diagnosisstatuses = diagnosisstatuses.stream().map(
                diagnosisstatus -> { Diagnosisstatus ds = new Diagnosisstatus();
                            ds.setId(diagnosisstatus.getId());
                            ds.setName(diagnosisstatus.getName());
                            return ds; }
        ).collect(Collectors.toList());

        return diagnosisstatuses;

    }

}


