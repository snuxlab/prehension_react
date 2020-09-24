from flask import Flask, render_template, jsonify 
from flask_cors import CORS

import predictor1
import predictor2


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/api')
def api():
    # class name = NoP
    # class precision = precision
    s1_final_list, s1_ma_list = predictor1.deploy()
    s2_final_list, s2_ma_list = predictor2.deploy()
    
    sensor =  { "s1_fl" : s1_final_list, "s1_ml" : s1_ma_list, "s2_fl" : s2_final_list, "s2_ml" : s2_ma_list } 
    return jsonify(sensor)


@app.route('/dashboard1')
def dashboard1():
    # class name = NoP
    # class precision = precision
    final_list_db1, ma_list_db1 = predictor1.deploy()
    return render_template('index.html', fl=final_list_db1, ml=ma_list_db1)

@app.route('/dashboard2')
def dashboard2():
    # class name = NoP
    # class precision = precision
    final_list_db2, ma_list_db2 = predictor2.deploy()

    return render_template('index.html', fl=final_list_db2, ml=ma_list_db2)

if __name__ == '__main__':
    app.run(debug=True)
    
