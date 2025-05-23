package lk.earth.earthuniversity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Ward {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "ward")
    private Collection<Clinic> clinics;
    @JsonIgnore
    @OneToMany(mappedBy = "ward")
    private Collection<Wardassignment> wardassignments;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Ward ward = (Ward) o;

        if (id != null ? !id.equals(ward.id) : ward.id != null) return false;
        if (name != null ? !name.equals(ward.name) : ward.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }

    public Collection<Clinic> getClinics() {
        return clinics;
    }

    public void setClinics(Collection<Clinic> clinics) {
        this.clinics = clinics;
    }

    public Collection<Wardassignment> getWardassignments() {
        return wardassignments;
    }

    public void setWardassignments(Collection<Wardassignment> wardassignments) {
        this.wardassignments = wardassignments;
    }
}
