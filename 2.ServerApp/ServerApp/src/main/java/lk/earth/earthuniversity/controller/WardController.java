package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.dao.WardDao;
import lk.earth.earthuniversity.entity.Gender;
import lk.earth.earthuniversity.entity.Ward;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/wards")
public class WardController {

    @Autowired
    private WardDao warddao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Ward> get() {

        List<Ward> wards = this.warddao.findAll();

        wards = wards.stream().map(
                ward -> { Ward w = new Ward();
                            w.setId(ward.getId());
                            w.setName(ward.getName());
                            return w; }
        ).collect(Collectors.toList());

        return wards;

    }

}


