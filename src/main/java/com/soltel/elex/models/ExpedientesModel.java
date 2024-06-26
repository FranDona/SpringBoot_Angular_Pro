package com.soltel.elex.models;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "expedientes")
public class ExpedientesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String codigo;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate fecha;

    private String estado;

    private String opciones;

    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "tipo")
    private TiposExpedienteModel tipo;

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

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getOpciones() {
        return opciones;
    }

    public void setOpciones(String opciones) {
        this.opciones = opciones;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public TiposExpedienteModel getTipo() {
        return tipo;
    }

    public void setTipo(TiposExpedienteModel tipo) {
        this.tipo = tipo;
    }

    public boolean isBorrado() {
        return borrado;
    }

    public void setBorrado(boolean borrado) {
        this.borrado = borrado;
    }

    // Constructor
    public ExpedientesModel() {
    }

    public ExpedientesModel(int id, String codigo, LocalDate fecha, String estado, String opciones, String descripcion,
            TiposExpedienteModel tipo, boolean borrado) {
        this.id = id;
        this.codigo = codigo;
        this.fecha = fecha;
        this.estado = estado;
        this.opciones = opciones;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.borrado = borrado;
    }

}
