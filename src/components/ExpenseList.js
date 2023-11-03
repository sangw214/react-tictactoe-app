import React from 'react'
import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'
import { MdDelete } from 'react-icons/md'

/*
export class ExpenseList extends Component {
  render() {
    return (
      <>
        <ul className="list">
          { this.props.initialExpenses.map( e => {
            return <ExpenseItem 
                      expense={ e } 
                      key={ e.id } 
                      handleDelete= { this.props.handleDelete }
                    />
          } )}
        </ul>
        <button className="btn">
          목록지우기
          <MdDelete />
        </button>
      </>
    )
  }
}
*/

const ExpenseList = ( { expenses, handleDelete, handleEdit, handleClear } ) => {
  return (
    <>
      <ul className="list">
        { expenses.map( e => {
          return <ExpenseItem 
                    expense={e} 
                    key={e.id} 
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
        } )}
      </ul>
      { expenses.length > 0 &&(
        <button className="btn" onClick={handleClear}>
          목록지우기
          <MdDelete />
        </button>
      ) }
    </>
  )
}

export default ExpenseList
