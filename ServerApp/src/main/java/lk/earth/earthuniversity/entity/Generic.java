package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Generic {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "generic")
    private Collection<Drug> drugs;
    @JsonIgnore
    @OneToMany(mappedBy = "generic")
    private Collection<Brand> brands;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<Brand> getBrands() {
        return brands;
    }

    public void setBrands(Collection<Brand> brands) {
        this.brands = brands;
    }

    @Override
    public String toString() {
        return "Generic{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", drugs=" + drugs +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Generic generic = (Generic) o;

        if (id != null ? !id.equals(generic.id) : generic.id != null) return false;
        if (name != null ? !name.equals(generic.name) : generic.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    public Collection<Drug> getDrugs() {
        return drugs;
    }

    public void setDrugs(Collection<Drug> drugs) {
        this.drugs = drugs;
    }
}
