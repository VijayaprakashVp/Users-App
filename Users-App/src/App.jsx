import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Users } from "./Components/Users";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Users />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
