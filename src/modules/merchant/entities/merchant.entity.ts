import { IMerchant } from '../interfaces/merchant.interface';
import { CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('merchants')
export class MerchantEntity implements IMerchant {
	@PrimaryGeneratedColumn({ name: 'merchant_id' })
	id: number;

	@Column({ type: 'varchar', length: 30, unique: true })
	name: string;

	@Column({ type: 'varchar', length: 50 })
	address: string;

	@Column({ type: 'varchar', length: 20 })
	mcc: string;

	@Column({ type: 'varchar', length: 11 })
	ruc: string;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;
}
