from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import joblib  # For loading the trained model

# Create Flask app
app = Flask(__name__)

# Load pre-trained model
model = joblib.load('./Models/model.pkl')  # Save your trained model as model.pkl

@app.route('/')
def home():
    return render_template('predictor.html')  # Serve your HTML file

@app.route('/predictor')
def predictor():
    return render_template('predictor.html')


# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get data from the form
#         data = request.get_json()
#         date = data.get('date')
#         category = data.get('category')
#         food_item = data.get('foodItem')

#         # Preprocess the input data
#         # Add your preprocessing logic here
#         input_data = pd.DataFrame({
#             'Date': [date],
#             'Category': [category],
#             'Item_Name': [food_item]
#         })

#         # Ensure the columns match the training data
#         # This is just an example. Modify according to your model's input
#         input_data['Day'] = pd.to_datetime(input_data['Date']).dt.day_name()

#         # Drop the 'Date' column as it might not be used for prediction
#         input_data.drop(columns=['Date'], inplace=True)

#         # Predict
#         prediction = model.predict(input_data)[0]  # Assuming the model outputs a single value

#         return jsonify({'prediction': prediction})
#     except Exception as e:
#         return jsonify({'error': str(e)})

@app.route('/predict', methods=['POST'])
def predict():
  try:
      # data = request.json
      data = request.get_json()
      # Check for missing inputs
    #   if not data:
    #       return jsonify({'error': 'No data received'}), 400
    #   else:
        #   print("Received input:", data)
      date = pd.to_datetime(data['date'])
      month = date.month
      day_of_week = date.day_name()
      item_name = data['item']
    # category = data.get('category')
        # food_item = data.get('foodItem')

      input_data = pd.DataFrame({
        'Item Name': [item_name],
        'Month': [month],
        'DayOfWeek': [day_of_week]
      })

      prediction = model.predict(input_data)[0]
      return jsonify({'predicted_quantity': prediction})
  except Exception as e:
        print(f"Error: {e}")  # Log error for debugging
        return jsonify({'error': str(e)}), 500
    
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

if __name__ == '__main__':
    app.run(debug=True)
