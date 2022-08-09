import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../Context/ShoppingCartContext'
import storeItems from '../Data/items.json' 
import { formatCurrency } from '../utilities/FormatCurrency'

type cartItemProps={
    id:number,
    quantity:number
}


const CartItem = ({id,quantity}:cartItemProps) => {

    const{removeFromCart}=useShoppingCart()

    const item=storeItems.find(item=>item.id===id)

    if(item===null)
    return null

    return(
        <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
            <img 
                src={item?.imgUrl}
                style={{width:'125px',height:'75px', objectFit:'cover'}}
            />
            <div className='me-auto '>
                <div>
                    {item?.name}
                    {quantity>1 &&(
                        <span className='text-muted' style={{fontSize:'0.65rem'}}>x{quantity}</span>
                    )}
                </div>
                <div className='text-muted' style={{fontSize:'.75rem'}}>
                    {formatCurrency(item?.price||0)}
                </div>
            </div>
            <div>{formatCurrency((item?.price||0)*quantity)}</div>
            <Button variant='outline-danger'
                size='sm' 
                onClick={()=>{removeFromCart(id)}}>
            &times;
            </Button>
        </Stack>
    )
}

export default CartItem