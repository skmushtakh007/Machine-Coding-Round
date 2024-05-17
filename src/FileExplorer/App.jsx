import { useState } from "react";
import Folder from "./component/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import './style.css'
import explorer from "./data/folderData"


function App() {
  const [exploreData, setExploreData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(exploreData, folderId, item, isFolder);
    setExploreData(finalTree); // updating original tree
  };
  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} explorer={exploreData} />
    </div>
  )
}

export default App;