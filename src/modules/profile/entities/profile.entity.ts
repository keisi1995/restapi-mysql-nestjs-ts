import { IProfile } from 'src/modules/profile/interfaces/profile.interface';
import { OneToMany, CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('profiles')
export class ProfileEntity implements IProfile {
	@PrimaryGeneratedColumn({ name: 'profile_id' })
	id: number;

	@Column({ type: 'varchar', length: 20, unique: true })
	name: string;

	@Column({ type: 'varchar', length: 20 })
	status: string;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;

	@OneToMany(() => UserEntity, (user) => user.profile)
	users: UserEntity[];
}
