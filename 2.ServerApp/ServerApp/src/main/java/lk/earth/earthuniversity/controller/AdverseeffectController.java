package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.AdverseeffectDao;
import lk.earth.earthuniversity.entity.Adverseeffect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/adverseeffects")
public class AdverseeffectController {

    @Autowired
    private AdverseeffectDao adverseeffectdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Adverseeffect> get() {

        List<Adverseeffect> adverseeffects = this.adverseeffectdao.findAll();

        adverseeffects = adverseeffects.stream().map(
                adverseeffect -> { Adverseeffect a = new Adverseeffect();
                            a.setId(adverseeffect.getId());
                            a.setName(adverseeffect.getName());
                            return a; }
        ).collect(Collectors.toList());

        return adverseeffects;

    }

}


