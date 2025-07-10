package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Brand {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "brand")
    private Collection<Drug> drugs;

    @ManyToOne
    @JoinColumn(name = "generic_id", nullable = false)
    private Generic generic;

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

    public Generic getGeneric() {
        return generic;
    }

    public void setGeneric(Generic generic) {
        this.generic = generic;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Brand brand = (Brand) o;

        if (id != null ? !id.equals(brand.id) : brand.id != null) return false;
        if (name != null ? !name.equals(brand.name) : brand.name != null) return false;

        return true;
    }

    @Override
    public String toString() {
        return "Brand{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", drugs=" + drugs +
                ", generic=" + generic +
                '}';
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
