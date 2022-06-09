export const options = {
  url: 'redis://localhost:6379',
  onClientReady: (client) => {
    client.on('error', (err) => {
      console.log(err);
    });
  },
};
