function useTraverseTree() {
  // adding logic for first node
  const insertNode = function (tree, folderId, item, isFolder) {
    //checking edge cases
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: []
      });
      return tree;
    }


    // adding logic for nested folder
    let latestNode = [];  //result will store inside variable
    //loop through complete remaining tree DFS algorithm
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder); // recursively calling nested inside nested...
    });

    return { ...tree, items: latestNode };
  };


  return { insertNode };
}

export default useTraverseTree;