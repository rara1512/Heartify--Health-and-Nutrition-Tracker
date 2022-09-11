import json
import numpy as np
import pandas as pd
import os
import boto3
import email

ENDPOINT = os.environ['SageMakerEndPoint']

def lambda_handler(event, context):
    sgEndpoint = ENDPOINT
    sruntime = boto3.client('runtime.sagemaker')
    print(event)
    data = json.loads(json.dumps(event))
    list_data = ''
    output_data = []
    for i in data:
        list_data += str(data[i])+", "
        output_data.append(data[i])
    list_data = list_data[:-2]
    
    
    response = sruntime.invoke_endpoint(EndpointName=sgEndpoint,
                                       Body=list_data,
                                       ContentType='text/csv'
                                       )
                                       
                                       
    print(response)                        
    result = json.loads(response["Body"].read().decode())
    threshold = result
    print(threshold)
    percentage = threshold * 100
    print(percentage)
    flag = ""
    if(threshold > 0.5):
        flag = "The person being tested is at a risk of a heart disease with a confidence score of " + str(percentage) + " %" + ". Please consult your doctor for further evaluation."
    else:
        flag = 'The person being tested is not at a risk of heart disease. You are safe now'
     
    sex = "Male" if int(output_data[1]) == 0 else "Female"   
    chest_dict = {0:"Typical Angina",1:"Atypical Angina",2:"Non-Anginal Pain",3:"Asymptomatic"}
    chest_pain_type = chest_dict[int(output_data[2])] 
    fast_blood_sugar = "Greater than 120 Mg/Dl" if int(output_data[5]) == 0 else "Less than 120 Mg/Dl" 
    rest_dict = {0:"Normal",1:"Having ST-T Wave Abnormality",2:"Probable or definite left ventricular hypertrophy"}
    rest_ecg_type = rest_dict[int(output_data[6])]
    excercise_angina = "Yes" if int(output_data[8]) == 0 else "No"
    slope_dict = {0:"Upsloping",1:"Flat",2:"Downsloping"}
    slope_peak = slope_dict[int(output_data[10])]
    thala_dict = {0:"Normal",1:"Fixed",2:"Reversible Defect"}
    thala = slope_dict[int(output_data[12])]
    message = "Person Details:\n" + "Age: " + str(output_data[0]) + "\n" + "Sex: " + str(sex) + "\n" + "Chest Pain Type: " + str(chest_pain_type) + "\n" + "Resting Blood Pressure: " + str(output_data[3]) + "MmHg\n" + "Serum Cholestrol: " + str(output_data[4]) + "MgDl\n" + "Fasting Blood Sugar: " + str(fast_blood_sugar) + "\n" + "Resting ECG Results: " + str(rest_ecg_type) + "\n" + "Max Heart Rate: " + str(output_data[7]) + "Bpm\n" + "Excercise Induced Angina: " + str(excercise_angina) + "\n" + "ST Depression Level: " + str(output_data[9]) + "\n" + "Slope Of The Peak Exercise ST Segment: " + str(slope_peak) + "\n" + "Number Of Major Vessels: " + str(output_data[11]) + "\n" + "Thalassemia: " + str(thala) + "\n\n" + "Testing Results: " + str(flag) + "\n"  
    
    email_client = boto3.client('ses')
    reply_email = email_client.send_email(
        Destination={'ToAddresses': ["kumarkush36@gmail.com"]},
        Message={
            'Body': {
                'Text': {
                    'Charset': 'UTF-8',
                    'Data': message,
                },
            },
            'Subject': {
                'Charset': 'UTF-8',
                'Data': 'ECG Testing Report',
            },
        },
        Source="kumarkush36@gmail.com",
    )
    
    return {
        'statusCode': 200,
        'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers':'*'
    },
        'body': json.dumps(flag)
    }