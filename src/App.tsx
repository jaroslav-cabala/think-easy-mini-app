import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./components/ui/provider";
import { AllPosts } from "./features/allPosts/AllPosts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AllPosts />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
