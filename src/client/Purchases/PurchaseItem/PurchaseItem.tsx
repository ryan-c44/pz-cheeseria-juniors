// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './PurchaseItem.styles';

type Props = {
  items: CartItemType[];
  totalPrice: number;
}

//Make component for purchaseItem to displayed within list of purchases
//Map each item fetched from server

const PurchaseItem:React.FC<Props> = ({ items, totalPrice }) => {
  return (
    <Wrapper>
      {items.map(item => (
        <div className="item" key={item.id}>
          <div>
            <h3>{item.title}</h3>
            <div>
              <p><b>Quantity:</b> {item.amount}</p>
              <p><b>Total:</b> ${(item.amount * item.price).toFixed(2)}</p>
            </div>
          </div>
          <img src={item.image} alt={item.title} style={{width: 150,borderRadius: 100}}/>
        </div>
      ))}
      <h3>Total: ${totalPrice}</h3>
    </Wrapper>
  )
};

export default PurchaseItem;