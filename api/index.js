const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen( 3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });
});

//problemas con la muerte de node.js cada vez que el servidor al que llama se niega a conectarse. Esto evita eso
process.on('uncaughtException', function (err) {
  console.log(err);
}); 