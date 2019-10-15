package com.supermarkt.pedido;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.supermarkt.excecao.RecursoNaoEncontradoException;
import com.supermarkt.supermercado.SupermercadoDto;
import com.supermarkt.supermercado.SupermercadoRepositorio;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
class PedidoApi {

	private PedidoRepositorio repo;
	private AvaliacaoRepositorio avaliacaoRepo;
	private SupermercadoRepositorio supermercadoRepo;
	private SimpMessagingTemplate websocket;

	
	@GetMapping("/pedidos")
	public List<PedidoDto> lista() {
		return repo.findAll().stream()
				.map(pedido -> new PedidoDto(pedido)).collect(Collectors.toList());
	}

	@GetMapping("/pedidos/{id}")
	public PedidoDto porId(@PathVariable("id") Long id) {
		Pedido pedido = repo.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException());
		return new PedidoDto(pedido);
	}

	@PostMapping("/pedidos")
	public PedidoDto adiciona(@RequestBody Pedido pedido) {
		pedido.setDataHora(LocalDateTime.now());
		pedido.setStatus(Pedido.Status.REALIZADO);
		pedido.getItens().forEach(item -> item.setPedido(pedido));
		pedido.getEntrega().setPedido(pedido);
		Pedido salvo = repo.save(pedido);
		return new PedidoDto(salvo);
	}

	@PutMapping("/pedidos/{id}/status")
	public PedidoDto atualizaStatus(@RequestBody Pedido pedido) {
		repo.atualizaStatus(pedido.getStatus(), pedido);
		websocket.convertAndSend("/pedidos/"+pedido.getId()+"/status", pedido);
		return new PedidoDto(pedido);
	}

	@GetMapping("/parceiros/supermercados/{supermercadoId}/pedidos/pendentes")
	public List<PedidoDto> pendentes(@PathVariable("supermercadoId") Long supermercadoId) {
		return repo.doSupermercadoSemOsStatus(supermercadoId, Arrays.asList(Pedido.Status.REALIZADO, Pedido.Status.ENTREGUE)).stream()
				.map(pedido -> new PedidoDto(pedido)).collect(Collectors.toList());
	}
	
	@GetMapping("/pedidos/supermercados-avaliados")
	public List<SupermercadoComAvaliacaoDto> listaSupermercadosAvaliados(){
		List<SupermercadoDto> supermercados = supermercadoRepo.findAll().stream().map(supermercado -> new SupermercadoDto(supermercado)).collect(Collectors.toList());
		List<SupermercadoComAvaliacaoDto> supermercadosComAvaliacaoDto = new ArrayList<SupermercadoComAvaliacaoDto>();
		for (SupermercadoDto supermercado : supermercados) {
			Double media = avaliacaoRepo.mediaDoSupermercadoPeloId(supermercado.getId());
			SupermercadoComAvaliacaoDto superComAvaliacao = new SupermercadoComAvaliacaoDto(supermercado, media);
			supermercadosComAvaliacaoDto.add(superComAvaliacao);
		}
		return supermercadosComAvaliacaoDto;
	}

}
