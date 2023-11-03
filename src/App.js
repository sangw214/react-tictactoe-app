import { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

/*
class App extends Component {

  constructor( props ){

    super( props )

    this.state = {
      expenses : [
        { id: 1, charge: '렌트비', amount: 1600 },
        { id: 2, charge: '교통비', amount: 400 },
        { id: 3, charge: '식비', amount: 1200 },
        { id: 4, charge: '도서비', amount: 3600 },
        { id: 5, charge: '회식비', amount: 30000 },
      ]
    }

  }

  handleDelete = ( { id } ) => {
    this.setState( { expenses : this.state.expenses.filter( expense => expense.id !== id ) } )
  }

  render(){
    return (
      <main className="main-container">
        <h1>예산 계산기</h1>
        <div style={{ width:'100%', backgroundColor:'white', padding: '1rem' }}>
          <ExpenseForm />
          <br/>
          <ExpenseList 
            initialExpenses={ this.state.expenses } 
            handleDelete={ this.handleDelete }
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
          <p style={{ fontSize: '2rem' }}>총지출: <span>원</span></p>
        </div>        
      </main>
    )
  }

}
*/

const App = () => {

  const [ expenses, setExpenses ] = useState(
    [
      { id: 1, charge: '렌트비', amount: 1600 },
      { id: 2, charge: '교통비', amount: 400 },
      { id: 3, charge: '식비', amount: 1200 },
      { id: 4, charge: '도서비', amount: 3600 },
      { id: 5, charge: '회식비', amount: 30000 },
    ]
  )

  const [ id, setId ] = useState('')
  const [ charge, setCharge ] = useState('')
  const [ amount, setAmount ] = useState(0)
  const [ alert, setAlert ] = useState({show : false})
  const [ edit, setEdit ] = useState( false )

  const handleDelete = ( { id } ) => {

    const _v = expenses.filter( expense => expense.id === id )

    setExpenses( expenses.filter( expense => expense.id !== id ) )

    handleAlert({type:'danger',text:` '${_v[0].charge}' 아이템이 삭제 되었습니다.`})

  }

  const handleCharge = ( e ) => {
    setCharge( e.target.value )
  }

  const handleAmount = ( e ) => {
    setAmount( e.target.valueAsNumber )
  }

  const handleSubmit = ( e ) => {
    e.preventDefault()
    if( charge !== "" && amount > 0 ){
      if( edit ){
        const _val = expenses.map( item => {
          return item.id === id ? { ...item, charge, amount } : item
        } )
        setExpenses( _val )
        handleAlert({type:'success',text:'아이템이 수정 되었습니다.'})
      }else{
        const _val = [ ...expenses, { id : crypto.randomUUID() , charge : charge, amount : amount } ]
        setExpenses( _val )
        handleAlert({type:'success',text:'아이템이 생성 되었습니다.'})
      }
      
      setCharge("")
      setAmount(0)
      
    }else{
      handleAlert({type:'danger',text:'항목, 비용은 빈값으로 입력 할 수 없습니다.'})
    }

  }

  const handleAlert = ( { type, text } ) => {
    setAlert({ show : true, type, text })
    setTimeout(()=>{
      setAlert({ show : false })
    },3000)
  }

  const handleEdit = ( {id} ) => {
    const _val = expenses.find( item => item.id === id )
    const { charge, amount } = _val
    console.log( _val )
    setId( id )
    setCharge( charge )
    setAmount( amount )
    setEdit( true )
  }

  const handleClear = () => {
    setExpenses( [] )
    handleAlert({type:'danger',text:'목록을 모두 지웠습니다.'})
  }

  return (
    <main className="main-container">
      <h1>계산기 </h1>
      <div style={{ width:'100%', backgroundColor:'white', padding: '1rem' }}>
        <ExpenseForm 
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <br/>
        <ExpenseList 
          expenses={expenses} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleClear={handleClear}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}>총지출: 
          <span>
            { 
              ( 
                expenses.reduce( ( acc, curr ) => {
                  return acc += curr.amount
                }, 0) 
              ).toLocaleString() 
            } 원
          </span>
        </p>
      </div>
      { alert.show ? <Alert handleAlert={ handleAlert } type={ alert.type } text={ alert.text } /> : null }
    </main>
  )

}

export default App;