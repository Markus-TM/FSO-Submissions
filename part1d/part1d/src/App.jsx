import { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAllClicks] = useState(0);

  const allClicks = () => setAllClicks(all + 1);

  const handleGood = () => {
    setGood(good + 1);
    allClicks();
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    allClicks();
  };

  const handleBad = () => {
    setBad(bad + 1);
    allClicks();
  };

  const calcAverage = (good - bad) / all;
  const calcPositive = (good / all) * 100;

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />

      <Header text="statistics" />
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={calcAverage} />
            <StatisticLine text="positive" value={calcPositive + " %"} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
