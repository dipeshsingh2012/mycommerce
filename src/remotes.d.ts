declare module 'homepageUi/HomepageFragment' {
  import React from 'react';
  export interface HomepageFragmentProps {
    onCategorySelect?: (categorySlug: string) => void;
    onClearanceSelect?: (clearanceCm: number) => void;
  }
  export const HomepageFragment: React.FC<HomepageFragmentProps>;
  export default HomepageFragment;
}

declare module 'discoveryUi/DiscoveryFragment' {
  import React from 'react';
  export interface DiscoveryFragmentProps {
    initialCategory?: string;
    initialMaxHeight?: number | null;
    onProductSelect?: (product: any) => void;
    onClearanceFilterChange?: (clearanceCm: number | null) => void;
  }
  export const DiscoveryFragment: React.FC<DiscoveryFragmentProps>;
  export default DiscoveryFragment;
}

declare module 'productPageUi/ProductPageFragment' {
  import React from 'react';
  export interface ProductPageFragmentProps {
    productId?: string;
    onAddToCart?: (product: any) => void;
    renderCounterCheckSlot?: (product: any) => React.ReactNode;
    renderUpsellSlot?: (product: any) => React.ReactNode;
  }
  export const ProductPageFragment: React.FC<ProductPageFragmentProps>;
  export default ProductPageFragment;
}

declare module 'counterCheck/CounterCheckWidget' {
  import React from 'react';
  export interface CounterCheckWidgetProps {
    productId: string;
    productName: string;
    productHeightCm?: number;
    productTopClearanceCm?: number;
    onSelectAlternative?: (productId: string) => void;
    className?: string;
  }
  export const CounterCheckWidget: React.FC<CounterCheckWidgetProps>;
  export default CounterCheckWidget;
}

declare module 'cartUi/CartFragment' {
  import React from 'react';
  export interface CartFragmentProps {
    cartId?: string;
    onVerifyFitmentClick?: (productId: string) => void;
    onProceedToCheckout?: (cart: any) => void;
  }
  export const CartFragment: React.FC<CartFragmentProps>;
  export default CartFragment;
}

declare module 'checkoutUi/CheckoutFragment' {
  import React from 'react';
  export interface CheckoutFragmentProps {
    cartId?: string;
    onOrderComplete?: (receipt: any) => void;
    onReturnToShopping?: () => void;
  }
  export const CheckoutFragment: React.FC<CheckoutFragmentProps>;
  export default CheckoutFragment;
}

declare module 'searchUi/SearchModal' {
  import React from 'react';
  export interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectProduct?: (product: any) => void;
    onFullSearch?: (query: string, maxHeight?: number | null) => void;
    initialClearance?: number | null;
  }
  export const SearchModal: React.FC<SearchModalProps>;
  export default SearchModal;
}

declare module 'searchUi/SearchFragment' {
  import React from 'react';
  export interface SearchFragmentProps {
    initialQuery?: string;
    initialCategory?: string;
    initialBrand?: string;
    initialMaxHeight?: number | null;
    onProductSelect?: (product: any) => void;
    onClearanceFilterChange?: (clearanceCm: number | null) => void;
    onAddToCart?: (product: any) => void;
  }
  export const SearchFragment: React.FC<SearchFragmentProps>;
  export default SearchFragment;
}

declare module 'searchUi/SearchBar' {
  import React from 'react';
  export interface SearchBarProps {
    onOpenModal?: () => void;
    className?: string;
    placeholder?: string;
  }
  export const SearchBar: React.FC<SearchBarProps>;
  export default SearchBar;
}

declare module 'testimonialsUi/TestimonialsFragment' {
  import React from 'react';
  export interface TestimonialsFragmentProps {
    title?: string;
    subtitle?: string;
    onProductSelect?: (productId?: string) => void;
    showStats?: boolean;
    className?: string;
  }
  export const TestimonialsFragment: React.FC<TestimonialsFragmentProps>;
  export default TestimonialsFragment;
}

declare module 'testimonialsUi/TestimonialCard' {
  import React from 'react';
  export const TestimonialCard: React.FC<any>;
  export default TestimonialCard;
}

declare module 'upsellRemote/UpsellWidget' {
  import React from 'react';
  export interface UpsellWidgetProps {
    productId?: string;
    onAddToCart?: (item: any) => void;
    className?: string;
  }
  export const UpsellWidget: React.FC<UpsellWidgetProps>;
  export default UpsellWidget;
}
