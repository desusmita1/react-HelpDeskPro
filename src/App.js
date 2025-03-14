import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import TicketForm from "./components/TicketForm";
import ticketReducer from "./reducers/ticketReducer";
import { useReducer } from "react";
import TicketList from "./components/TicketList";
import { sortTickets } from "./utilities/sortingUtilities";

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreferance: "High to Low",
  };
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const sortedTickets = sortTickets(state.tickets, state.sortPreferance);

  return (
    <div className='App'>
      <div className='container'>
        <h1>Help Desk Pro</h1>
        <TicketForm
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        ></TicketForm>
        {state.tickets.length > 0 && (
          <div className='results'>
            <h2>All Tickets</h2>

            <select
              value={state.sortPreferance}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value='High to Low'>High to Low</option>
              <option value='Low to High'>Low to High</option>
            </select>

            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
        ;
      </div>
    </div>
  );
}

export default App;
