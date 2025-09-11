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
