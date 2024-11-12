export interface ResponseUserMerchantDTO {
	userid: number;
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	type: string;
	merchants: MerchantDTO[];
}

export interface MerchantDTO {
	merchantId: number;
	name: string;
	address: string;
}