// schema.js
export default {
    name: 'Tickets',
    type: 'document',
    fields: [
      {
        name: 'id',
        type: 'string',
        title: 'ID del Ticket',
      },
      {
        name: 'status',
        type: 'string',
        title: 'Estado',
        options: {
          list: ['Disponible', 'Reservado', 'Comprado'],
        },
      },
    //   {
    //     name: 'buyer',
    //     type: 'string',
    //     title: 'ID del Ticket',
    //   },
      // Otros campos relevantes para los tickets, como fecha de creación, detalles, etc.
    ],
  };
  