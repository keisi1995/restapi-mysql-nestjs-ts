import { ProfileEntity } from 'src/modules/profile/entities/profile.entity'

export interface ResponseUserDTO {
	userid: number;
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	profile: ProfileEntity;
}
