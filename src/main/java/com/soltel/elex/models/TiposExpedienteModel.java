package com.soltel.elex.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "tipos_expediente")
public class TiposExpedienteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String materia;

    // Establecer el valor por defecto como false para borrado
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean borrado;

    // Getter y Setter
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMateria() {
        return materia;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    public boolean isBorrado() {
        return borrado;
    }

    public void setBorrado(boolean borrado) {
        this.borrado = borrado;
    }


    // Constructor

    public TiposExpedienteModel() {
    }

    public TiposExpedienteModel(int id, String materia, boolean borrado) {
        this.id = id;
        this.materia = materia;
        this.borrado = borrado;
    }

}
