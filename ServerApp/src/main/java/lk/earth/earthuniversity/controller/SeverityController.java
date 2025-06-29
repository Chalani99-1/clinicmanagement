package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SeverityDao;
import lk.earth.earthuniversity.entity.Severity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/severities")
public class SeverityController {

    @Autowired
    private SeverityDao severitydao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Severity> get() {

        List<Severity> severities = this.severitydao.findAll();

        severities = severities.stream().map(
                severity -> { Severity s = new Severity();
                            s.setId(severity.getId());
                            s.setName(severity.getName());
                            return s; }
        ).collect(Collectors.toList());

        return severities;

    }

}


