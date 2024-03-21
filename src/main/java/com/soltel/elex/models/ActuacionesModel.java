package com.soltel.elex.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "actuaciones")
public class ActuacionesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String descripcion;

    private boolean finalizado;

    private java.sql.Date fecha;

    @ManyToOne
    @JoinColumn(name = "expediente")
    private ExpedientesModel expediente;

    private boolean borrado;

    @Column(name = "fecha_creacion", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp fechaCreacion;


    // Getter y Setter
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isFinalizado() {
        return finalizado;
    }

    public void setFinalizado(boolean finalizado) {
        this.finalizado = finalizado;
    }

    public java.sql.Date getFecha() {
        return fecha;
    }

    public void setFecha(java.sql.Date fecha) {
        this.fecha = fecha;
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

    public Timestamp getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Timestamp fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }


    // Constructor
    public ActuacionesModel() {
    }

    public ActuacionesModel(int id, String descripcion, boolean finalizado, Date fecha, ExpedientesModel expediente,
            boolean borrado, Timestamp fechaCreacion) {
        this.id = id;
        this.descripcion = descripcion;
        this.finalizado = finalizado;
        this.fecha = fecha;
        this.expediente = expediente;
        this.borrado = borrado;
        this.fechaCreacion = fechaCreacion;
    }
    

    
    
    
}
