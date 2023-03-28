const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "046bd91afaa4f5acb1edb553eac4d392bada37a161549967de78d80387f986d2baaa5fc5adfd13dc3f3450ed762c9f69f1c041866b109f80b82b454130c4578bf3": 100,
  "042cbc5702510f2ec000dbc55d8e1383745b61139de77a6694d66dc7bdf5a602e5762f802cb2f77431c2dc86ef7bb6f189ce4d7f3ff957e73a5653aee60db5e940": 50,
  "044b9e179febc4efa55f326eae132a697aad8e7d3dc063c0bb6504fe8908a75845d4dc6ff9d42f724f13f3000be85104a02b2238d83aee7c267697a62b39d3f67b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  // get a signature from the client side application
  // recover the public address from the signature
  

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
