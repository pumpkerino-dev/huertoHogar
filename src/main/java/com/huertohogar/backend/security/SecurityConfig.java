package com.huertohogar.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    private static final String ADMIN = "ADMIN";
    private static final String VENDEDOR = "VENDEDOR";

    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    @Value("${app.cors.allowed-origin}")
    private String allowedOrigin;

    public SecurityConfig(JwtFilter jwtFilter, UserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOriginPatterns(List.of(allowedOrigin, "http://127.0.0.1:[*]"));
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                return config;
            }))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/registro", "/api/v1/auth/refresh").permitAll()
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/error").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/productos", "/api/v1/productos/**").permitAll()
                .requestMatchers("/api/v1/productos", "/api/v1/productos/**").hasRole(ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/v1/categorias", "/api/v1/categorias/**").permitAll()
                .requestMatchers("/api/v1/categorias", "/api/v1/categorias/**").hasRole(ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/v1/boletas").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/boletas/mias").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/v1/boletas/usuario/**").hasRole(ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/v1/boletas").hasAnyRole(ADMIN, VENDEDOR)
                .requestMatchers(HttpMethod.GET, "/api/v1/boletas/**").authenticated()
                .requestMatchers("/api/v1/boletas/**").hasRole(ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/v1/contacto").permitAll()
                .requestMatchers("/api/v1/contacto", "/api/v1/contacto/**").hasRole(ADMIN)
                .requestMatchers("/api/v1/usuarios", "/api/v1/usuarios/**").hasRole(ADMIN)
                .anyRequest().authenticated()
            )
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(e -> e
                .authenticationEntryPoint((req, res, ex) ->
                        responderError(res, HttpStatus.UNAUTHORIZED, "Debes iniciar sesión"))
                .accessDeniedHandler((req, res, ex) ->
                        responderError(res, HttpStatus.FORBIDDEN, "No tienes permisos para esta acción")))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    private static void responderError(HttpServletResponse res, HttpStatus status, String mensaje)
            throws IOException {
        res.setStatus(status.value());
        res.setContentType("application/json;charset=UTF-8");
        res.getWriter().write("{\"mensaje\":\"" + mensaje + "\"}");
    }
}
