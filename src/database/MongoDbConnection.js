import { connect } from "mongoose";
import { createLogger, format as _format, transports as _transports } from 'winston';
import { config } from 'dotenv';
config();

const dbURI = process.env.DB_URI;

const logger = createLogger({
  level: 'info',
  format: _format.simple(),
  transports: [
    new _transports.Console()
  ]
});

connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((mongooseInstance) => {
    logger.info("Connected to MongoDB");
    // Perform any additional operations with mongooseInstance
  })
  .catch((error) => {
    logger.error("Failed to connect to MongoDB", error);
  });
