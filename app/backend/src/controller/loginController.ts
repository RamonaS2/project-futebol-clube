import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import { IToken } from '../interfaces';

export default class LoginController {
  private loginService = new LoginService();

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const { status, response } = await this.loginService.login(email, password);

    const token = response as IToken;

    return res.status(status).json({ token });
  }

  public async validate(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers as IToken;

    const { status, response } = await this.loginService.validate(authorization);

    return res.status(status).json(response);
  }
}
