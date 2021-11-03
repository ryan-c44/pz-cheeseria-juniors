// Components
import CartItem from './CartItem/CartItem';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
//import DeleteIcon from '@mui/icons-material/Delete';
// Types
import { CartItemType } from '../App';
// Styles
import { Wrapper } from './Cart.styles';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  purchaseMade: () => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, clearCart, purchaseMade }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  // Extra features: Adding a snackbar which shows the user if the purchase was successful or not
  const makePurchase = async () => {
    // Creating body for API call
    const totalPrice = calculateTotal(cartItems).toFixed(2);
    const purchaseInfo = {
      items: cartItems,
      total: totalPrice
    };
  
    try {
      const response = await fetch('/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseInfo)
      });

      if (response.status === 200) {
        clearCart();
      } else {
        console.log("Could not purchase items")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper data-cy="cart">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>Your cart is empty!</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length > 0 && (
        <div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={() => {makePurchase(); purchaseMade();}}
            data-cy="purchase-btn"
          >
            Purchase
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={clearCart}
            style={{float:'right'}}
          >
            Clear
          </Button>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;