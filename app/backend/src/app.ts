import * as express from 'express';
import 'express-async-errors';
import teamRouter from './routes/TeamsRouter';
import loginRouter from './routes/LoginRouter';
import matcheRouter from './routes/MatchesRouter';
import leaderboardRouter from './routes/LearderboardRouter';
import httpErrorMiddleware from './middlewares/http.error.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/login', loginRouter);

    this.app.use('/teams', teamRouter);

    this.app.use('/matches', matcheRouter);

    this.app.use('/leaderboard', leaderboardRouter);

    this.app.use(httpErrorMiddleware);
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
