import Container  from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import {useState} from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";


function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpensesModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpensesModalBudgetId(budgetId)
  }

  return (
  <>
  <div >
  <Container className="my-5">
      <h1 className="text-center font-weight-bold m-5">Budget Manager</h1>
      <hr></hr>
      <Stack direction="horizontal" gap="2" className="mb-4 m-4">
        <h2 className="me-auto font-weight-light">Your Budgets</h2>

        <Button variant="success" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense and Categorize</Button>
      </Stack>

      <div className="max-width mb-4 mt-4"> <TotalBudgetCard /></div>

      <div style={{
        display:"grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        gap: "1rem",
        alignItems: "flex-start"
    }}>


      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

        return <BudgetCard 
        key={budget.id}
        name={budget.name}
        amount={amount}
        max={budget.max} 
        onAddExpenseClick={() => openAddExpenseModal(budget.id)}
        onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
        />
      })}

      <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}></UncategorizedBudgetCard>

    </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}> </AddBudgetModal>
    <AddExpenseModal 
      show={showAddExpensesModal} 
      defaultBudgetId={addExpensesModalBudgetId}
      handleClose={() => setShowAddExpenseModal(false)}
    > </AddExpenseModal>
        <ViewExpensesModal 
      budgetId={viewExpensesModalBudgetId} 
      handleClose={() => setViewExpensesModalBudgetId()}
    />
    </div>
    </>
  )
}

export default App;
