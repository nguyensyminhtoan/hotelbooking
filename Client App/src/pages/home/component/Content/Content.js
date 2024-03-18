import "./Content.css";
import City from "./City";
import Type from "./Type";
import Hotel from "./Hotel";
import FormSignup from "./FormSignup";
const Content = ({ data }) =>
{

  return (
    <div>
      <City data={data}></City>
      <Type data={data}></Type>
      <Hotel data={data}></Hotel>
      <FormSignup></FormSignup>
    </div>
  );
};
export default Content;
