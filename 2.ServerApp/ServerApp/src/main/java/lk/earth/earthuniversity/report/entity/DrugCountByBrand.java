package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class DrugCountByBrand {

    private Integer id;
    private String brand;
    private Long count;
    private double percentage;

    public DrugCountByBrand() {  }

    public DrugCountByBrand(String designation, Long count) {
        this.brand = brand;
        this.count = count;
    }

    public String getDesignation() {
        return brand;
    }
    public void setDesignation(String brand) {
        this.brand = brand;
    }
    public Long getCount() {
        return count;
    }
    public void setCount(Long count) {
        this.count = count;
    }
    public double getPercentage() {
        return percentage;
    }
    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    public Integer getId() {
        return id;
    }

}
