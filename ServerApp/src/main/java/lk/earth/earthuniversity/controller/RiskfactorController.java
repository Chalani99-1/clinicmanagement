package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.RiskfactorDao;
import lk.earth.earthuniversity.entity.Riskfactor;
import lk.earth.earthuniversity.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/riskfactors")
public class RiskfactorController {

    @Autowired
    private RiskfactorDao riskfactordao;

    @GetMapping(path ="/list",produces = "application/json")

    //public List<Riskfactor> get(@RequestParam HashMap<String,String>params) {
    public List<Riskfactor> get() {
        List<Riskfactor> riskfactors = this.riskfactordao.findAll();

        riskfactors = riskfactors.stream().map(
                riskfactor -> { Riskfactor rf = new Riskfactor();
                            rf.setId(riskfactor.getId());
                            rf.setName(riskfactor.getName());
                            return rf; }
        ).collect(Collectors.toList());

        return riskfactors;
    }
}

