

function QueueList({ queueList }) {

    return (
        <div className="list-container">
            <label className="queue-title">Queue Session History</label>
            <table id="queue-table">

                {queueList.map((element) => {
                    return <tr>
                        <td><img src={element.image} width="40" height="40" /></td>
                        <td>{element.track}</td>
                        <td>{element.artist}</td>
                        <td>{element.name}</td>
                    </tr>
                })}

            </table>
        </div>
    );
}
export default QueueList;