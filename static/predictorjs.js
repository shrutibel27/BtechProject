// Populate the food items dropdown based on the selected category
document.getElementById('category').addEventListener('change', function () {
  const category = this.value;
  const foodItemSelect = document.getElementById('foodItem');

  // Clear existing options
  foodItemSelect.innerHTML = '<option value="" disabled selected>Choose Food Item</option>';

  // Add new options based on the category
  if (category === 'fastfood') {
    const options = ["Sabudana Khichdi", "Sabudana Vada", "Sabudana Wada", "Sada Dosa", 
    "Sambar Vada", "Samosa", "Samosa Chaat", "Sevpuri", "Shrikhand", 
    "Suji Halwa", "Sweets Mithai", "Tandoori Chicken", "Upma", "Uttapam", 
    "Vada", "Vada Pav", "Veg Pulao", "Veg Thali", "Pakoda", 
    "Paneer Butter Masala", "Paneer Tikka", "Pani Puri", "Paratha", 
    "Pav Bhaji", "Pesarattu", "Poha", "Puddings", "Puran Poli", 
    "Puranpoli", "Ragda Pattice", "Rajma", "Rajma Chawal", "Rasam", 
    "Rasgulla", "Rasmalai", "Roti", "Idli Vada", "Jain Thali", "Jalebi", 
    "Kachori", "Kathi Roll", "Kheer", "Kulfi", "Masala Dosa", 
    "Masala Uttapam", "Meat Thali", "Medu Vada", "Misal Pav", "Momos", 
    "Mung Dal Ka Halwa", "Mutton Rogan Josh", "Naan", "Onion Pakoda", 
    "Onion Uttapam", "Aloo Paratha", "Aloo Puri", "Aloo Tikki", "Bhel Puri", "Biryani",
    "Bread Pakora", "Brownies", "Butter Chicken", "Butter Naan", "Cakes",
    "Chapati", "Chicken Biryani", "Chicken Sandwich", "Chicken Shawarma",
    "Chicken Thali", "Chicken Tikka Masala", "Chilli Paneer",'Aalopuri', 'Frankie', 'Panipuri', 'Vadapav'];
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.toLowerCase();
      opt.textContent = option;
      foodItemSelect.appendChild(opt);
    });
  } else if (category === 'beverage') {
    const options = ["Bitter Gourd Juice", "Butter Milk", "Chai", "Coffee", "Cold Coffee",
    "Cold Drink (Coke)", "Cold Drink (Fanta)", "Cold Drink (Peach)", 
    "Cold Drink (Pepsi)", "Cold Drink (Sprite)", "Cold Drink (Thumbs Up)",
    "Falooda", "Filter Coffee", "Ginger Tea", "Green Tea", "Hot Chocolate", 
    "Ice Cream", "Ice Cream (Butterscotch)", "Ice Cream (Chocolate)", 
    "Ice Cream (Strawberry)", "Ice Cream (Vanilla)", "Iced Tea", "Kheer", 
    "Lassi", "Lemon Tea", "Mango Lassi", "Masala Chai", "Masala Tea", 
    "Nimbu Pani", "Samosa", "Shirkurma", "Sweet Lassi", "Sweets", 
    "Tea", "Thandai",'Sugarcane juice'];
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.toLowerCase();
      opt.textContent = option;
      foodItemSelect.appendChild(opt);
    });
  }
});

// Submit button functionality
// document.getElementById('submitBtn').addEventListener('click', function () {
//   const records = document.getElementById('uploadRecords').files[0];
//   const csvFile = document.getElementById('uploadCsv').files[0];
//   const date = document.getElementById('date').value;
//   const category = document.getElementById('category').value;
//   const foodItem = document.getElementById('foodItem').value;

//   if (!date || !category || !foodItem) {
//     alert('Please fill out all fields.');
//     return;
//   }

//   console.log('Records:', records);
//   console.log('CSV File:', csvFile);
//   console.log('Date:', date);
//   console.log('Category:', category);
//   console.log('Food Item:', foodItem);
//   alert('Form submitted successfully!');
// });

// document.getElementById('submitBtn').addEventListener('click', function () {
//   const date = document.getElementById('date').value;
//   const category = document.getElementById('category').value;
//   const foodItem = document.getElementById('foodItem').value;

//   if (!date || !category || !foodItem) {
//     alert('Please fill out all fields.');
//     return;
//   }

//   // Prepare data to send to the backend
//   const data = { date, category, foodItem };

//   // Send data to Flask backend
//   fetch('/predict', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data)
//   })
//     .then(response => response.json())
//     .then(result => {
//       if (result.error) {
//         alert(`Error: ${result.error}`);
//       } else {
//         const prediction = result.prediction;
//         alert(`Predicted Quantity: ${prediction}`);
//         // You can display the prediction on the page instead of an alert
//         document.getElementById('result').innerText = `Predicted Quantity: ${prediction}`;
//       }
//     })    .catch(error => console.error('Error:', error));
// });


document.getElementById('submitBtn').addEventListener('click', async () => {
  const date = document.getElementById('date').value;
  const item = document.getElementById('foodItem').value;
  const category = document.getElementById('category').value;
  const foodItem = document.getElementById('foodItem').value;


  if (!data || !date || !category || !foodItem) {
    alert('Please fill out all fields.');
    return;
  }


  const response = await fetch('/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, item })
  });

  const data = await response.json();
  document.getElementById('result').textContent = `Predicted Quantity: ${data.predicted_quantity}`;
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

  // Create and append the "More Analysis" button
  // let moreAnalysisButton = document.getElementById('moreAnalysisBtn');
  // if (!moreAnalysisButton) {
  //   moreAnalysisButton = document.createElement('button');
  //   moreAnalysisButton.id = 'moreAnalysisBtn';
  //   moreAnalysisButton.textContent = 'More Analysis';
  //   moreAnalysisButton.style.marginTop = '10px';
  //   moreAnalysisButton.style.display = 'block';
  //   resultDiv.appendChild(moreAnalysisButton);

  //   // Add click event for the "More Analysis" button
  //   moreAnalysisButton.addEventListener('click', () => {
  //     window.location.href = '/analysis'; // Redirect to the analysis page
  //   });
  // }
});


