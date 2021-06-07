from flask import Flask, render_template, request, redirect, flash
from database.dbhelper import DBHelper
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.secret_key = 'SWDefdsvgfsb@3e4'
db = DBHelper()
bcrypt = Bcrypt(app)

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/register', methods = ['POST'])
def register():
  name = request.form.get('name')
  email = request.form.get('email')
  password = request.form.get('password')
  pw_hash = bcrypt.generate_password_hash(password)

  response = db.register_user(name, email, pw_hash)
  if response == 1:
    flash('Registration Successful')
    return redirect('/')
  else:
    flash('Registration Failed!')
    return redirect('/')

if __name__ == '__main__':
  app.run(debug = True)