import Dialog from '@material-ui/core/Dialog';
import CheckCircle from '@material-ui/icons/CheckCircle';

// Styles
import { Wrapper } from './PurchaseDialog.styles';

type Props = {
  open: boolean;
  handleClose: () => void;
}

const PurchaseDialog: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Wrapper>
          <CheckCircle fontSize='large'/>
          <h3>Purchase Successful!</h3>  
      </Wrapper>
    </Dialog>
  )
};

export default PurchaseDialog;