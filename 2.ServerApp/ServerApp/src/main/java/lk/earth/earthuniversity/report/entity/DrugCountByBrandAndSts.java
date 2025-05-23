package lk.earth.earthuniversity.report.entity;

import javax.persistence.*;

@Entity
public class DrugCountByBrandAndSts {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String brand;
    private String status;
    private Long count;

    public DrugCountByBrandAndSts() {  }
    public DrugCountByBrandAndSts(String brand, String status, Long count) {
        this.brand = brand;
        this.status = status;
        this.count = count;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

}
