import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface IProfile {
	id: number;
	name: string;
	status: string;
	users: UserEntity[];
	created_at: Date;
	updated_at: Date;
}
