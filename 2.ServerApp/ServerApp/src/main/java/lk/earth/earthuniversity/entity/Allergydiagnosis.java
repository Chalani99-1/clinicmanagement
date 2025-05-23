package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Allergydiagnosis {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "allergy_id", referencedColumnName = "id")
    private Allergy allergy;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "diagnosis_id", referencedColumnName = "id", nullable = false)
    private Diagnosis diagnosis;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Allergydiagnosis that = (Allergydiagnosis) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    public Allergy getAllergy() {
        return allergy;
    }

    public void setAllergy(Allergy allergy) {
        this.allergy = allergy;
    }

    public Diagnosis getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(Diagnosis diagnosis) {
        this.diagnosis = diagnosis;
    }
}
