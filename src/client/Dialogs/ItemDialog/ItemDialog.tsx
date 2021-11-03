import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './ItemDialog.styles';

type Props = {
  item: CartItemType;
  open: boolean;
  handleClose: () => void;
  handleAddCart: (clickedItem: CartItemType) => void;
}

const ItemDialog: React.FC<Props> = ({ item, open, handleClose, handleAddCart }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Wrapper>
        <div>
        <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <h4>${item.price}</h4>
          <h4>{item.category}</h4>
          <p>{item.description}</p>
        </div>
        <div className='buttons'>
            <Button color="primary" startIcon={<ShoppingCartIcon/>} onClick={() => handleAddCart(item)}>Add to Cart</Button> 
            <Button className='close' color="secondary" onClick={handleClose}>Close</Button>
        </div>
      </Wrapper>
    </Dialog>
  )
};

export default ItemDialog;