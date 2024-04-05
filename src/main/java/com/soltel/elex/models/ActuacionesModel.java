package com.soltel.elex.models;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "actuaciones")
public class ActuacionesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String descripcion;

    private boolean finalizado;


    private LocalDate fecha;

    @ManyToOne
    @JoinColumn(name = "expediente")
    private ExpedientesModel expediente;

    private boolean borrado;


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

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
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

    // Constructor
    public ActuacionesModel() {
    }

    public ActuacionesModel(int id, String descripcion, boolean finalizado, LocalDate fecha, ExpedientesModel expediente,
            boolean borrado) {
        this.id = id;
        this.descripcion = descripcion;
        this.finalizado = finalizado;
        this.fecha = fecha;
        this.expediente = expediente;
        this.borrado = borrado;
    }
}
