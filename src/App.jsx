import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import TrackOrder from './pages/TrackOrder';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import StaticPage from './pages/StaticPage';
import NotFound from './pages/NotFound';
import CategoryRedirect from './pages/CategoryRedirect';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminCategories from './admin/AdminCategories';
import AdminOrders from './admin/AdminOrders';
import AdminCustomers from './admin/AdminCustomers';
import AdminCoupons from './admin/AdminCoupons';
import AdminInventory from './admin/AdminInventory';
import AdminHomepage from './admin/AdminHomepage';
import AdminSettings from './admin/AdminSettings';
import ProtectedAdmin from './admin/ProtectedAdmin';

const shippingContent = {
  title: 'Shipping Policy',
  sections: [
    { heading: 'Standard Shipping', content: 'We offer free standard shipping on all orders above ₹999. Orders below ₹999 incur a flat shipping fee of ₹49. Standard delivery takes 3-7 business days across India.' },
    { heading: 'Express Delivery', content: 'Express delivery (1-2 business days) is available for select pin codes at a flat rate of ₹99. This option can be selected at checkout.' },
    { heading: 'Order Processing', content: 'Orders are processed within 24 hours of placement. You will receive a confirmation email and SMS with your tracking number once your order is shipped.' },
    { heading: 'International Shipping', content: 'Currently, we only ship within India. International shipping is coming soon — subscribe to our newsletter for updates.' },
  ],
};

const returnsContent = {
  title: 'Returns & Refunds',
  sections: [
    { heading: '7-Day Return Policy', content: 'We offer a 7-day easy return policy from the date of delivery. Items must be unused, unwashed, and returned with original tags and packaging intact.' },
    { heading: 'How to Initiate a Return', content: 'Go to My Orders in your account, select the order and item you wish to return, and follow the return process. You can also contact our support team via WhatsApp or email.' },
    { heading: 'Refund Processing', content: 'Once we receive and inspect the returned item, refunds are processed within 5-7 business days to the original payment method. For COD orders, refunds are issued to your bank account.' },
    { heading: 'Non-Returnable Items', content: 'Certain items such as innerwear, accessories, and items on final sale are not eligible for returns. This will be indicated on the product page.' },
  ],
};

const privacyContent = {
  title: 'Privacy Policy',
  sections: [
    { heading: 'Information We Collect', content: 'We collect information you provide when creating an account, placing orders, or contacting us. This includes your name, email, mobile number, and delivery address.' },
    { heading: 'How We Use Your Information', content: 'Your information is used to process orders, provide customer support, send order updates, and improve your shopping experience. We do not sell your personal information to third parties.' },
    { heading: 'Data Security', content: 'We use industry-standard encryption and secure payment gateways to protect your data. Your payment information is never stored on our servers.' },
    { heading: 'Your Rights', content: 'You have the right to access, update, or delete your personal information. Contact us at support@kirtigarments.com to exercise these rights.' },
  ],
};

const termsContent = {
  title: 'Terms & Conditions',
  sections: [
    { heading: 'Acceptance of Terms', content: 'By accessing and using the Kirti Garments website, you accept and agree to be bound by these Terms & Conditions.' },
    { heading: 'Product Information', content: 'We strive to display product colors and details accurately. However, actual colors may vary slightly due to monitor settings and photography lighting.' },
    { heading: 'Pricing & Availability', content: 'All prices are in Indian Rupees (₹) and inclusive of taxes. We reserve the right to modify prices and availability without prior notice.' },
    { heading: 'Order Acceptance', content: 'We reserve the right to accept or decline any order. In case of pricing errors or unavailable items, we will notify you and process a refund if applicable.' },
  ],
};

const refundContent = {
  title: 'Refund Policy',
  sections: [
    { heading: 'Refund Eligibility', content: 'Refunds are issued for cancelled orders, returned items (within 7 days), and defective products. The refund amount includes the product price and applicable shipping charges.' },
    { heading: 'Refund Timeline', content: 'Refunds are processed within 5-7 business days after we receive and verify the returned product. The time for the refund to reflect in your account depends on your bank or payment provider.' },
    { heading: 'Refund Methods', content: 'For prepaid orders, refunds are credited to the original payment method. For COD orders, refunds are transferred to your bank account via NEFT within 7 business days.' },
  ],
};

const aboutContent = {
  title: 'About Kirti Garments',
  sections: [
    { heading: 'Our Story', content: 'Kirti Garments was founded with a vision to bring premium Indian fashion to every household. We blend traditional craftsmanship with modern aesthetics to create clothing that celebrates every occasion.' },
    { heading: 'Our Mission', content: 'To make premium quality fashion accessible to all, while preserving the rich heritage of Indian textiles and craftsmanship. We believe great fashion should not come at the cost of comfort or affordability.' },
    { heading: 'Quality Promise', content: 'Every product at Kirti Garments undergoes rigorous quality checks. We source the finest fabrics and work with skilled artisans to deliver clothing that lasts.' },
    { heading: 'Customer First', content: 'Our customers are at the heart of everything we do. From easy returns to responsive support, we strive to make your shopping experience seamless and enjoyable.' },
  ],
};

const sizeGuideContent = {
  title: 'Size Guide',
  sections: [
    { heading: 'How to Measure', content: 'Chest: Measure around the fullest part. Waist: Measure around your natural waistline. Hip: Measure around the fullest part of your hips. Length: Measure from shoulder to desired hem length.' },
    { heading: 'Men Sizes (Inches)', content: 'S: Chest 36-38, Waist 30-32. M: Chest 38-40, Waist 32-34. L: Chest 40-42, Waist 34-36. XL: Chest 42-44, Waist 36-38. XXL: Chest 44-46, Waist 38-40.' },
    { heading: 'Women Sizes (Inches)', content: 'S: Chest 32-34, Waist 26-28. M: Chest 34-36, Waist 28-30. L: Chest 36-38, Waist 30-32. XL: Chest 38-40, Waist 32-34. XXL: Chest 40-42, Waist 34-36.' },
    { heading: 'Kids Sizes', content: '2-3Y: Height 92-98cm. 4-5Y: Height 104-110cm. 6-7Y: Height 116-122cm. 8-9Y: Height 128-134cm. 10-11Y: Height 140-146cm.' },
  ],
};

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Routes>
                {/* Customer routes */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/men" element={<CategoryRedirect />} />
                  <Route path="/women" element={<CategoryRedirect />} />
                  <Route path="/kids" element={<CategoryRedirect />} />
                  <Route path="/ethnic-wear" element={<CategoryRedirect />} />
                  <Route path="/casual-wear" element={<CategoryRedirect />} />
                  <Route path="/new-arrivals" element={<CategoryRedirect />} />
                  <Route path="/best-sellers" element={<CategoryRedirect />} />
                  <Route path="/offers" element={<CategoryRedirect />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/account/orders" element={<Account />} />
                  <Route path="/account/addresses" element={<Account />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/about" element={<StaticPage {...aboutContent} />} />
                  <Route path="/shipping" element={<StaticPage {...shippingContent} />} />
                  <Route path="/returns" element={<StaticPage {...returnsContent} />} />
                  <Route path="/privacy" element={<StaticPage {...privacyContent} />} />
                  <Route path="/terms" element={<StaticPage {...termsContent} />} />
                  <Route path="/refund" element={<StaticPage {...refundContent} />} />
                  <Route path="/size-guide" element={<StaticPage {...sizeGuideContent} />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="inventory" element={<AdminInventory />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="coupons" element={<AdminCoupons />} />
                  <Route path="homepage" element={<AdminHomepage />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
