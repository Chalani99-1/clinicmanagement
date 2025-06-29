package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ContrantindicationDao;
import lk.earth.earthuniversity.entity.Contrantindication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/contrantindications")
public class ContrantindicationController {

    @Autowired
    private ContrantindicationDao contrantindicationdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Contrantindication> get() {

        List<Contrantindication> contrantindications = this.contrantindicationdao.findAll();

        contrantindications = contrantindications.stream().map(
                contrantindication -> { Contrantindication c = new Contrantindication();
                            c.setId(contrantindication.getId());
                            c.setName(contrantindication.getName());
                            return c; }
        ).collect(Collectors.toList());

        return contrantindications;

    }

}


