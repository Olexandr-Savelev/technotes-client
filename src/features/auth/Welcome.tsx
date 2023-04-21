import { FC } from "react";
import { Link } from "react-router-dom";

const Welcome: FC = () => {
  const date = new Date();
  const today = Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/users">View users info</Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
