package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DrugsheduleDao;
import lk.earth.earthuniversity.dao.MealDao;
import lk.earth.earthuniversity.entity.Drugshedule;
import lk.earth.earthuniversity.entity.Meal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/meals")
public class mealController {

    @Autowired
    private MealDao mealdao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Meal> get() {

        List<Meal> meals = this.mealdao.findAll();

        meals = meals.stream().map(
                meal -> { Meal m = new Meal();
                            m.setId(meal.getId());
                            m.setName(meal.getName());
                            return m; }
        ).collect(Collectors.toList());

        return meals;

    }

}


