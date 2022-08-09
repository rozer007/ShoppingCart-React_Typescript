import { Col, Row } from 'react-bootstrap'
import StoreItem from '../Components/StoreItem'
import storeItem from '../Data/items.json'

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xl={3} xs={1} className='g-3'>
        {storeItem.map(item => (
        <Col key={item.id}><StoreItem {...item}/></Col>
        ))}
      </Row>
    </>
  )
}

export default Store