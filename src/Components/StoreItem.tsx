import { Button, Card } from 'react-bootstrap'
import { useShoppingCart } from '../Context/ShoppingCartContext'
import { formatCurrency } from '../utilities/FormatCurrency'

type storeItemProps={
    id:number,
    name:string,
    price:number,
    imgUrl:string
}
const StoreItem = ({id,name,price,imgUrl}:storeItemProps) => {

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart}=useShoppingCart();
    

    const quantity=getItemQuantity(id);

  return (
    <Card className='h-100'>
    <Card.Img src={imgUrl} variant='top' height='200px'
      style={{objectFit:'cover'}}
      >
    </Card.Img> 
    <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
            <span className='fs-2'>{name}</span>
            <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
            {quantity === 0?<Button className='w-100' onClick={()=>increaseCartQuantity(id)}>+ Add To Cart</Button>
            :
            <div className='d-flex align-items-center flex-column'  style={{gap:'0.5rem'}}>
                <div className='d-flex align-items-center justify-content-center'>
                    <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
                    <div>
                        <span className='fs-3'>{quantity}</span> in cart
                    </div>
                    <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
                </div>
                <Button variant='danger' size='sm' onClick={()=>removeFromCart(id)}>Remove</Button>
            </div>
            }
        </div>
    </Card.Body>
    </Card>
  )
}

export default StoreItem