const enableGracefulShutdown = (server, mongoose) => {
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);
    
    server.close(async () => {
      console.log('HTTP server closed. Draining connections...');
      try {
        if (mongoose.connection.readyState === 1) {
          await mongoose.connection.close(false);
          console.log('MongoDB connection closed gracefully.');
        }
        process.exit(0);
      } catch (err) {
        console.error('Error during shutdown:', err);
        process.exit(1);
      }
    });

    // Force shutdown after 10s if connections refuse to drain
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

module.exports = enableGracefulShutdown;