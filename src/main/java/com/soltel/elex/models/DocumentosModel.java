package com.soltel.elex.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "documentos")
public class DocumentosModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = true)
    private String ruta;

    private double tasa;

    @ManyToOne
    @JoinColumn(name = "expediente")
    private ExpedientesModel expediente;

    private boolean borrado;

    
    // Getter y Setter
    public int getId() {
        return id;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public double getTasa() {
        return tasa;
    }

    public void setTasa(double tasa) {
        this.tasa = tasa;
    }

    public ExpedientesModel getExpediente() {
        return expediente;
    }

    public void setExpediente(ExpedientesModel expediente) {
        this.expediente = expediente;
    }

    public boolean isBorrado() {
        return borrado;
    }

    public void setBorrado(boolean borrado) {
        this.borrado = borrado;
    }

    
    // Constructor
    public DocumentosModel() {
    }

    public DocumentosModel(int id, String ruta, double tasa, ExpedientesModel expediente, boolean borrado) {
        this.id = id;
        this.ruta = ruta;
        this.tasa = tasa;
        this.expediente = expediente;
        this.borrado = borrado;
    }
}
