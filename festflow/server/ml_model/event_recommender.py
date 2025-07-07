import sys
import json
import joblib
import pandas as pd

 
model_data = joblib.load("E:/Placements/PROJECTS/festflow/data/festflow_model.pkl")
model = model_data['model']
preprocessor = model_data['preprocessor']


user_input = json.loads(sys.argv[1])

df = pd.DataFrame([user_input])


X = preprocessor.transform(df)
prediction = model.predict(X)

print(int(prediction[0]))
