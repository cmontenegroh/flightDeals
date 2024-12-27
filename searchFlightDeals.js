require('dotenv').config(); // Cargar las variables de entorno
const Amadeus = require('amadeus');

// Configuración del cliente de Amadeus
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// Función para buscar ofertas de vuelos
const searchFlightDeals = async () => {
  try {
    // Solicitar ofertas de vuelos desde Amadeus
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'EZE', // Aeropuerto de origen (ejemplo: Ezeiza)
      destinationLocationCode: 'CDG', // Aeropuerto de destino (ejemplo: Charles de Gaulle)
      departureDate: '2025-01-15', // Fecha de salida
      adults: 1, // Número de pasajeros adultos
      max: 5, // Máximo número de resultados
    });

    const flights = response.data;

    if (flights.length === 0) {
      console.log('No se encontraron ofertas de vuelos.');
      return;
    }

    // Mostrar las ofertas encontradas en la consola
    console.log('Ofertas de vuelos encontradas:');
    flights.forEach((flight, index) => {
      const price = flight.price.total;
      const currency = flight.price.currency;
      const airline = flight.validatingAirlineCodes[0];
      const departure = flight.itineraries[0].segments[0].departure.iataCode;
      const arrival = flight.itineraries[0].segments[0].arrival.iataCode;

      console.log(
        `\n${index + 1}. ${airline} de ${departure} a ${arrival} - ${price} ${currency}`
      );
    });
  } catch (error) {
    console.error('Error al buscar ofertas de vuelos:', error);
  }
};

// Ejecutar la búsqueda de vuelos
searchFlightDeals();




