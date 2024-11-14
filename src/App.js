const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

export default App;

const FriendsList = () => {
  const friends = initialFriends;

  return (
    <ul className="d-flex flex-column gap-4">
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
};

const Friend = ({ friend }) => {
  return (
    <li className="d-flex gap-4 friend-item align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <img src={friend.image} alt={friend.name} className="rounded-circle" />
        <div>
          <h3 className="fs-4 mb-0">{friend.name}</h3>
          {friend.balance < 0 && (
            <p className="red">
              You owe {friend.name} {Math.abs(friend.balance)} $
            </p>
          )}
          {friend.balance > 0 && (
            <p className="green">
              Your friend {friend.name} owes you {friend.balance} $
            </p>
          )}
          {friend.balance === 0 && (
            <p className="">You and {friend.name} are even</p>
          )}
        </div>
      </div>
      <button className="button">Submit</button>
    </li>
  );
};
