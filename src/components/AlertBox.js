// props contains the alert type & message
const AlertBox = props => {
  return (
    <div className="alert-box">
      <div>
        <p>{props.alertType}</p>
        <hr />
        <p>{props.alertMsg}</p>
      </div>
    </div>
  )
}

export default AlertBox