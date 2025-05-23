package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.CountryDao;
import lk.earth.earthuniversity.entity.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/countries")
public class CountryController {

    @Autowired
    private CountryDao countrydao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Country> get() {

        List<Country> countries = this.countrydao.findAll();

        countries = countries.stream().map(
                country -> { Country c = new Country();
                            c.setId(country.getId());
                            c.setName(country.getName());
                            return c; }
        ).collect(Collectors.toList());

        return countries;

    }

}


