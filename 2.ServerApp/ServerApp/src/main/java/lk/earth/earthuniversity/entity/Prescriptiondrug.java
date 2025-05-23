package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Prescriptiondrug {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "dose")
    private String dose;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "days")
    private Integer days;
    @ManyToOne
    @JoinColumn(name = "drug_id", referencedColumnName = "id", nullable = false)
    private Drug drug;
    @ManyToOne
    @JoinColumn(name = "drugshedule_id", referencedColumnName = "id", nullable = false)
    private Drugshedule drugshedule;

    @ManyToOne
    @JoinColumn(name = "meal_id", referencedColumnName = "id", nullable = false)
    private Meal meal;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "prescription_id", referencedColumnName = "id", nullable = false)
    private Prescription prescription;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDose() {
        return dose;
    }

    public void setDose(String dose) {
        this.dose = dose;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Prescriptiondrug that = (Prescriptiondrug) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (dose != null ? !dose.equals(that.dose) : that.dose != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (days != null ? !days.equals(that.days) : that.days != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (dose != null ? dose.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (days != null ? days.hashCode() : 0);
        return result;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public Drugshedule getDrugshedule() {
        return drugshedule;
    }

    public void setDrugshedule(Drugshedule drugshedule) {
        this.drugshedule = drugshedule;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }
}
