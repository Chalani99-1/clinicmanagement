package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DrugrouteDao;
import lk.earth.earthuniversity.entity.Drugroute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/drugroutes")
public class DrugrouteController {

    @Autowired
    private DrugrouteDao drugroutedao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Drugroute> get() {

        List<Drugroute> drugroutes = this.drugroutedao.findAll();

        drugroutes = drugroutes.stream().map(
                drugroute -> { Drugroute d = new Drugroute();
                            d.setId(drugroute.getId());
                            d.setName(drugroute.getName());
                            return d; }
        ).collect(Collectors.toList());

        return drugroutes;

    }

}


