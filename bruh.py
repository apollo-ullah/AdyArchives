import os
import kagglehub
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Download latest version of the car dataset
path = kagglehub.dataset_download("CooperUnion/cardataset")
print(f"Path to dataset files: {path}")

# Check what files are available in the downloaded dataset
print("\nFiles in the dataset directory:")
dataset_files = os.listdir(path)
print(dataset_files)

# Use the first CSV file found (or you can pick the right one from the list)
csv_files = [f for f in dataset_files if f.endswith('.csv')]
if not csv_files:
    raise FileNotFoundError("No CSV files found in the dataset")

data_file = os.path.join(path, csv_files[0])
print(f"\nUsing data file: {data_file}")

# Load the data
df = pd.read_csv(data_file)

# Display basic information about the dataset
print("Dataset shape:", df.shape)
print("\nFirst few rows:")
print(df.head())
print("\nColumn names:")
print(df.columns.tolist())

# Check if the expected columns exist and adapt if needed
needed_columns = ['price', 'year', 'odometer']
missing_columns = [col for col in needed_columns if col not in df.columns]
if missing_columns:
    print(f"\nWarning: Missing expected columns: {missing_columns}")
    print("Adapting to use available numerical columns...")
    numerical_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    
    # Use the first numerical column as target and the rest as features
    if len(numerical_cols) < 2:
        raise ValueError("Not enough numerical columns for regression")
        
    y_col = numerical_cols[0]
    X_cols = numerical_cols[1:3]  # Using just 2 features for simplicity
    
    print(f"Using {y_col} as target variable")
    print(f"Using {X_cols} as features")
else:
    # Proceed with original plan
    y_col = 'price'
    X_cols = ['year', 'odometer']

# Clean the data
df = df.dropna(subset=[y_col] + X_cols)

# Convert price from string to float if needed
if df[y_col].dtype == object:
    df[y_col] = df[y_col].replace(r'[$,]', '', regex=True).astype(float)

# Prepare X (features) and y (target)
X = df[X_cols]
y = df[y_col]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\nModel Results:")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R² Score: {r2:.2f}")
print(f"Coefficients: {model.coef_}")
print(f"Intercept: {model.intercept_:.2f}")

# Interpretation
print("\nInterpretation:")
for i, col in enumerate(X_cols):
    print(f"For each unit increase in {col}, {y_col} changes by {model.coef_[i]:.2f}")

# Optional: Create a simple scatter plot to visualize predictions
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.3)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
plt.xlabel(f'Actual {y_col}')
plt.ylabel(f'Predicted {y_col}')
plt.title(f'Actual vs Predicted {y_col}')
plt.savefig('prediction_plot.png')
print("Plot saved as 'prediction_plot.png'")