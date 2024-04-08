# elex_examen_documentación

[//]: # (version: 1.0)
[//]: # (author: Fran Dona Villar)
[//]: # (date: 2024-04-08)


- [elex\_examen\_documentación](#elex_examen_documentación)
  - [Credenciales aplican](#credenciales-aplican)
  - [Base De Datos elex](#base-de-datos-elex)


## Credenciales aplican
* En el caso de que la aplicación necesite credenciales serán, **usuario: soltel y clave: admin**.

## Base De Datos elex
* Las credenciales para acceder son, usuario: root y clave: root.
* La base de datos se encuentra en src/main/resources/static/elex.sql
* También puedes abrirla pulsando [aquí](src/main/resources/static/elex.sql)
* En caso de no encontrar la bbdd la dejo escrita a continuación:

```sql
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
('Educación', true);

-- Insertar datos de ejemplo en la tabla expedientes
INSERT INTO expedientes (codigo, fecha, estado, opciones, descripcion, tipo, borrado) VALUES
('COD001', '2024-02-12', 'Pendiente', 'Información legal', 'Análisis detallado de un caso de propiedad intelectual con implicaciones legales internacionales.', 1, false),
('COD002', '2024-01-17', 'Enviado', 'Información laboral', 'Informe exhaustivo sobre el rendimiento trimestral de una empresa en crecimiento en el sector tecnológico.', 2, false),
('COD003', '2024-02-11', 'Erróneo', 'Información médica', 'Historial clínico completo de un paciente con diagnóstico de enfermedad crónica y tratamiento multidisciplinario.', 3, false),
('COD004', '2024-02-19', 'Pendiente', 'Información financiera', 'Resumen de la investigación de un caso de discriminación en el lugar de trabajo basado en género y origen étnico.', 4, true);

-- Insertar datos de ejemplo en la tabla actuaciones
INSERT INTO actuaciones (descripcion, finalizado, fecha, expediente, borrado) VALUES
('Investigación legal en curso.', false, '2024-03-20', 1, false),
('Entrevista de investigación laboral completada.', true, '2024-02-21', 2, false),
('Recopilación de datos médicos todavía  en curso', false, '2024-03-22', 3, true),
('Análisis financiero en progreso.', false, '2024-03-23', 4, false);

-- Insertar datos de ejemplo en la tabla documentos
INSERT INTO documentos (ruta, tasa, expediente, borrado) VALUES
('ruta-pdf001', 100.00, 1, false),
('ruta-pdf002', 200.00, 2, false),
('ruta-pdf003', 300.00, 3, true);
```