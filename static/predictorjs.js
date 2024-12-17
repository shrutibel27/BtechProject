// Populate the food items dropdown based on the selected category
document.getElementById('category').addEventListener('change', function () 
{
  const category = this.value;
  const foodItemSelect = document.getElementById('foodItem');

  // Clear existing options
  foodItemSelect.innerHTML = '<option value="" disabled selected>Choose Food Item</option>';

  // Add new options based on the category
  if (category === 'fastfood') {
    // const options = ["Sabudana Khichdi", "Sabudana Vada", "Sabudana Wada", "Sada Dosa", 
    // "Sambar Vada", "Samosa", "Samosa Chaat", "Sevpuri", "Shrikhand", 
    // "Suji Halwa", "Sweets Mithai", "Tandoori Chicken", "Upma", "Uttapam", 
    // "Vada", "Vada Pav", "Veg Pulao", "Veg Thali", "Pakoda", 
    // "Paneer Butter Masala", "Paneer Tikka", "Pani Puri", "Paratha", 
    // "Pav Bhaji", "Pesarattu", "Poha", "Puddings", "Puran Poli", 
    // "Puranpoli", "Ragda Pattice", "Rajma", "Rajma Chawal", "Rasam", 
    // "Rasgulla", "Rasmalai", "Roti", "Idli Vada", "Jain Thali", "Jalebi", 
    // "Kachori", "Kathi Roll", "Kheer", "Kulfi", "Masala Dosa", 
    // "Masala Uttapam", "Meat Thali", "Medu Vada", "Misal Pav", "Momos", 
    // "Mung Dal Ka Halwa", "Mutton Rogan Josh", "Naan", "Onion Pakoda", 
    // "Onion Uttapam", "Aloo Paratha", "Aloo Puri", "Aloo Tikki", "Bhel Puri", "Biryani",
    // "Bread Pakora", "Brownies", "Butter Chicken", "Butter Naan", "Cakes",
    // "Chapati", "Chicken Biryani", "Chicken Sandwich", "Chicken Shawarma",
    // "Chicken Thali", "Chicken Tikka Masala", "Chilli Paneer",'Aalopuri', 'Frankie', 'Panipuri', 'Vadapav'];
    const options=['Aalopuri', 'Frankie', 'khichdi','Panipuri', 'Sandwich', 'Vadapav'];
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.toLowerCase();
      opt.textContent = option;
      foodItemSelect.appendChild(opt);
    });
  } else if (category === 'beverage') {
    // const options = ["Bitter Gourd Juice", "Butter Milk", "Chai", "Coffee", "Cold Coffee",
    // "Cold Drink (Coke)", "Cold Drink (Fanta)", "Cold Drink (Peach)", 
    // "Cold Drink (Pepsi)", "Cold Drink (Sprite)", "Cold Drink (Thumbs Up)",
    // "Falooda", "Filter Coffee", "Ginger Tea", "Green Tea", "Hot Chocolate", 
    // "Ice Cream", "Ice Cream (Butterscotch)", "Ice Cream (Chocolate)", 
    // "Ice Cream (Strawberry)", "Ice Cream (Vanilla)", "Iced Tea", "Kheer", 
    // "Lassi", "Lemon Tea", "Mango Lassi", "Masala Chai", "Masala Tea", 
    // "Nimbu Pani", "Samosa", "Shirkurma", "Sweet Lassi", "Sweets", 
    // "Tea", "Thandai",'Sugarcane juice'];
    const options = ['Cold coffee', 'Sugarcane', 'juice','Tea'];
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.toLowerCase();
      opt.textContent = option;
      foodItemSelect.appendChild(opt);
    });
  }
});

document.getElementById('submitBtn').addEventListener('click', async () => {
  const date = document.getElementById('date').value;
  // const item = document.getElementById('foodItem').value;
  const category = document.getElementById('category').value;
  const foodItem = document.getElementById('foodItem').value;
 

  if (!date || !category || !foodItem) {
    alert('Please fill out all fields.');
    return;
  }

try{
  const response = await fetch('/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Cache-Control': 'no-cache' },
    body: JSON.stringify({ date, item:foodItem,category })
  });
  if (!response.ok) {
    throw new Error('Server error. Please try again.');
  }

  const data = await response.json();
  
  document.getElementById('result').textContent = `Predicted Quantity: ${data.predicted_quantity}`;
}catch (error) {
  console.error('Error:', error);
  alert('An error occurred. Please try again.');
}
});


//button more analysis
document.getElementById('submitBtn').addEventListener('click', async () => {
  const date = document.getElementById('date').value;
  const item = document.getElementById('foodItem').value;

  const response = await fetch('/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, item })
  });

  const data = await response.json();

  // Display the predicted quantity
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `Predicted Quantity: ${data.predicted_quantity}`;

});


