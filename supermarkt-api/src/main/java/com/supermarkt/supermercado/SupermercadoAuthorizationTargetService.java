package com.supermarkt.supermercado;

import org.springframework.stereotype.Service;

import com.supermarkt.seguranca.AutorizacaoTargetServico;
import com.supermarkt.seguranca.Role;
import com.supermarkt.seguranca.Usuario;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SupermercadoAuthorizationTargetService implements AutorizacaoTargetServico {
	
	private final SupermercadoRepositorio supermercadoRepo;

	@Override
	public Long getTargetIdByUser(Usuario usuario) {
		if (usuario.isInRole(Role.ROLES.SUPERMERCADO)) {
			Supermercado supermercado = supermercadoRepo.findByUsuario(usuario);
			if (supermercado != null) {
				return supermercado.getId();
			}
		}
		return null;
	}

}
