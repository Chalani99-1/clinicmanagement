package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DiseaseDao;
import lk.earth.earthuniversity.entity.Disease;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/diseases")
public class DiseaseController {

    @Autowired
    private DiseaseDao diseasedao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Disease> get() {

        List<Disease> diseases = this.diseasedao.findAll();

        diseases = diseases.stream().map(
                disease -> { Disease d = new Disease();
                            d.setId(disease.getId());
                            d.setName(disease.getName());
                            return d; }
        ).collect(Collectors.toList());

        return diseases;

    }

}


