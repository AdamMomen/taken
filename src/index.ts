import os from "os";
import cluster from "cluster";
import runApp from "./app";
const main = async () => {
  if (cluster.isMaster) {
    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
  } else {
    await runApp();
  }
};

main().catch((err) => console.log(err));
