package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ModuleDao;
import lk.earth.earthuniversity.dao.UserDao;
import lk.earth.earthuniversity.entity.Module;
import lk.earth.earthuniversity.entity.Privilege;
import lk.earth.earthuniversity.entity.User;
import lk.earth.earthuniversity.entity.Userrole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/authorities")
public class UserAuthorityController {

    @Autowired
    private UserDao userdao;

    @Autowired
    private ModuleDao moduleDao;

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.CREATED)
    public List<String> getUserAuthoritiesByUsername(@PathVariable String username) {
        User user = userdao.findByUsername(username);
        List<String> authorities = new ArrayList<>();

        if (user != null){
            List<Userrole> userroles = (List<Userrole>) user.getUserroles();

            for (Userrole u : userroles) {
                List<Privilege> Privileges = (List<Privilege>) u.getRole().getPrivileges();
                for (Privilege p : Privileges) {
                    String authority = p.getAuthority();
                    authorities.add(authority);
                }
            }
        }else{

            List<Module> modules = moduleDao.findAll();

            String operations[] = {"select","insert","delete","update"};

            for (Module module : modules){
                for (String op : operations){
                    String authority = module.getName().toLowerCase() + "-" + op;
                    authorities.add(authority);
                }
            }

//            authorities = Arrays.asList(
//                    "user-select","user-delete","user-update","user-insert",
//                    "privilege-select","privilege-delete","privilege-update","privilege-insert",
//                    "employee-select","employee-delete","employee-update","employee-insert",
//                    "operations-select","operations-delete","operations-update","operations-insert",
//                    "wardassignment-select","wardassignment-delete","wardassignment-update","wardassignment-insert",
//                    "patientattendence-select","patientattendence-delete","patientattendence-update","patientattendence-insert",
//
//                    "patient-select","patient-delete","patient-update","patient-insert",
//                    "doctor-select","doctor-delete","doctor-update","doctor-insert",
//
//                    "clinic-select","clinic-delete","clinic-update","clinic-insert",
//                    "clinicattendence-select","clinicattendence-delete","clinicattendence-update","clinicattendence-insert",
//
//                    "drug-select","drug-delete","drug-update","drug-insert"
//
//
////
//            );
        }

        return authorities;
    }
}
