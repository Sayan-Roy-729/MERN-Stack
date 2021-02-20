import mysql.connector

class DBHelper:
  def __init__(self) -> None:
      # Connect to the database
      try:
        self.conn = mysql.connector.connect(host="localhost", user = "root", password= "Sanchayan@729", database='flask-demo')
        self.mycursor = self.conn.cursor()
      except Exception as e:
        print(e)
      else:
        print("Connected to the database")

  # Add new user to the database
  def register_user(self, name, email, password):
    try:
      self.mycursor.execute(f"""INSERT INTO users VALUES (NULL, "{name}", "{email}", "{password}")""")
      self.conn.commit()
    except:
      return -1
    else:
      return 1