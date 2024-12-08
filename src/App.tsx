import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./components/ui/provider";
import { PostsView } from "./features/postsView/AllPosts";
import { AuthenticationProvider } from "./features/authentication/AuthenticationProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <PostsView />
        </Provider>
      </QueryClientProvider>
    </AuthenticationProvider>
  );
}

export default App;
