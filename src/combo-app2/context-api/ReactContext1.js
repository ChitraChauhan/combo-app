import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../index.css";

const UserContext = React.createContext();

//Turn the Consumer into a Higher-Order Component
function withUser(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserContext.Consumer>
        {user => <Component {...props} user={user} />}
      </UserContext.Consumer>
    );
  };
}

const UserAvatar = withUser(({ user, size }) => (
  <img
    className={`user-avatar ${size || ""}`}
    alt="user avatar"
    src={user.avatar}
  />
));

// const UserAvatar = ({ size }) => (
//   <UserContext.Consumer>
//     {user => (
//       <img
//         className={`user-avatar ${size || ""}`}
//         alt="user avatar"
//         src={user.avatar}
//       />
//     )}
//   </UserContext.Consumer>
// );

const UserStats = () => (
  <UserContext.Consumer>
    {user => (
      <div className="user-stats">
        <div>
          <UserAvatar user={user} />
          {user.name}
        </div>
        <div className="stats">
          <div>{user.followers} Followers</div>
          <div>Following {user.following}</div>
        </div>
      </div>
    )}
  </UserContext.Consumer>
);

const Nav = ({ children }) => <div className="nav">{children}</div>;

const Content = () => <div className="content">main content here</div>;

const Sidebar = ({ children }) => <div className="sidebar">{children}</div>;

const Body = ({ sidebar, content }) => (
  <div className="body">
    <Sidebar>{sidebar}</Sidebar>
    {content}
  </div>
);

//Hold State in the Provider
class UserStore extends Component {
  state = {
    user: {
      avatar:
        "https://www.gravatar.com/avatar/5c3dd2d257ff0e14dbd2583485dbd44b",
      name: "Dave",
      followers: 1234,
      following: 123
    }
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const ReactContextApp = () => (
  <div className="app">
    <Nav>
      <UserAvatar size="small" />
    </Nav>
    <Body sidebar={<UserStats />} content={<Content />} />
  </div>
);

ReactDOM.render(
  <UserStore>
    <ReactContextApp />
  </UserStore>,
  document.getElementById("root")
);

export default ReactContextApp;
