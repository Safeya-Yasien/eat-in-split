import { useState } from "react";

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

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  const handleShowAddFriend = () => {
    return setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (friend) => {
    setFriends([...friends, friend]);
    setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}
        <div className="d-flex justify-content-end align-items-center add-button">
          <Button onClick={handleShowAddFriend}>
            {!showAddFriend ? "Add Friend" : "Close"}
          </Button>
        </div>
      </div>
      <SplitFormBill />
    </div>
  );
}

export default App;

const FriendsList = ({ friends }) => {
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
      <Button>Select</Button>
    </li>
  );
};

const AddFriendForm = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form
      className="d-flex flex-column gap-4 add-friend-form"
      onSubmit={handleSubmit}
    >
      <div className="d-flex flex-column gap-4">
        <div className="d-flex align-items-center gap-4 justify-content-between">
          <label className="fs-4">👩🏼‍🤝‍🧑🏻 Friend Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center gap-4 justify-content-between">
          <label className="fs-4">💥 Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button>Add</Button>
      </div>
    </form>
  );
};

const SplitFormBill = () => {
  return (
    <div className="d-flex flex-column gap-4 split-bill-form">
      <h3 className="text-uppercase">split a bill with clark</h3>
      <form className="d-flex flex-column gap-4 ">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">💰 Bill value</label>
            <input type="text" />
          </div>
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">🧍‍♀️ Your expense</label>
            <input type="text" />
          </div>
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">👩🏼‍🤝‍🧑🏻 Clark's expense:</label>
            <input type="text" disabled />
          </div>
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">🤑 Who is paying the bill?</label>
            <select>
              <option value="user">You</option>
              <option value="friend">You</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button>Split bill</Button>
        </div>
      </form>
    </div>
  );
};
