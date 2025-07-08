from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

current_dir = os.path.dirname(__file__)
model = joblib.load(os.path.join(current_dir, 'event_model.pkl'))
encoder = joblib.load(os.path.join(current_dir, 'label_encoder.pkl'))
model_columns = joblib.load(os.path.join(current_dir, 'model_columns.pkl'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        print("Received:", input_data)

        df = pd.DataFrame([input_data])
        df_encoded = pd.get_dummies(df)

        print("💡 Input DataFrame:\n", df)
        print("📦 Encoded DataFrame:\n", df_encoded)
        print("📄 Model Columns:\n", model_columns)


        for col in model_columns:
            if col not in df_encoded.columns:
                df_encoded[col] = 0
        df_encoded = df_encoded[model_columns]

    
        pred_label = model.predict(df_encoded)[0]
        pred_event_name = encoder.inverse_transform([pred_label])[0]

        return jsonify({"recommended_event": pred_event_name})
    
    except Exception as e:
     import traceback
     print(" Flask error:", traceback.format_exc())
     return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001, debug=True)

