import React, { useState } from 'react';
import { useQuery } from 'react-query';

// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Purchases from './Purchases/Purchases';
import ItemDialog from './Dialogs/ItemDialog/ItemDialog';
import PurchaseDialog from './Dialogs/PurchaseDialog/PurchaseDialog';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';

// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { Toolbar, Typography } from '@material-ui/core';

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

//Construct new type for purchaseItems, including an order id, the items included in the order and the total price of order
export type PurchaseItemType = {
  id: number;
  items: CartItemType[];
  total: number;
};

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const getPurchases = async (): Promise<PurchaseItemType[]> =>
  await (await fetch(`api/purchases`)).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [purchasesOpen, setPurchasesOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({} as CartItemType);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  console.log(data);

  const { 
    data: purchaseData,
    isLoading: purchasesLoading,
    error: purchasesError,
    refetch: refetchPurchases
  } = useQuery<PurchaseItemType[]>(
    'purchases',
    getPurchases
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  // Remove cart items and close cart drawer
  const clearCart = () => {
    setCartItems([]);
    setCartOpen(false);
  };

  //  User feedback when purchase is made
  const purchaseMade = () => {
    setPurchaseDialogOpen(true);
  }

  const handleOpenRecentPurchases = () => {
    refetchPurchases(); //Refresh purchases by refetching data
    setPurchasesOpen(true); //open purchase drawer
  };


  const handleOpenItemDialog = (item: CartItemType) => {
    setClickedItem(item);
    setItemDialogOpen(true);
  }

  const handleCloseItemDialog = () => {
    setItemDialogOpen(false);
  };

  const handleClosePurchaseDialog = () => {
    setPurchaseDialogOpen(false);
  }

  if (isLoading || purchasesLoading) return <LinearProgress />;
  if (error || purchasesError) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={() => handleOpenRecentPurchases()} data-cy="open-purchases">
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton
              onClick={() => setCartOpen(true)}
              data-cy="open-cart"
            >
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          clearCart={clearCart}
          purchaseMade={purchaseMade}
        />
      </Drawer>

      <Drawer anchor='left' open={purchasesOpen} onClose={() => setPurchasesOpen(false)}>
        <Purchases
          purchases={purchaseData ?? []}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item 
              item={item}
              handleAddToCart={handleAddToCart}
              handleOpenDialog={handleOpenItemDialog}
            />
          </Grid>
        ))}
      </Grid>

      <ItemDialog
        open={itemDialogOpen}
        item={clickedItem}
        handleClose={handleCloseItemDialog}
        handleAddCart={handleAddToCart}
      />

      <PurchaseDialog
        open={purchaseDialogOpen}
        handleClose={handleClosePurchaseDialog}
      />
      
    </Wrapper>

  );
};

export default App;