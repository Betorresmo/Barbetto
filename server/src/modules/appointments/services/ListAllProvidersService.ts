import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async run({ user_id }: IRequest): Promise<User[]> {
    const providers = await this.usersRepository.findAll({
      except_user_id: user_id,
    });

    return providers;
  }
}

export default ListAllProvidersService;