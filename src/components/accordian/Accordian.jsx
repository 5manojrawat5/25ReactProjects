import { useState } from "react";
import "./accordian.css";
import data from "./data";

export default function Accordian() {
  const [answer, setAnswer] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiSelection, setMultiSelection] = useState([]);
  function handleSingleSelection(getCurrentId) {
    setAnswer(getCurrentId === answer ? null : getCurrentId);
  }
  function handleMultiSelection(getCurrentId) {
    let copyMultiSelection = [...multiSelection];
    const findIndexOfCurrentId = copyMultiSelection.indexOf(getCurrentId);
    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) {
      copyMultiSelection.push(getCurrentId);
    } else {
      copyMultiSelection.splice(findIndexOfCurrentId, 1);
    }
    setMultiSelection(copyMultiSelection);
  }
  console.log(multiSelection);
  return (
    <div className="wrapper">
      <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)}>Enable multipal selection {enableMultiSelection ? <b>ON</b> : <b>OFF</b> } </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            return (
              <div className="item" key={dataItem.id}>
                <div
                  className="question"
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                >
                  <h3>{dataItem.question} </h3>
                  <span>+</span>
                </div>
                {enableMultiSelection
                  ? multiSelection.indexOf(dataItem.id) !== -1 && (
                      <div className="answer">{dataItem.answer}</div>
                    )
                  : answer === dataItem.id && (
                      <div className="answer">{dataItem.answer}</div>
                    )}
                {/* {answer === dataItem.id || multiSelection.indexOf(dataItem.id) !== -1 ? (
                  <div className="answer">{dataItem.answer}</div>
                ) : null} */}
              </div>
            );
          })
        ) : (
          <div>Data not found</div>
        )}
      </div>
    </div>
  );
}
