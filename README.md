# Pokémon Data Explorer

A modern, responsive React application that allows users to explore and filter Pokémon data from the PokeAPI.

![Pokémon Data Explorer Screenshot](https://via.placeholder.com/800x450)

## Features

- **Browse Pokémon**: View the first 150 Pokémon with their official artwork
- **Search Functionality**: Filter Pokémon by name using the search bar
- **Type Filtering**: Filter Pokémon by their elemental type
- **Dynamic Card Styling**: Each Pokémon card is styled based on their primary type
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Visual Effects**: Subtle animations for a more engaging user experience

## Technology Stack

- **React**: Frontend library for building the user interface
- **CSS**: Custom styling with gradients, animations, and responsive design
- **PokeAPI**: External API for fetching Pokémon data

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pokemon-explorer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pokemon-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`



## How It Works

The application makes API calls to PokeAPI to fetch data about the first 150 Pokémon. It then allows users to search by name or filter by type. Each Pokémon card displays:

- Pokémon ID (formatted with leading zeros)
- Name
- Official artwork image
- Type badges

The styling of each card dynamically changes based on the Pokémon's primary type, using custom gradients for each type.

## API Reference

This project uses the [PokeAPI](https://pokeapi.co/):
- `https://pokeapi.co/api/v2/pokemon?limit=150` - Fetches basic data for the first 150 Pokémon
- Individual Pokémon data is fetched using the URLs provided in the initial response

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgements

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data
- Pokémon is © Nintendo, Game Freak, and The Pokémon Company
- This project is for educational purposes only
