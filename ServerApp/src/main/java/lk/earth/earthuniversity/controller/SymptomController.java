package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SymptomDao;
import lk.earth.earthuniversity.entity.Symptom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/symptoms")
public class SymptomController {

    @Autowired
    private SymptomDao symptomdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Symptom> get() {

        List<Symptom> symptoms = this.symptomdao.findAll();

        symptoms = symptoms.stream().map(
                symptom -> { Symptom s = new Symptom();
                            s.setId(symptom.getId());
                            s.setName(symptom.getName());
                            return s; }
        ).collect(Collectors.toList());

        return symptoms;

    }

}


