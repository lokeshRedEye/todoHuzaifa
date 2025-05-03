from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Todo(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(500), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

@app.route("/index", methods=["GET", "POST"])
def hello_world():
    if request.method == "POST":
        title = request.form['title']
        desc = request.form['desc']
        if title.strip() and desc.strip():
            todo = Todo(title=title, desc=desc)
            db.session.add(todo)
            db.session.commit()
        else:
            return redirect('/error')

    allTodo = Todo.query.all()
    return render_template('index.html', allTodo=allTodo)

@app.route("/error")
def error_page():
    return render_template("error.html")

@app.route("/")
def signup():
    return render_template("signup.html")

@app.route('/login')
def login():
    return render_template('login.html')

@app.route("/update/<int:sno>", methods=["GET", "POST"])
def update(sno):
    todo = Todo.query.filter_by(sno=sno).first()
    if request.method == "POST":
        todo.title = request.form['title']
        todo.desc = request.form['desc']
        db.session.commit()
        return redirect('/index')
    return render_template("update.html", todo=todo)

@app.route("/delete/<int:sno>")
def delete(sno):
    todo = Todo.query.filter_by(sno=sno).first()
    db.session.delete(todo)
    db.session.commit()
    return redirect("/index")

@app.route("/clear")
def clear():
    db.session.query(Todo).delete()
    db.session.commit()
    return redirect("/index")

if __name__ == "__main__":
    app.run(debug=True)
