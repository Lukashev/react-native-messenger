import app from './app';

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`); // eslint-disable-line no-console
});
