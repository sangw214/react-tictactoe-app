import React, { Component } from 'react'
import './ExpenseItem.css'
import { MdEdit, MdDelete } from 'react-icons/md'

/*
export class ExpenseItem extends Component {
  render() {
    return (
        <li className="item">
          <div className="info">
            <span className="expense">
              { this.props.expense.charge }
            </span>
            <span className="amount">
              { this.props.expense.amount }&nbsp;
              원
            </span>
          </div>
          <div>
            <button className="edit-btn">
              <MdEdit />
            </button>
            <button className="clear-btn" onClick={()=>
              
              this.props.handleDelete( this.props.expense )

            } >
              <MdDelete />
            </button>
          </div>
        </li>
    )
  }
}
*/

const ExpenseItem = ( { expense, handleDelete, handleEdit } ) => {

  return (
    <li className="item">
      <div className="info">
        <span className="expense">
          { expense.charge }
        </span>
        <span className="amount">
          { expense.amount }&nbsp;
          원
        </span>
      </div>
      <div>
        <button className="edit-btn" onClick={()=>
          handleEdit( expense )
        } >
          <MdEdit />
        </button>
        <button className="clear-btn" onClick={()=>
          
          handleDelete( expense )

        } >
          <MdDelete />
        </button>
      </div>
    </li>
  )

}

export default ExpenseItem
