package com.soltel.elex.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @SuppressWarnings("null")
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // Permite solicitudes desde localhost:4200
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos HTTP permitidos
                .allowedHeaders("*"); // Cabeceras permitidas
    }
}
