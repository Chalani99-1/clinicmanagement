package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.entity.*;
import lk.earth.earthuniversity.util.RegexProvider;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;



@CrossOrigin
@RestController
@RequestMapping(value = "/regexes")
public class RegexController {

    @GetMapping(path ="/employee", produces = "application/json")
    public HashMap<String, HashMap<String, String>> employee() {
        return RegexProvider.get(new Employee());
    }

    @GetMapping(path ="/users", produces = "application/json")
    public HashMap<String, HashMap<String, String>> user() {
        return RegexProvider.get(new User());
    }

    @GetMapping(path ="/patients", produces = "application/json")
    public HashMap<String, HashMap<String, String>> patient() {return RegexProvider.get(new Patient());}

    @GetMapping(path ="/doctor", produces = "application/json")
    public HashMap<String, HashMap<String, String>> doctor() {return RegexProvider.get(new Doctor());}

    @GetMapping(path ="/patientattendence", produces = "application/json")
    public HashMap<String, HashMap<String, String>> patientattendence() {return RegexProvider.get(new Patientattendence());
    }

    @GetMapping(path ="/clinicattendence", produces = "application/json")
    public HashMap<String, HashMap<String, String>> clinicattendence() {return RegexProvider.get(new Clinicattendence());
    }

    @GetMapping(path ="/drugs", produces = "application/json")
    public HashMap<String, HashMap<String, String>> drug() {return RegexProvider.get(new Drug());
    }

    @GetMapping(path ="/clinic", produces = "application/json")
    public HashMap<String, HashMap<String, String>> clinic() {return RegexProvider.get(new Clinic());}


    @GetMapping(path ="/wardassignment", produces = "application/json")
    public HashMap<String, HashMap<String, String>> wardassignment() {return RegexProvider.get(new Wardassignment());}

    @GetMapping(path ="/investigation", produces = "application/json")
    public HashMap<String, HashMap<String, String>> investigation() {return RegexProvider.get(new Investigation());}

    @GetMapping(path ="/prescription", produces = "application/json")
    public HashMap<String, HashMap<String, String>> prescription() {return RegexProvider.get(new Prescription());}

}


