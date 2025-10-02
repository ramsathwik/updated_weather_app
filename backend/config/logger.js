import { createLogger, transports, format } from "winston";
import "winston-daily-rotate-file";
import path from "path";
import rootDir from "../src/utils/rootDir.js";

// Common format for file logs (no colors)
const fileLogFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    (info) =>
      `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// Format for console logs (colors included)
const consoleLogFormat = format.combine(
  format.colorize({ all: true }), // colors all parts
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
  )
);

const logger = createLogger({
  level: "info",
  transports: [
    new transports.File({
      filename: path.join(rootDir, "logs", "combinedlogs.log"),
      level: "info",
      format: fileLogFormat,
    }),
    new transports.File({
      filename: path.join(rootDir, "logs", "error.log"),
      level: "error",
      format: fileLogFormat,
    }),
    new transports.Console({
      level: "debug",
      format: consoleLogFormat,
    }),
  ],
});

logger.exceptions.handle(
  new transports.File({
    filename: path.join(rootDir, "logs", "exceptions.log"),
  })
);

logger.rejections.handle(
  new transports.File({
    filename: path.join(rootDir, "logs", "rejections.log"),
  })
);

export default logger;
