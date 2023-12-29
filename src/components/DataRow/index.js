import "./styles.css";

const DataRow = ({ data, styles }) => {
    const rowElements = data.map((el, i) => {
        return <div 
            key={i} 
            className="cell | d-flex justify-content-center align-items-center text-center p-3">{el}</div>
    })

    return (
        <div className="d-flex gap-2 overflow-auto" style={styles}>
           {rowElements}
        </div>
    )
}

export default DataRow;