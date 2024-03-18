import "./Footer.css";
import dataFooter from "../../../../data/footer.json";
const Footer = () => {
  return (
    <footer>
      {dataFooter.map((column, index) => {
        return (
          <div key={index} className="column">
            {column.col_values.map((item, i) => (
              <a key={i} href="/">
                {item}
              </a>
            ))}
          </div>
        );
      })}
    </footer>
  );
};
export default Footer;
