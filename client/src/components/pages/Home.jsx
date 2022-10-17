/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {  getUserId } from "../../store/user/actions";
import {
  deleteOperation,
  filterOperation,
  getOperation,
} from "../../store/operation/actions";
import Request from '../Request';
import './styles/home.css';
import Modal from "../modal/Modal";


const Home = () => {
  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.userReducer.loading);
  const operation = useSelector((state) => state.operationReducer.operation);
  const dispatch = useDispatch();
  const [balance, setBalance] = useState();
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);

  const logged = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(logged){
        dispatch(getUserId(logged.id))
    }
  }, []);

  const currentBalance = () => {
    let entry = 0;
    let egress = 0;
    if (operation && operation.length > 0) {
      operation.forEach((element) => {
        if (element.type === "entry") {
          entry += parseInt(element.amount);
        } else if (element.type === "egress") {
          egress += parseInt(element.amount);
        }
      });

      let res = entry - egress;
      setBalance(res);
      
    } else {
      setBalance(null);
    }
    setHidden(hidden ? false : true)
  };

  const getDate = (time) => {
    let date = new Date(time).toDateString();
    return date;
  };

  const deleteInfo = async (id) => {
    await dispatch(deleteOperation(id));
  };




  return (
   
    <div className='container'>
      <h1>ABM of operations (income and expenses)</h1>
      <div>

      </div>
      <div className='contentOperations'>
      <Request />
      <div className ='contentBalance'>
        <button className='btn'onClick={() => currentBalance()}>Balance</button>
      
      {balance ? <p className={hidden ? 'active' : 'hidden'}>{balance}</p>
       : <p className={hidden ? 'active' : 'hidden'}>0</p>}
       </div>
       
       
                <div className='filter'>
                    <button 
                        className='button' 
                        onClick={() => dispatch(filterOperation("entry", logged.id))}> 
                            Entry 
                    </button>
                    <button 
                        className='button'  
                        onClick={() => dispatch(filterOperation("egress", logged.id))}> 
                            Egress 
                    </button>
                    <button 
                        className='button' 
                         onClick={() => dispatch(getUserId(logged.id))}
                        > 
                            All
                    </button>
                </div>
       
      {operation && operation.length > 0 ? (
        operation.map((element, i) => (
          <div key={element.id}>
            <ul className={i%2 === 0 ? 'pair' : 'odd'}>
              <li>{element.concept}</li>
              <li>{element.amount}</li>
              <li>{element.type}</li>
              <li>{getDate(element.createdAt)}</li>
              <li> 
                <button className='button' onClick={() => deleteInfo(element.id)}>delete</button>
              </li>
              <li>
               <button className='button' onClick={() => setOpen(true)}>update</button>
              {open && <Modal setOpen= {setOpen} id={element.id} logged={logged}/>}
              </li>
            </ul>
          </div>
          
        ))
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
    </div>
   
  );
};

export default Home;
