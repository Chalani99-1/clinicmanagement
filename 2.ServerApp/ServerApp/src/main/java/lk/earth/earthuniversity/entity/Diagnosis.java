package lk.earth.earthuniversity.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Entity
public class Diagnosis {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "onsetduration")
    private String onsetduration;
    @Basic
    @Column(name = "disease")
    private String disease;
    @Basic
    @Column(name = "bplevel")
    private Integer bplevel;
    @Basic
    @Column(name = "bloodpressure")
    private String bloodpressure;
    @Basic
    @Column(name = "heartrate")
    private String heartrate;
    @Basic
    @Column(name = "temperature")
    private String temperature;
    @Basic
    @Column(name = "respiratoryrate")
    private String respiratoryrate;
    @Basic
    @Column(name = "height")
    private String height;
    @Basic
    @Column(name = "weight")
    private String weight;
    @Basic
    @Column(name = "examination")
    private String examination;
    @Basic
    @Column(name = "allergy")
    private String allergy;
    @Basic
    @Column(name = "medicalhistory")
    private String medicalhistory;
    @Basic
    @Column(name = "surgicalhistory")
    private String surgicalhistory;
    @Basic
    @Column(name = "doctornote")
    private String doctornote;
    @Basic
    @Column(name = "description")
    private String description;
    @Basic
    @Column(name = "time")
    private Timestamp time;
    @OneToMany(mappedBy = "diagnosis")
    private Collection<Allergydiagnosis> allergydiagnoses;
    @ManyToOne
    @JoinColumn(name = "severity_id", referencedColumnName = "id", nullable = false)
    private Severity severity;
    @ManyToOne
    @JoinColumn(name = "treatmentplan_id", referencedColumnName = "id", nullable = false)
    private Treatmentplan treatmentplan;
    @ManyToOne
    @JoinColumn(name = "diagnosisstatus_id", referencedColumnName = "id", nullable = false)
    private Diagnosisstatus diagnosisstatus;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id", nullable = false)
    private Patient patient;
    @OneToMany(mappedBy = "diagnosis")
    private Collection<Diseasediagnosis> diseasediagnoses;
    @OneToMany(mappedBy = "diagnosis")
    private Collection<Symptomdiagnosis> symptomdiagnoses;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOnsetduration() {
        return onsetduration;
    }

    public void setOnsetduration(String onsetduration) {
        this.onsetduration = onsetduration;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public Integer getBplevel() {
        return bplevel;
    }

    public void setBplevel(Integer bplevel) {
        this.bplevel = bplevel;
    }

    public String getBloodpressure() {
        return bloodpressure;
    }

    public void setBloodpressure(String bloodpressure) {
        this.bloodpressure = bloodpressure;
    }

    public String getHeartrate() {
        return heartrate;
    }

    public void setHeartrate(String heartrate) {
        this.heartrate = heartrate;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getRespiratoryrate() {
        return respiratoryrate;
    }

    public void setRespiratoryrate(String respiratoryrate) {
        this.respiratoryrate = respiratoryrate;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getExamination() {
        return examination;
    }

    public void setExamination(String examination) {
        this.examination = examination;
    }

    public String getAllergy() {
        return allergy;
    }

    public void setAllergy(String allergy) {
        this.allergy = allergy;
    }

    public String getMedicalhistory() {
        return medicalhistory;
    }

    public void setMedicalhistory(String medicalhistory) {
        this.medicalhistory = medicalhistory;
    }

    public String getSurgicalhistory() {
        return surgicalhistory;
    }

    public void setSurgicalhistory(String surgicalhistory) {
        this.surgicalhistory = surgicalhistory;
    }

    public String getDoctornote() {
        return doctornote;
    }

    public void setDoctornote(String doctornote) {
        this.doctornote = doctornote;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Diagnosis diagnosis = (Diagnosis) o;

        if (id != null ? !id.equals(diagnosis.id) : diagnosis.id != null) return false;
        if (onsetduration != null ? !onsetduration.equals(diagnosis.onsetduration) : diagnosis.onsetduration != null)
            return false;
        if (disease != null ? !disease.equals(diagnosis.disease) : diagnosis.disease != null) return false;
        if (bplevel != null ? !bplevel.equals(diagnosis.bplevel) : diagnosis.bplevel != null) return false;
        if (bloodpressure != null ? !bloodpressure.equals(diagnosis.bloodpressure) : diagnosis.bloodpressure != null)
            return false;
        if (heartrate != null ? !heartrate.equals(diagnosis.heartrate) : diagnosis.heartrate != null) return false;
        if (temperature != null ? !temperature.equals(diagnosis.temperature) : diagnosis.temperature != null)
            return false;
        if (respiratoryrate != null ? !respiratoryrate.equals(diagnosis.respiratoryrate) : diagnosis.respiratoryrate != null)
            return false;
        if (height != null ? !height.equals(diagnosis.height) : diagnosis.height != null) return false;
        if (weight != null ? !weight.equals(diagnosis.weight) : diagnosis.weight != null) return false;
        if (examination != null ? !examination.equals(diagnosis.examination) : diagnosis.examination != null)
            return false;
        if (allergy != null ? !allergy.equals(diagnosis.allergy) : diagnosis.allergy != null) return false;
        if (medicalhistory != null ? !medicalhistory.equals(diagnosis.medicalhistory) : diagnosis.medicalhistory != null)
            return false;
        if (surgicalhistory != null ? !surgicalhistory.equals(diagnosis.surgicalhistory) : diagnosis.surgicalhistory != null)
            return false;
        if (doctornote != null ? !doctornote.equals(diagnosis.doctornote) : diagnosis.doctornote != null) return false;
        if (description != null ? !description.equals(diagnosis.description) : diagnosis.description != null)
            return false;
        if (time != null ? !time.equals(diagnosis.time) : diagnosis.time != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (onsetduration != null ? onsetduration.hashCode() : 0);
        result = 31 * result + (disease != null ? disease.hashCode() : 0);
        result = 31 * result + (bplevel != null ? bplevel.hashCode() : 0);
        result = 31 * result + (bloodpressure != null ? bloodpressure.hashCode() : 0);
        result = 31 * result + (heartrate != null ? heartrate.hashCode() : 0);
        result = 31 * result + (temperature != null ? temperature.hashCode() : 0);
        result = 31 * result + (respiratoryrate != null ? respiratoryrate.hashCode() : 0);
        result = 31 * result + (height != null ? height.hashCode() : 0);
        result = 31 * result + (weight != null ? weight.hashCode() : 0);
        result = 31 * result + (examination != null ? examination.hashCode() : 0);
        result = 31 * result + (allergy != null ? allergy.hashCode() : 0);
        result = 31 * result + (medicalhistory != null ? medicalhistory.hashCode() : 0);
        result = 31 * result + (surgicalhistory != null ? surgicalhistory.hashCode() : 0);
        result = 31 * result + (doctornote != null ? doctornote.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        return result;
    }

    public Collection<Allergydiagnosis> getAllergydiagnoses() {
        return allergydiagnoses;
    }

    public void setAllergydiagnoses(Collection<Allergydiagnosis> allergydiagnoses) {
        this.allergydiagnoses = allergydiagnoses;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public Treatmentplan getTreatmentplan() {
        return treatmentplan;
    }

    public void setTreatmentplan(Treatmentplan treatmentplan) {
        this.treatmentplan = treatmentplan;
    }

    public Diagnosisstatus getDiagnosisstatus() {
        return diagnosisstatus;
    }

    public void setDiagnosisstatus(Diagnosisstatus diagnosisstatus) {
        this.diagnosisstatus = diagnosisstatus;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Collection<Diseasediagnosis> getDiseasediagnoses() {
        return diseasediagnoses;
    }

    public void setDiseasediagnoses(Collection<Diseasediagnosis> diseasediagnoses) {
        this.diseasediagnoses = diseasediagnoses;
    }

    public Collection<Symptomdiagnosis> getSymptomdiagnoses() {
        return symptomdiagnoses;
    }

    public void setSymptomdiagnoses(Collection<Symptomdiagnosis> symptomdiagnoses) {
        this.symptomdiagnoses = symptomdiagnoses;
    }
}
