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
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    return setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (friend) => {
    setFriends([...friends, friend]);
    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const onSplitBill = (value) => {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}
        <div className="d-flex justify-content-end align-items-center add-button">
          <Button onClick={handleShowAddFriend}>
            {!showAddFriend ? "Add Friend" : "Close"}
          </Button>
        </div>
      </div>
      {selectedFriend && (
        <SplitFormBill
          selectedFriend={selectedFriend}
          onSplitBill={onSplitBill}
        />
      )}
    </div>
  );
}

export default App;

const FriendsList = ({ friends, onSelection, selectedFriend }) => {
  return (
    <ul className="d-flex flex-column gap-4">
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li
      className={`${
        isSelected ? "selected" : ""
      } d-flex gap-4 friend-item align-items-center justify-content-between`}
    >
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
      <Button onClick={() => onSelection(friend)}>
        {!isSelected ? "Select" : "Close"}
      </Button>
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

const SplitFormBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByUser : -paidByFriend);
  };

  return (
    <div className="d-flex flex-column gap-4 split-bill-form">
      <h3 className="text-uppercase">
        split a bill with {selectedFriend.name}
      </h3>
      <form className="d-flex flex-column gap-4 " onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">💰 Bill value</label>
            <input
              type="text"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
            />
          </div>
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">🧍‍♀️ Your expense</label>
            <input
              type="text"
              value={paidByUser}
              onChange={(e) =>
                setPaidByUser(
                  Number(e.target.value) > bill
                    ? paidByUser
                    : Number(e.target.value)
                )
              }
            />
          </div>
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">👩🏼‍🤝‍🧑🏻 Clark's expense:</label>
            <input type="text" disabled value={paidByFriend} />
          </div>
          <div className="d-flex align-items-center gap-4 justify-content-between">
            <label className="fs-4">🤑 Who is paying the bill?</label>
            <select
              value={whoIsPaying}
              onChange={(e) => setWhoIsPaying(e.target.value)}
            >
              <option value="user">You</option>
              <option value="friend">{selectedFriend.name}</option>
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
