import csv
import time
import requests
import json


# CSV reading and formatting 
csv_array = []
csv_headers = []
csv_body = []
path = 'monitor.csv'


def read_csv(filename):
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            print(row)

def get_last_row(filename):
    with open(filename, 'r') as file:
        reader = csv.reader(file)

# gets the csv where the captured packets are stored and formats the information and stores it on an array
def array_csv(filename):
    fieldnames_access_points = ['BSSID', 'First time seen', 'Last time seen', 'channel', 'Speed', 'Privacy', 'Cipher', 'Authentication', 'Power', '# beacons', '# IV', 'LAN IP', 'ID-length', 'ESSID', 'Key']
    fieldnames_stations = ['Station MAC', 'First time seen', 'Last time seen', 'Power', '# packets', 'BSSID', 'Probed ESSIDs']
    with open(filename, 'r',  newline='') as file:
        reader = csv.reader(file)
        reader_list = list(reader)
        index = 0
        for row in reader_list[2:]:
            index += 1
            if(len(row) == 0):
                break
            #the length of the columns of access points and stations has an error of +-1 
            #formatting the rows to a dictionary
            formatted_row = dict(zip(fieldnames_access_points, row))
            print(formatted_row)
            # csv_headers.append(formatted_row)

        for row in reader_list[index+2:]:
            #formatting the rows to a dictionary
            formatted_row = dict(zip(fieldnames_stations, row))
            # data = {
            #     'network_scan_id': 0,
            #     'station': formatted_row['Station MAC'],
            #     'pwr': formatted_row['Power'],
            #     'signal_started_at': formatted_row['Last time seen']
            # }
            # csv_body.append(data)  
            print(formatted_row)
    return csv_body

array_csv('monitor.csv')

## Requests

# #cambiar por 'https://10.42.0.1/api/signals/create/'
# url = 'http://127.0.0.1:8000/signals/create/' 

# response = requests.post(url, json = array_csv('monitor.csv'))

# if response.status_code == 200:
#     print(f"Data sent successfully. Response: {response.json()}")
# else:
#     print(f"Failed to send data. Status code: {response.status_code}, Response: {response.text}")


