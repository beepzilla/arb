# run_aider.py
from dotenv import load_dotenv
import os
import subprocess

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment variables
api_key = os.getenv("OPENAI_API_KEY")

if api_key is None:
    print("API key not found. Make sure the .env file is in the root directory and contains the OPENAI_API_KEY.")
else:
    print("API key loaded successfully.")
    # Run Aider with the API key
    result = subprocess.run([r".\aider-env\Scripts\aider.exe", "--openai-api-key", api_key], capture_output=True, text=True)
    print("Aider command executed.")
    print("stdout:", result.stdout)
    print("stderr:", result.stderr)
