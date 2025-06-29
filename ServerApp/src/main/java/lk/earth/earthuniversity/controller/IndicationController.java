package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.IndicationDao;
import lk.earth.earthuniversity.entity.Indication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/indications")
public class IndicationController {

    @Autowired
    private IndicationDao indicationdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Indication> get() {

        List<Indication> indications = this.indicationdao.findAll();

        indications = indications.stream().map(
                indication -> { Indication i = new Indication();
                            i.setId(indication.getId());
                            i.setName(indication.getName());
                            return i; }
        ).collect(Collectors.toList());

        return indications;

    }

}


