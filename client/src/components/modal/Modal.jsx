import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import './modal.css';
import { useDispatch } from "react-redux";
import { updateOperation } from "../../store/operation/actions";

const Modal = ({ setOpen , id, logged}) => {
   const dispatch = useDispatch();
   const [input, setInput] = useState({
    concept: "",
    amount: ""
   });

   const handleChange = (e) => {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    });
   }
   const updateInfo = async (id, input) => {
            setOpen(false);
            await dispatch(updateOperation(id, input));
        
      };
    const {concept, amount} = input;
  return (
     <>
      <div className='darkBG' onClick={() => setOpen(false)} />
      <div className='centered'>
        <div className='modal'>
          <div className='modalHeader'>
            <h5 className='heading'>Update data</h5>
          </div>
          <button className='closeBtn' onClick={() => setOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className='modalContent'>
            <label htmlFor="">concept: </label>
            <input type="text" name="concept" value={concept} onChange={handleChange} />
            <label htmlFor="">amounts: </label>
            <input type="text"  name="amount" value={amount} onChange={handleChange} />
          </div>
          <div className='modalActions'>
            <div className='actionsContainer'>
              <button className='confirmBtn' onClick={() => updateInfo(id, input)}>
                Confirm!
              </button>
              <button
                className='cancelBtn'
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
  );
};

export default Modal;
