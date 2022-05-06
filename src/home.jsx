import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {
  const Navbar = (props) => {
    const { links } = props;
    return (
      <div className="navbar-row">
        <div className="logo">Logo</div>
        <div className="links">
          {links.map((item, i) => (
            <Link key={item.label} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="filter">Filtro</div>
      </div>
    );
  };

  const CardRow = (props) => {
    const { item } = props;
    return (
      <div className="card-row">
        <div className="card-image">
          <img src={item.photo} alt="card" />
        </div>
        <div className="card-texts">
          <h5>{item.title}</h5>
          <p>{item.text}</p>
        </div>
      </div>
    );
  };

  const items = [
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
    { photo: "photo", text: "lorem ipsum", title: "lorem ipsum" },
  ];

  return (
    <div>
      <Navbar
        links={[
          { label: "Link1", to: "/link1" },
          { label: "Link2", to: "/link2" },
          { label: "Link3", to: "/link3" },
          { label: "Link4", to: "/link4" },
        ]}
      />
      <div className="card-container">
        {items.map((item, i) => (
          <CardRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
