import { Toaster, toast } from "react-hot-toast";

import "./App.css";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import SnippetEditor from "./components/SnippetEditor";

function App() {
  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-3 bg-zinc-950 h-screen">
        <SnippetForm />
        <SnippetList />
      </div>

      <div className="bg-neutral-950 col-span-9 flex justify-center items-center">
        <SnippetEditor />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
