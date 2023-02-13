require("dotenv").config();
const cluster = require("cluster");
const OS = require("os");

if (cluster.isMaster) {
  let cpuCount = OS.cpus().length;
  console.log("CPU Count: " + cpuCount);
  cluster.fork();
} else {
  require("./server");
}
