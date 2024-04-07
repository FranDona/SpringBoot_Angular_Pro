SET sql_mode = 'STRICT_ALL_TABLES';
DROP DATABASE IF EXISTS elex;

CREATE DATABASE IF NOT EXISTS elex
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE elex;

/* 1. Tabla tipos_expediente */
CREATE TABLE IF NOT EXISTS tipos_expediente (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    materia VARCHAR(20) UNIQUE NOT NULL,
    borrado BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY pk_tipos_expediente (id)
)
COMMENT "Tabla Principal Tipos -> Expedientes";

/* 2. Tabla expedientes */
CREATE TABLE IF NOT EXISTS expedientes (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    fecha DATE NOT NULL,
    estado ENUM('Pendiente','Enviado', 'Erróneo') DEFAULT 'Pendiente',
    opciones ENUM('Sin Definir','Datos Personales', 'Información laboral', 'Información médica', 'Información educativa', 'Información financiera', 'Información de empleo', 'Información legal') DEFAULT 'Sin Definir',
    descripcion VARCHAR(255) NOT NULL,
    tipo INT NOT NULL,
    borrado BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (tipo) REFERENCES tipos_expediente (id),
    PRIMARY KEY pk_expedientes (id)
)
COMMENT "Tabla Principal Expediente";

/* 3. Tabla actuaciones */
CREATE TABLE IF NOT EXISTS actuaciones (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    descripcion VARCHAR(255) NOT NULL,
    finalizado BOOLEAN DEFAULT 0,
    fecha DATE NOT NULL,
    expediente INT NOT NULL,
    borrado BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (expediente) REFERENCES expedientes (id),
    PRIMARY KEY pk_actuaciones (id)
)
COMMENT "Tabla de Actuaciones";


/* 4. Tabla documentos*/
CREATE TABLE IF NOT EXISTS documentos (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    ruta VARCHAR(50) NULL,
    tasa DOUBLE(6,2) NOT NULL,
    expediente INT NOT NULL,
    borrado BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (expediente) REFERENCES expedientes (id),
    PRIMARY KEY pk_documentos (id)
)
COMMENT "Tabla de Documentos";

-- Insertar datos de ejemplo en la tabla tipos_expediente
INSERT INTO tipos_expediente (materia, borrado) VALUES
('Matrimonio', false),
('Militar', false),
('Judicial', false),
('Educación', false);

-- Insertar datos de ejemplo en la tabla expedientes
INSERT INTO expedientes (codigo, fecha, estado, opciones, descripcion, tipo, borrado) VALUES
('COD001', '2024-03-20', 'Pendiente', 'Información legal', 'Descripción1', 1, false),
('COD002', '2024-03-21', 'Enviado', 'Información laboral', 'Descripción2', 2, false),
('COD003', '2024-03-22', 'Erróneo', 'Información médica', 'Descripción3', 3, false),
('COD004', '2024-03-23', 'Pendiente', 'Información financiera', 'Descripción4', 4, false);

-- Insertar datos de ejemplo en la tabla actuaciones
INSERT INTO actuaciones (descripcion, finalizado, fecha, expediente, borrado) VALUES
('Actuación1', false, '2024-03-20', 1, false),
('Actuación2', true, '2024-03-21', 2, false),
('Actuación3', false, '2024-03-22', 3, false),
('Actuación4', false, '2024-03-23', 4, false);

-- Insertar datos de ejemplo en la tabla documentos
INSERT INTO documentos (ruta, tasa, expediente, borrado) VALUES
('ruta-pdf001', 100.00, 1, false),
('ruta-pdf002', 200.00, 2, false),
('ruta-pdf003', 300.00, 3, false),
('ruta-pdf004', 400.00, 4, false);