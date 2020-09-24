from flask import jsonify
import predictor1
# class name = NoP
# class precision = precision
final_list, ma_list = predictor1.deploy()
test =  {"test" : final_list[0],"what" : final_list[1]}

test = jsonify(test)
print()