import { compare } from 'bcryptjs';
import { sign, decode } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../database/models/usersModel';
import { ILoginService, IResponseService, ITokenId } from '../interfaces';
import HttpException from '../shared/HttpException';

class LoginService implements ILoginService {
  public userModel = User;

  public login = async (email: string, password: string): Promise<IResponseService> => {
    const user = await this.userModel.findOne({ where: { email } }) as User;

    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const senha = await compare(password, user.password);
    if (senha === false) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
    return { status: 200, response: token } as IResponseService;
  };

  public validate = async (authorization: string):Promise<IResponseService> => {
    const token = authorization;

    const { id } = decode(token) as ITokenId;

    const user = await this.userModel.findOne({ where: { id } }) as User;

    if (!user) {
      throw new HttpException(401, 'Invalid token');
    }

    return { status: 200, response: { role: user.role } } as IResponseService;
  };
}

export default LoginService;
