package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Arrays;

@Entity
public class Investigation {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "reporteddate")
    private Date reporteddate;
    @Basic
    @Column(name = "date")
    private Timestamp date;
    @Basic
    @Column(name = "report")
    private byte[] report;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "conclution")
    private String conclution;
    @ManyToOne
    @JoinColumn(name = "patientattendence_id", referencedColumnName = "id", nullable = false)
    private Patientattendence patientattendence;
    @ManyToOne
    @JoinColumn(name = "reporttype_id", referencedColumnName = "id", nullable = false)
    private Reporttype reporttype;
    @ManyToOne
    @JoinColumn(name = "investigationstatus_id", referencedColumnName = "id", nullable = false)
    private Investigationstatus investigationstatus;
    @ManyToOne
    @JoinColumn(name = "investigationresult_id", referencedColumnName = "id")
    private Investigationresult investigationresult;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

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

    public Date getReporteddate() {
        return reporteddate;
    }

    public void setReporteddate(Date reporteddate) {
        this.reporteddate = reporteddate;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public byte[] getReport() {
        return report;
    }

    public void setReport(byte[] report) {
        this.report = report;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getConclution() {
        return conclution;
    }

    public void setConclution(String conclution) {
        this.conclution = conclution;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Investigation that = (Investigation) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (reporteddate != null ? !reporteddate.equals(that.reporteddate) : that.reporteddate != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;
        if (!Arrays.equals(report, that.report)) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (conclution != null ? !conclution.equals(that.conclution) : that.conclution != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (reporteddate != null ? reporteddate.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(report);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (conclution != null ? conclution.hashCode() : 0);
        return result;
    }

    public Patientattendence getPatientattendence() {
        return patientattendence;
    }

    public void setPatientattendence(Patientattendence patientattendence) {
        this.patientattendence = patientattendence;
    }

    public Reporttype getReporttype() {
        return reporttype;
    }

    public void setReporttype(Reporttype reporttype) {
        this.reporttype = reporttype;
    }

    public Investigationstatus getInvestigationstatus() {
        return investigationstatus;
    }

    public void setInvestigationstatus(Investigationstatus investigationstatus) {
        this.investigationstatus = investigationstatus;
    }

    public Investigationresult getInvestigationresult() {
        return investigationresult;
    }

    public void setInvestigationresult(Investigationresult investigationresult) {
        this.investigationresult = investigationresult;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
