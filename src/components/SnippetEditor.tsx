import Editor from "@monaco-editor/react";
import { TfiPencil } from "react-icons/tfi";
import { useSnippetStore } from "../store/snippetsStore";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";

function SnippetEditor() {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);

  const [text, setText] = useState<string | undefined>("");

  useEffect(() => {
    if (!selectedSnippet) return;

    const guardarTexto = setTimeout(async () => {
      // Realizar el guardado aquí
      console.log(`Guardando texto: ${text}`);
      const desktopPath = await desktopDir();
      await writeTextFile(
        `${desktopPath}/taurifiles/${selectedSnippet.name}.json`,
        text ?? ""
      );
    }, 1000); // Esperar 1 segundo después de la última escritura
    return () => {
      clearTimeout(guardarTexto);
    };
  }, [text]);

  return (
    <>
      {selectedSnippet ? (
        <Editor
          height="100vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// save your snippet"
          className="text-2xl"
          options={{
            fontSize: 20,
          }}
          onChange={(value) => setText(value)}
          value={selectedSnippet.code ?? ""}
        />
      ) : (
        <TfiPencil className="text-9xl text-neutral-500" />
      )}
    </>
  );
}

export default SnippetEditor;
