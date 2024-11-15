import { IUserMerchant } from '../interfaces/user_merchant.interface';
import { CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Entity, Column, PrimaryColumn, Index, Unique, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { MerchantEntity } from 'src/modules/merchant/entities/merchant.entity';

@Entity('users_merchants')
@Unique(['user_id', 'merchant_id'])
export class UserMerchantEntity implements IUserMerchant {
	@PrimaryGeneratedColumn({ name: 'user_merchant_id' })
	id: number;

	@Column({ name: 'user_id', type: 'int' })
	user_id: number;

	@Column({ name: 'merchant_id', type: 'int' })
	merchant_id: number;

	@ManyToOne(() => UserEntity, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToOne(() => MerchantEntity, (merchant) => merchant.id)
	@JoinColumn({ name: 'merchant_id' })
	merchant: MerchantEntity;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
