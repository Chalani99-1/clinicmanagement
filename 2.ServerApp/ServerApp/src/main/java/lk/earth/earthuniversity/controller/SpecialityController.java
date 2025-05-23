package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.dao.SpecialityDao;
import lk.earth.earthuniversity.entity.Gender;
import lk.earth.earthuniversity.entity.Speciality;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/specialities")
public class SpecialityController {

    @Autowired
    private SpecialityDao specialitydao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Speciality> get() {

        List<Speciality> specialities = this.specialitydao.findAll();

        specialities = specialities.stream().map(
                speciality -> { Speciality s = new Speciality();
                            s.setId(speciality.getId());
                            s.setName(speciality.getName());
                            return s; }
        ).collect(Collectors.toList());

        return specialities;

    }

}


