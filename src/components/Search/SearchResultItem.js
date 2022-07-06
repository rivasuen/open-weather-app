const SearchResultItem = (props) => {
  const title = props.item[0];
  const value = props.item[1];
  return (
    <tr>
      <th>{title}: </th>
      <td>{value}</td>
    </tr>
  );
};

export default SearchResultItem;
