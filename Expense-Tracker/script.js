let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const transactionForm = document.getElementById("transactionForm");
const transactionName = document.getElementById("transactionName");
const transactionAmount = document.getElementById("transactionAmount");
const transactionType = document.getElementById("transactionType");
const transactionList = document.getElementById("transactionList");
const balanceDisplay = document.getElementById("balance");

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = transactionName.value.trim();
  const amount = parseFloat(transactionAmount.value);
  const type = transactionType.value;

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid name and amount.");
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
    type,
  };

  transactions.push(transaction);
  saveAndRender();
  transactionForm.reset();
});

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function renderTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach((txn) => {
    const li = document.createElement("li");
    li.classList.add("transaction-item", txn.type);
    li.innerHTML = `
      <span>${txn.name}</span>
      <span>$${Math.abs(txn.amount).toFixed(2)} 
        <button class="delete-btn" onclick="deleteTransaction(${txn.id})">×</button>
      </span>
    `;
    transactionList.appendChild(li);
  });
}

function updateBalance() {
  const total = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  balanceDisplay.innerText = total.toFixed(2);
}

function deleteTransaction(id) {
  transactions = transactions.filter((txn) => txn.id !== id);
  saveAndRender();
}

function saveAndRender() {
  saveTransactions();
  renderTransactions();
  updateBalance();
}


saveAndRender();
