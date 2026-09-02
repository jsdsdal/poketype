package org.example.poketype.service;

import org.example.poketype.dto.PokeApiPokemonResponse;
import org.example.poketype.model.Pokemon;
import org.example.poketype.model.Type;
import org.example.poketype.repositories.PokemonRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class PokeApiService {

    private final RestClient restClient = RestClient.create("https://pokeapi.co/api/v2");
    private final PokemonRepository pokemonRepository;

    public PokeApiService(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    public void fetchAndSavePokemon(int id) {
        PokeApiPokemonResponse response = restClient.get()
                .uri("/pokemon/{id}", id)
                .retrieve()
                .body(PokeApiPokemonResponse.class);

        if (response == null) return;

        Pokemon pokemon = mapToEntity(id, response);
        pokemonRepository.save(pokemon);
    }

    private Pokemon mapToEntity(int id, PokeApiPokemonResponse response) {
        Pokemon pokemon = new Pokemon();
        pokemon.setPokedex(String.valueOf(id));
        pokemon.setName(response.getName());
        pokemon.setType(mapTypes(response));
        return pokemon;
    }

    private List<Type> mapTypes(PokeApiPokemonResponse response) {
        return response.getTypes().stream()
                .map(slot -> Type.valueOf(slot.getType().getName().toUpperCase()))
                .toList();
    }
}