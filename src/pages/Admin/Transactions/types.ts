export interface Payment {
  userId: string;
  stripeId: string;
  stringObject: string;
  provider: string | 'stripe';
  amount: number;
  currency: string;
  paymentMethodTypes: [string];
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
