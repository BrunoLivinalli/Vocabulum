from flask import Flask, render_template
import random

app = Flask(__name__)

# Carrega palavras do arquivo
with open("words.txt", "r") as f:
    palavras = [p.strip().upper() for p in f.readlines()]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/palavra")
def palavra():
    return random.choice(palavras)

if __name__ == "__main__":
    app.run(debug=True)