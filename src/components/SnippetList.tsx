import { useEffect } from "react";
import { desktopDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore";
import SnippetItem from "./SnippetItem";

function SnippetList() {
  const setSnippetNames = useSnippetStore((state) => state.setSnippetsNames);
  const snippetNames = useSnippetStore((state) => state.snippetsNames);

  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      const result = await readDir(`${desktopPath}/taurifiles`);
      const filenames = result.map((file) => file.name!.split(".")[0]);
      setSnippetNames(filenames);
    }
    loadFiles();
  }, []);

  return (
    <ul>
      {snippetNames.map((file, i) => (
        <SnippetItem key={i} file={file} />
      ))}
    </ul>
  );
}

export default SnippetList;
