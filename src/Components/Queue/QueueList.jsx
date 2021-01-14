

function QueueList({ queueList }) {

    return (
        <div className="list-container">
            <label className="queue-title">Queue Session History</label>
            <table id="queue-table">

                {queueList.map((element) => {
                    return <tr>
                        <td className="image-column"><img src={element.image} width="40" height="40" /></td>
                        <td className="track-column">{element.track}</td>
                        <td className="artist-column">{element.artist}</td>
                        <td className="name-column">{element.name}</td>
                    </tr>
                })}

            </table>
        </div>
    );
}
export default QueueList;