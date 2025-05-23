package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Drugadverseeffect {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "drug_id", referencedColumnName = "id", nullable = false)
    private Drug drug;
    @ManyToOne
    @JoinColumn(name = "adverseeffects_id", referencedColumnName = "id")
    private Adverseeffect adverseeffect;

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

        Drugadverseeffect that = (Drugadverseeffect) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    public Drug getDrug() {
        return drug;
    }

    public void setDrug(Drug drug) {
        this.drug = drug;
    }

    public Adverseeffect getAdverseeffect() {
        return adverseeffect;
    }

    public void setAdverseeffect(Adverseeffect adverseeffect) {
        this.adverseeffect = adverseeffect;
    }
}
