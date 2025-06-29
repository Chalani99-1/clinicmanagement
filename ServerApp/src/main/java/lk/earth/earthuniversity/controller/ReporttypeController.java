package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.dao.ReporttypeDao;
import lk.earth.earthuniversity.entity.Gender;
import lk.earth.earthuniversity.entity.Reporttype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/reporttypes")
public class ReporttypeController {

    @Autowired
    private ReporttypeDao reporttypedao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Reporttype> get() {

        List<Reporttype> reporttypes = this.reporttypedao.findAll();

        reporttypes = reporttypes.stream().map(
                reporttype -> { Reporttype r = new Reporttype();
                            r.setId(reporttype.getId());
                            r.setName(reporttype.getName());
                            return r; }
        ).collect(Collectors.toList());

        return reporttypes;

    }

}


