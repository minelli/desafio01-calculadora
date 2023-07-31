import Button from "./components/Button";
import Input from "./components/Input";
import { Container, Content, Row } from "./styles";
import { useState } from "react";

const App = () => {
  const [history, setHistory] = useState("");
  const [currentNumber, setCurrentNumber] = useState("0");
  const [firstNumber, setFirstNumber] = useState("0");
  const [operation, setOperation] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const handleAddNumber = (number) => {
    if (hasResult && operation === "") {
      handleOnClear();
      setCurrentNumber(number);
    } else setCurrentNumber((prev) => `${prev === "0" ? "" : prev}${number}`);
  };

  const handleOnClear = () => {
    setCurrentNumber("0");
    setFirstNumber("0");
    setOperation("");
    setHistory("");
    setHasResult(false);
  };

  const handleResult = () => {
    if (operation !== "") setCurrentNumber(String("ERROR"));
    let result = 0;
    switch (operation) {
      case "+":
        result = Number(firstNumber) + Number(currentNumber);
        break;
      case "-":
        result = Number(firstNumber) - Number(currentNumber);
        break;
      case "*":
        result = Number(firstNumber) * Number(currentNumber);
        break;
      case "/":
        result = Number(firstNumber) / Number(currentNumber);
        break;
      default:
        result = "0";
        break;
    }
    setHistory((history) => `${history}${currentNumber}=${result}`);
    setCurrentNumber(String(result));
    setFirstNumber(String(result));
    setOperation("");
    setHasResult(true);
  };

  const handleOperation = (operation) => {
    if (firstNumber === "0") {
      setFirstNumber(currentNumber);
      setHistory((history) => `${history}${currentNumber}`);
    }
    // TO DO : handle if multiple operations without press '=' (1 + 1 + 1 + 1 = 4)
    setCurrentNumber("0");
    setOperation(operation);
    setHistory(
      (history) => `${PurgePreviousOperationOnHistory(history)}${operation}`
    );
  };

  const PurgePreviousOperationOnHistory = (history) =>
    history.includes("=") ? history.split("=")[1] : history;

  return (
    <Container>
      <Content>
        <Input value={history} />
        <Input value={currentNumber} />
        <Row>
          <Button label="0" onClick={() => handleAddNumber("0")} />
          <Button label="/" onClick={() => handleOperation("/")} />
          <Button label="*" onClick={() => handleOperation("*")} />
          <Button label="C" onClick={handleOnClear} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button label="-" onClick={() => handleOperation("-")} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button label="+" onClick={() => handleOperation("+")} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button label="=" onClick={handleResult} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
