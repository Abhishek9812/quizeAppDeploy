import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
import * as swagger from 'swagger-express-ts';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';
import { appAPI } from './routes/apiroutes';
import mongoose, { ConnectOptions } from "mongoose";
import { secretUtil } from './utils/secretutil';

/**
 * @description Express server application class.
 */
class App {
public server = express();

constructor() {
  this.initMiddlewares();
  this.MongoosConnect();
  this.defineRoutes();
}

private initMiddlewares(): void {
  this.server.use('/api-docs/swagger', express.static('swagger'));
  this.server.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
  this.server.use(bodyParser.json());
  this.server.use(swagger.express({
    definition: {
      info: {
        title: "Road Runner APIs",
        version: "1.0",
      },
      securityDefinitions: {
        apiKeyHeader: {
          type: SwaggerDefinitionConstant.Security.Type.API_KEY,
          in: SwaggerDefinitionConstant.Security.In.HEADER,
          name: "Authorization"
        }
      }
    }
  }));
}

private MongoosConnect() {
  const username = encodeURIComponent(secretUtil.MONGODB_USERNAME as string);
  const password = encodeURIComponent(secretUtil.MONGODB_PASSWORD as string);
  const authMechanism = "SCRAM-SHA-1";
  const clusterUrl = secretUtil.MONGODB_SERVER;

  var ip = secretUtil.MONGODB_SERVER;
  // const uri =`mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

  // this is abhishek quize application link
  var dbName = secretUtil.MONGODB_DBNAME as string;
  const uri =`mongodb+srv://${username}:${password}@cluster0.cxuazmw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  // var conn = "mongodb://" + ip + ":27017/" + dbName + "?username=prashant&password=malik";

  mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false,
    
  }as ConnectOptions) // if error it will throw async error
    .then(() => { // if all is ok we will be here
      mongoose.connection.useDb(dbName);
      console.log('> MongoDB connected - ' + ip);
      // loggerUtil.error('> MongoDB connected - '+ip);
    })
    .catch(err => { // we will not be here...
      console.error('> MongoDB connection error.........' + err.stack);
      // loggerUtil.error('> MongoDB connection error.........'+err.stack);
      process.exit(1);
    });
}

private defineRoutes(): void {

  // API Base path
  // this.server.use(bodyParser.urlencoded({ extended: false }));
  // this.server.use(bodyParser.json());
  this.server.use(appAPI.path, appAPI.routerinstance);

  // fallback invalid route
  this.server.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      success: false,
      message: 'Invalid route',
      result: {},
      statusCode: 404
    });
  });
}

}

// initialize server app
const app = new App();

// export the default "App" class object "server" property
export default app;