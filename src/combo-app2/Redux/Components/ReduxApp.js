import React from "react";
import { connect } from "react-redux";
import "../../index.css";

// This mapStateToProps function extracts a single
// key from state (user) and passes it as the `user` prop
const mapStateToProps = state => ({
  user: state.user
});

// connect() UserAvatar so it receives the `user` directly,
// without having to receive it from a component above

// could also split this up into 2 variables:
//   const UserAvatarAtom = ({ user, size }) => ( ... )
//   const UserAvatar = connect(mapStateToProps)(UserAvatarAtom);
const UserAvatar = connect(mapStateToProps)(({ user, size }) => (
  <img
    className={`user-avatar ${size || ""}`}
    alt="user avatar"
    src={user.avatar}
  />
));

// connect() UserStats so it receives the `user` directly,
// without having to receive it from a component above
// (both use the same mapStateToProps function)
const UserStats = connect(mapStateToProps)(({ user }) => (
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
));

// Nav doesn't need to know about `user` anymore
const Nav = () => (
  <div className="nav">
    <UserAvatar size="small" />
  </div>
);

const Content = () => <div className="content">main content here</div>;

// Sidebar doesn't need to know about `user` anymore
const Sidebar = () => (
  <div className="sidebar">
    <UserStats />
  </div>
);

// Body doesn't need to know about `user` anymore
const Body = () => (
  <div className="body">
    <Sidebar />
    <Content />
  </div>
);

// App doesn't hold state anymore, so it can be
// a stateless function
const ReduxApp = () => (
  <div className="app">
    <Nav />
    <Body />
  </div>
);

export default ReduxApp;
