import * as express from 'express';
import UsersRouter from './routes/user';
import TeamsRouter from './routes/team';
import MatchesRouter from './routes/match';
import LeaderRouter from './routes/leaderboard';
import httpErrorMiddleware from './middlewares/http.error.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();
    this.app.use(httpErrorMiddleware);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private routes(): void {
    this.app.use('/login', UsersRouter);
    this.app.use('/teams', TeamsRouter);
    this.app.use('/matches', MatchesRouter);
    this.app.use('/leaderboard', LeaderRouter);
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

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
