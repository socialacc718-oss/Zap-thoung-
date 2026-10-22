export type SizeKey = 'small' | 'medium' | 'large' | 'onlyGravy' | 'single' | 'family' | 'half' | 'full' | '6pcs' | '12pcs' | 'standard';

export interface SizeOption {
  label: string;
  sizeKey: SizeKey;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: string;
  categoryId: string;
  description: string;
  image: string;
  tags?: string[];
  sizes: SizeOption[];
  isPopular?: boolean;
  isSpecial?: boolean;
  dealItems?: string[];
}

export interface Category {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  itemCount: number;
  description: string;
}

export interface CartItem {
  cartItemId: string; // unique based on id + selected size
  item: MenuItem;
  selectedSize: SizeOption;
  quantity: number;
  specialInstructions?: string;
}

export type OrderType = 'delivery' | 'takeaway' | 'dinein';

export interface BranchInfo {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  area: string;
  address: string;
  mapsUrl: string;
}

export interface CustomerOrderDetails {
  customerName: string;
  phone: string;
  orderType: OrderType;
  branchId: string;
  deliveryAddress: string;
  notes?: string;
  paymentMethod: 'cash' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
}

export interface CompletedOrder {
  orderId: string;
  orderNumber: string;
  timestamp: string;
  customer: CustomerOrderDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  branch: BranchInfo;
}
