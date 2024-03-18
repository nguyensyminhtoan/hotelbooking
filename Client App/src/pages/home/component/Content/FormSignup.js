import "./FormSignup.css";
const FormSignup = () => {
  return (
    <div className="signup">
      <h2>Save time, save money!</h2>
      <p>Sign up and we'll send the best deals to you</p>
      <form>
        <input placeholder="Your Email" type="email"></input>
        <button className="button button-subscribe">Subscribe</button>
      </form>
    </div>
  );
};
export default FormSignup;
