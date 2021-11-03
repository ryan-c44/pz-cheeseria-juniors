import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
  handleOpenDialog: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart, handleOpenDialog }) => (
  <Wrapper>
    <div onClick={() => handleOpenDialog(item)}>
      <img src={item.image} alt={item.title} />
      <div className="text-content">
        <h3>{item.title}</h3>
        <h3>${item.price}</h3>
      </div>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      color="primary"
      startIcon={<ShoppingCartIcon/>}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>
);

export default Item;