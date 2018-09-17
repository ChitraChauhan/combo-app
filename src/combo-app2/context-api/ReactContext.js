import React, { Component } from "react";
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

const UserAvatar = withUser(({ size, user }) => (
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

export default class ReactContextApp extends Component {
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
      <div className="app">
        <UserContext.Provider value={this.state.user}>
          <Nav>
            <UserAvatar size="small" />
          </Nav>
          <Body sidebar={<UserStats />} content={<Content />} />
        </UserContext.Provider>
      </div>
    );
  }
}
