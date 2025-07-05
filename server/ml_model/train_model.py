import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import joblib
import os


current_dir = os.path.dirname(__file__)
csv_path = os.path.join(current_dir, "data", "festflow_simulated_data.csv")


print("Reading CSV from:", csv_path)


df = pd.read_csv(csv_path)
print("Dataset shape:", df.shape)
print(df.head())


le = LabelEncoder()
df['event_label'] = le.fit_transform(df['event_name'])

joblib.dump(le, os.path.join(current_dir, "label_encoder.pkl"))
print(" Label encoder saved")


df_encoded = pd.get_dummies(df[['department', 'interests', 'difficulty']])
X = df_encoded
y = df['event_label']

model = LogisticRegression(max_iter=200)
model.fit(X, y)


joblib.dump(model, os.path.join(current_dir, "event_model.pkl"))
joblib.dump(X.columns.tolist(), os.path.join(current_dir, "model_columns.pkl"))
print(" Model and columns saved")
print(" Model trained and saved successfully.")
