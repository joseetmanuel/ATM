const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  return (
    <label className="label huge">
      <br />
      <h3> {choice[Number(!isDeposit)]}</h3>
      <br />
      <input
        class="form-control"
        id="number-input"
        type="number"
        width="400"
        onChange={onChange}
      ></input>
      <br />
      <button
        class="btn btn-primary"
        type="submit"
        value="Submit"
        id="submit-input"
        disabled={isValid}
      >
        Enviar
      </button>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Saldo en la cuenta $ ${totalState} `;
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    let newTotal =
      isDeposit == "Deposit"
        ? totalState + Number(event.target.value)
        : totalState - Number(event.target.value);
    setValidTransaction(newTotal < 0);
  };
  const handleSubmit = (event) => {
    let newTotal =
      isDeposit == "Deposit" ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    let tipo = event.target.value;
    if (tipo != "") setIsDeposit(event.target.value);
  };
  return (
    <div class="card">
      <div class="card-body">
        <form onSubmit={handleSubmit} class="form-group">
          <h2 id="total">{status}</h2>
          <label for="mode-select">Seleccione una accion para continuar</label>
          <select
            class="form-control"
            onChange={(e) => handleModeSelect(e)}
            name="mode"
            id="mode-select"
          >
            <option id="no-selection" value=""></option>
            <option id="deposit-selection" value="Deposit">
              Deposit
            </option>
            <option id="cashback-selection" value="Cash Back">
              Cash Back
            </option>
          </select>
          {isDeposit != "" && (
            <ATMDeposit
              onChange={handleChange}
              isDeposit={isDeposit}
              isValid={validTransaction}
            ></ATMDeposit>
          )}
        </form>
      </div>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
