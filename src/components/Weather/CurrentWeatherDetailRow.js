const CurrentWeatherDetailRow = (props) => {
  const label = props.item[0];
  const value = props.item[1];
  return (
    <div className="detail-row">
      <span className="label">{label}:</span>
      <span className="value">{value}</span>
    </div>
  );
};

export default CurrentWeatherDetailRow;
