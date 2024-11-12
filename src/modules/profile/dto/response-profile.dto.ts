import { UserEntity } from 'src/modules/user/entities/user.entity'

export class ResponseProfileDTO {
	id: number;
	name: string;
	status: string;
	users: UserEntity[];
	createdAt: Date;
	updatedAt: Date;
}