package com.supermarkt.pedido;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AvaliacaoRepositorio  extends JpaRepository<Avaliacao, Long> {


}