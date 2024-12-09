import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./components/ui/provider";
import { PostsView } from "./features/PostsView";
import { AuthenticationProvider } from "./features/authentication/AuthenticationProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <PostsView />
          <ToastContainer position="bottom-right" closeOnClick draggable={false} pauseOnHover={false} />
        </Provider>
      </QueryClientProvider>
    </AuthenticationProvider>
  );
}

export default App;
