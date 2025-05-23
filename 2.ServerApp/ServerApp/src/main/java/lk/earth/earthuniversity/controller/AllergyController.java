package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.AllergyDao;
import lk.earth.earthuniversity.entity.Allergy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/allergies")
public class AllergyController {

    @Autowired
    private AllergyDao allergydao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Allergy> get() {

        List<Allergy> allergies = this.allergydao.findAll();

        allergies = allergies.stream().map(
                allergy -> { Allergy a = new Allergy();
                            a.setId(allergy.getId());
                            a.setName(allergy.getName());
                            return a; }
        ).collect(Collectors.toList());

        return allergies;

    }

}


