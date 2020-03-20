import app from './app';

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  console.log(server.address().address, server.address().port)
});
