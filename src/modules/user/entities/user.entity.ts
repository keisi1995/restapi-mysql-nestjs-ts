import { IUser } from 'src/modules/user/interfaces/user.interface';
import { CreateDateColumn, UpdateDateColumn, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { Exclude } from 'class-transformer';
import { UserMerchantEntity } from 'src/modules/user_merchant/entities/user_merchant.entity'


@Entity('users')
export class UserEntity implements IUser {
	@PrimaryGeneratedColumn({ name: 'user_id' })
	id: number;

	@Column({ type: 'varchar', length: 20 })
	first_name: string;

	@Column({ type: 'varchar', length: 20 })
	last_name: string;

	@Column({ type: 'varchar', length: 30, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 100 })
	// @Exclude()
	password: string;

	@Column({ type: 'boolean' })
	is_active: boolean;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;

	@ManyToOne(() => ProfileEntity, (profile) => profile.users)
	@JoinColumn({ name: 'profile_id' })
	profile: ProfileEntity;

	@OneToMany(() => UserMerchantEntity, (userMerchant) => userMerchant.user)
	userMerchants: UserMerchantEntity[];
}
