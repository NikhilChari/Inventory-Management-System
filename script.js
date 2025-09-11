const apiUrl = 'http://localhost:5500/api/items';
const tableBody = document.querySelector('#inventoryTable tbody');
const addForm = document.getElementById('addForm');
const messageDiv = document.getElementById('message');

async function loadItems() {
  try {
    const response = await fetch(apiUrl);
    const items = await response.json();
    tableBody.innerHTML = '';
    items.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.description}</td>
        <td>
          <button class="edit-btn" onclick="editItem('${item.id}')">Edit</button>
          <button class="delete-btn" onclick="deleteItem('${item.id}')">Delete</button>
        </td>`;
      tableBody.appendChild(row);
    });
  } catch (err) {
    showMessage('Error loading items: ' + err.message, 'error');
  }
}


addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newItem = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    quantity: parseInt(document.getElementById('quantity').value),
    price: parseFloat(document.getElementById('price').value),
    description: document.getElementById('description').value
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });

    if (!response.ok) throw new Error('Failed to add item');
    showMessage('Item added successfully!', 'success');
    addForm.reset();
    loadItems();
  } catch (err) {
    showMessage(err.message, 'error');
  }
});
