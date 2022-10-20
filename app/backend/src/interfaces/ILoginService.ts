import IResponseService from './IResponseService';

export default interface ILoginService {
  login: (email: string, password: string) => Promise<IResponseService>;
  validate: (authorization: string) => Promise<IResponseService>;
}
