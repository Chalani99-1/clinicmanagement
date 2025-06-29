package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.AssignmentstatusDao;
import lk.earth.earthuniversity.dao.GenderDao;
import lk.earth.earthuniversity.entity.Assignmentstatus;
import lk.earth.earthuniversity.entity.Gender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/assignmentstatuses")
public class AssignmentstatusController {

    @Autowired
    private AssignmentstatusDao assignmentstatusdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Assignmentstatus> get() {

        List<Assignmentstatus> assignmentstatuses = this.assignmentstatusdao.findAll();

        assignmentstatuses = assignmentstatuses.stream().map(
                assignmentstatus -> { Assignmentstatus as = new Assignmentstatus();
                            as.setId(assignmentstatus.getId());
                            as.setName(assignmentstatus.getName());
                            return as; }
        ).collect(Collectors.toList());

        return assignmentstatuses;

    }

}


