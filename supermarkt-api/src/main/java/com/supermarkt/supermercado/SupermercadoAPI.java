package com.supermarkt.supermercado;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SupermercadoAPI {
	
	private final SupermercadoServico supermercadoServico;

	@GetMapping("/admin/supermercados")
	public ResponseEntity<List<SupermercadoDTO>> lista() {
		return ResponseEntity.ok(supermercadoServico.lista());
	}
	
	@GetMapping("/admin/supermercados/{nome}")
	public ResponseEntity<List<SupermercadoDTO>> buscarPorNome(@PathVariable("nome") String nome) {
		return ResponseEntity.ok(supermercadoServico.buscarPorNome(nome));
	}
	
	@GetMapping("/supermercados/{id}")
	public ResponseEntity<SupermercadoDTO> detalha(@PathVariable("id") Long id) {
		return ResponseEntity.ok(supermercadoServico.detalha(id));
	}
	
	@GetMapping("/supermercados")
	public ResponseEntity<List<SupermercadoDTO>> detalhePorIds(@RequestParam List<Long> ids) {
		return ResponseEntity.ok(supermercadoServico.detalhePorIds(ids));
	}
	
	@DeleteMapping("/admin/supermercados/{id}")
	public ResponseEntity<?> remove(@PathVariable("id") Long id) {
		supermercadoServico.remove(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/parceiros/supermercados/{id}")
	public ResponseEntity<SupermercadoDTO> detalhaParceiro(@PathVariable("id") Long id) {
		return ResponseEntity.ok(supermercadoServico.detalhaParceiro(id));
	}

	@PostMapping("/parceiros/supermercados")
	public ResponseEntity<Supermercado> adiciona(@RequestBody Supermercado supermercado) {
		return ResponseEntity.status(HttpStatus.CREATED).body(supermercadoServico.adiciona(supermercado));
	}

	@PutMapping("/parceiros/supermercados/{id}")
	public ResponseEntity<Supermercado> atualiza(@RequestBody Supermercado supermercado) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(supermercadoServico.atualiza(supermercado));
	}

	@GetMapping("/admin/supermercados/em-aprovacao")
	public ResponseEntity<List<SupermercadoDTO>> emAprovacao() {
		return ResponseEntity.ok(supermercadoServico.emAprovacao());
	}

	@PatchMapping("/admin/supermercados/{id}")
	public ResponseEntity<?> aprova(@PathVariable("id") Long id) {
		supermercadoServico.aprova(id);
		return ResponseEntity.noContent().build();
	}

}