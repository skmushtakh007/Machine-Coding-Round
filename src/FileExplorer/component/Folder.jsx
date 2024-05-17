/* eslint-disable react/prop-types */
import { useState } from "react"
import { FcFolder } from "react-icons/fc";
import { TiFolderAdd } from "react-icons/ti";
import { AiOutlineFileAdd } from "react-icons/ai";
import { PiFilesDuotone } from "react-icons/pi";


export default function Folder({ handleInsertNode, explorer }) {
    const [expand, setExpand] = useState(false);

    // to handle after clicking icon
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    })


    // to stop propagation
    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder
        })
    }

    //to add new folder
    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({ ...showInput, visible: false })
        }
    }
    console.log(explorer)

    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 12 }}>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span><FcFolder />{explorer.name}</span>
                    <div>
                        <button onClick={(e) => handleNewFolder(e, true)}><TiFolderAdd /></button>
                        <button onClick={(e) => handleNewFolder(e, false)}><AiOutlineFileAdd /></button>
                    </div>
                </div>


                <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }} >

                    {/* //expanding condition */}
                    {
                        showInput.visible && (
                            <div className="inputContainer">
                                <span>{showInput.isFolder ? <FcFolder /> : <PiFilesDuotone />}</span>
                                <input type="text"
                                    onKeyDown={onAddFolder}
                                    onBlur={() => setShowInput({ ...showInput, visible: false })}
                                    className="inputContainer__input"
                                    onFocus
                                />
                            </div>
                        )
                    }


                    {/* Nested expanding */}
                    {
                        explorer.items.map((exp) => {
                            return (
                                <Folder
                                    handleInsertNode={handleInsertNode}
                                    key={exp.id}
                                    explorer={exp}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    else {

        return <span className="file">📄 {explorer.name}</span>;
    }
}
