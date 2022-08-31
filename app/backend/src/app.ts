import 'express-async-errors';
import * as express from 'express';
import router from './routes/routes';
import errorMiddleware from './middlewares/error';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.app.use('/', router);
    this.app.use(errorMiddleware);
    // Não remover essa rota
    this.app.get('/', (req, res) => res.json());
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
