const Hapi = require('@hapi/hapi');
const Routes = require('./routes');
const Notes = require('./notes');
const AddNoteHandler = require('./handler');

const init = async () => {
  const server = Hapi.server({
    // eslint-disable-next-line linebreak-style
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(Routes);

  await server.start();
  console.log(`Aplikasi berjalan pada ${server.info.uri}`);
};

init();
