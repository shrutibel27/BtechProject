from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
import pickle

# Load pre-trained model (save your trained model as a pickle file)
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

app = Flask(__name__)

# Route to handle prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    date = data['date']
    item_name = data['item_name']

    # Extract features from the date
    input_date = pd.to_datetime(date)
    month = input_date.month
    day_of_week = input_date.day_name()

    # Prepare input data
    input_data = pd.DataFrame({
        'Item Name': [item_name],
        'Month': [month],
        'DayOfWeek': [day_of_week]
    })

    # Make prediction
    prediction = model.predict(input_data)[0]
    return jsonify({'predicted_quantity': prediction})

if __name__ == '__main__':
    app.run(debug=True)
