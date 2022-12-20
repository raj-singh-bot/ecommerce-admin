import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/UI/Card/Card';
import { REQUEST_CUSTOMER_ORDER, REQUEST_UPDATE_CUSTOMER_ORDER } from '../../store/order/OrderActionTypes';
import {useOrders} from '../../store/order/reducer'
import './style.css'

const Order = () => {
  const {Orders, busy} = useOrders();
  const dispatch = useDispatch()
  const [type, setType] = useState("");

  useEffect(() => {
    if ( !(Orders || []).length) {
        dispatch({ type: REQUEST_CUSTOMER_ORDER});
    }
  }, []);

  const onOrderUpdate = (orderId:any) => {
    const payload = {
      orderId,
      type,
    };
    dispatch({type: REQUEST_UPDATE_CUSTOMER_ORDER, payload});
  }

  const formatDate = (date:any) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      <Container>
      {Orders.map((orderItem:any, index:any) => (
        <Card
        style={{
          margin: "10px 0",
        }}
        key={index}
        headerLeft={orderItem._id}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "30px 50px",
            alignItems: "center",
          }}
        >
          <div>
            <div className="title">Items</div>
            {orderItem.items.map((item:any, index:any) => (
              <div className="value" key={index}>
                {item.productId.name}
              </div>
            ))}
          </div>
          <div>
            <span className="title">Total Price</span>
            <br />
            <span className="value">{orderItem.totalAmount}</span>
          </div>
          <div>
            <span className="title">Payment Type</span> <br />
            <span className="value">{orderItem.paymentType}</span>
          </div>
          <div>
            <span className="title">Payment Status</span> <br />
            <span className="value">{orderItem.paymentStatus}</span>
          </div>
        </div>
        <div
          style={{
            boxSizing: "border-box",
            padding: "30px 100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="orderTrack">
            {orderItem.orderStatus.map((status:any, index:any) => (
              <div
                className={`orderStatus ${
                  status.isCompleted ? "active" : ""
                }`}
                key={index}
              >
                <div
                  className={`point ${status.isCompleted ? "active" : ""}`}
                ></div>
                <div className="orderInfo">
                  <div className="status">{status.type}</div>
                  <div className="date">{formatDate(status.date)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* select input to apply order action */}
          <div
            style={{
              padding: "0 50px",
              boxSizing: "border-box",
            }}
          >
            <select onChange={(e) => setType(e.target.value)}>
              <option value={""}>select status</option>
              {orderItem.orderStatus.map((status:any, index:any) => {
                return (
                  <>
                    {!status.isCompleted ? (
                      <option key={status.type} value={status.type}>
                        {status.type}
                      </option>
                    ) : null}
                  </>
                );
              })}
            </select>
          </div>
          {/* button to confirm action */}

          <div
            style={{
              padding: "0 50px",
              boxSizing: "border-box",
            }}
          >
            <button onClick={() => onOrderUpdate(orderItem._id)} style={{backgroundColor: '#222', color: '#fff', padding: '10px 16px'}}>
              confirm
            </button>
          </div>
        </div>
      </Card>
      ))}
      </Container>
    </Layout>
  )
}

export default Order