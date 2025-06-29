package lk.earth.earthuniversity.report.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class DrugCountByBrandAndGenericAndStatus {

    @Id
    private Integer id;
    private String brand;
    private String generic;
    private Long count;

    public DrugCountByBrandAndGenericAndStatus() {  }

    public DrugCountByBrandAndGenericAndStatus(String brand, String generic, Long count) {
        this.brand = brand;
        this.generic = generic;
        this.count = count;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getGeneric() {
        return generic;
    }

    public void setGeneric(String generic) {
        this.generic = generic;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }


}
