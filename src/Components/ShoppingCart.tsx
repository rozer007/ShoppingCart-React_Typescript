import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../Context/ShoppingCartContext'
import { formatCurrency } from '../utilities/FormatCurrency';
import CartItem from './CartItem';
import storeItem from '../Data/items.json';

type ShoppingCartProps={
    isOpen:boolean;
}

const ShoppingCart = ({isOpen}:ShoppingCartProps)=> {

    const{closeCart,cartItems}=useShoppingCart();

  return (
    <Offcanvas show={isOpen} placement='end' onHide={closeCart}>
        <Offcanvas.Header closeButton >
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
             <Stack gap={3}>
                {cartItems.map(item=>{
                    return(
                    <CartItem key={item.id} {...item}/>
                    )
                })}
                <div className='ms-auto fw-bold fs-5'>
                    Total{" "}
                    {formatCurrency(cartItems.reduce((total,cartItem)=>{
                        const item=storeItem.find(i=>i.id===cartItem.id)
                        return total+ (item?.price||0) * cartItem.quantity
                    },0))}
                </div>
             </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart