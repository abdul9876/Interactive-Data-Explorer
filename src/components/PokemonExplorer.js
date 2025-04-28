import { useState, useEffect } from 'react';
import './PokemonExplorer.css';

const PokemonExplorer = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // Fetch the first 150 Pokemon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) throw new Error('Failed to fetch Pokemon');
        
        const data = await response.json();
        
        // Fetch detailed info for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) throw new Error(`Failed to fetch details for ${pokemon.name}`);
            return await detailResponse.json();
          })
        );
        
        // Extract all unique types
        const allTypes = new Set();
        pokemonDetails.forEach(pokemon => {
          pokemon.types.forEach(type => {
            allTypes.add(type.type.name);
          });
        });
        
        setTypes(Array.from(allTypes).sort());
        setPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    // Filter Pokemon based on search term and type
    const filtered = pokemon.filter(poke => {
      const matchesSearch = poke.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === '' || 
        poke.types.some(type => type.type.name === selectedType);
      return matchesSearch && matchesType;
    });
    
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon]);

  // Format ID number with leading zeros
  const formatId = (id) => {
    return `#${String(id).padStart(4, '0')}`;
  };

  // Get primary type of a Pokemon for card background styling
  const getPrimaryType = (poke) => {
    // If there's a selected type and this Pokemon has it, prioritize that type
    if (selectedType && poke.types.some(t => t.type.name === selectedType)) {
      return selectedType;
    }
    // Otherwise return the first type
    return poke.types[0]?.type.name || 'normal'; 
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <h2 className="error-title">Error</h2>
          <p className="error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="error-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <h1>Pokémon Data Explorer</h1>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <div className="container">
          <div className="search-filter-wrapper">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search Pokémon by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="type-selector">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Pokemon Grid */}
        {loading ? (
          <div className="loading-container">
            <div>Loading Pokémon...</div>
          </div>
        ) : filteredPokemon.length === 0 ? (
          <div className="not-found-container">
            <p className="not-found-message">No Pokémon found matching your criteria.</p>
          </div>
        ) : (
          <div className="pokemon-grid">
            {filteredPokemon.map((poke) => (
              <div 
                key={poke.id} 
                className="pokemon-card"
                data-main-type={getPrimaryType(poke)}
              >
                <div className="pokemon-image-container">
                  <img 
                    src={poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default}
                    alt={poke.name}
                    className="pokemon-image"
                  />
                </div>
                <div className="pokemon-info">
                  <p className="pokemon-id">{formatId(poke.id)}</p>
                  <h2 className="pokemon-name">{poke.name}</h2>
                  <div className="pokemon-types">
                    {poke.types.map((typeInfo) => (
                      <span 
                        key={typeInfo.type.name} 
                        className={`type-badge type-${typeInfo.type.name}`}
                      >
                        {typeInfo.type.name.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <p>Data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokeAPI</a></p>
        </div>
      </footer>
    </div>
  );
};

export default PokemonExplorer;