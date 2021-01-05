const Redis = require("ioredis-mock");

class RedisMock {
  static Command = { _transformer: { argument: {}, reply: {} } };
  static _transformer = { argument: {}, reply: {} };

  constructor(...args: Object) {
    Object.assign(RedisMock, Redis);
    const instance = new Redis(args);
    instance.options = {};
    // semver in redis client connection requires minimum version 5.0.0
    // https://github.com/taskforcesh/bullmq/blob/da8cdb42827c22fea12b9c2f4c0c80fbad786b98/src/classes/redis-connection.ts#L9
    instance.info = async () => "redis_version:5.0.0";
    instance.client = (clientCommandName, ...addArgs) => {
      if (!instance.clientProps) {
        instance.clientProps = {};
      }

      switch (clientCommandName) {
        case "setname": {
          const [name] = addArgs;
          instance.clientProps.name = name;
          return "OK";
        }
        case "getname":
          return instance.clientProps.name;
        default:
          throw new Error(
            `This implementation of the client command does not support ${clientCommandName}`
          );
      }
    };
    return instance;
  }
}

module.exports = RedisMock;
