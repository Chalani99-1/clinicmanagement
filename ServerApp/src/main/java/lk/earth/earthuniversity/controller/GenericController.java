package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.GenericDao;
import lk.earth.earthuniversity.entity.Generic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/generics")
public class GenericController {

    @Autowired
    private GenericDao genericdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Generic> get() {

        List<Generic> generics = this.genericdao.findAll();

        generics = generics.stream().map(
                generic -> { Generic g = new Generic();
                            g.setId(generic.getId());
                            g.setName(generic.getName());
                            return g; }
        ).collect(Collectors.toList());

        return generics;

    }

}


