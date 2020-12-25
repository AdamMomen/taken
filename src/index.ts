import cluster from "cluster";
import runApp from "./app";
import config from "./config";
import Logger from "./loaders/logger";

/**
 * @main function that forks multi-process clustered application
 * @param singleCpu Boolean flag for starting single on multi process
 *
 */
const main = async (singleCpu = false) => {
  if (singleCpu) {
    return await runApp();
  }

  if (cluster.isMaster) {
    const cpuCount = config.worker.concurrency;
    Logger.info(`⚒ Running ${cpuCount} Process`);

    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
  } else {
    await runApp();
  }
};

const myArgs = process.argv.slice(2);

switch (myArgs[0]) {
  case "--single-cpu":
    main(true).catch((err) => console.log(err));
    break;
  case "--multi-cpu":
    main(false).catch((err) => console.log(err));
    break;
  default:
    main(true).catch((err) => console.log(err));
}
