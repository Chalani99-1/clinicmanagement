package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ProvinceDao;
import lk.earth.earthuniversity.entity.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/provinces")
public class ProvinceController {

    @Autowired
    private ProvinceDao provincedao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Province> get() {

        List<Province> provinces = this.provincedao.findAll();

        provinces = provinces.stream().map(
                province -> { Province pr = new Province();
                            pr.setId(province.getId());
                            pr.setName(province.getName());
                            return pr; }
        ).collect(Collectors.toList());

        return provinces;

    }

}


