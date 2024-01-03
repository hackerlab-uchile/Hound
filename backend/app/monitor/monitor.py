import csv
import time
import requests
import json
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler



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
        for row in reader:
            #the length of the columns of access points and stations has an error of +-1 
            if (len(row)>13):
                #formatting the rows to a dictionary
                formatted_row = dict(zip(fieldnames_access_points, row))
                csv_headers.append(formatted_row)
            elif (len(row)>5):
                #formatting the rows to a dictionary
                formatted_row = dict(zip(fieldnames_stations, row))
                csv_body.append(formatted_row)  
    return json.dumps(csv_body)


## Requests

# #cambiar por 'https://10.42.0.1/api/signals/create/'
# url = 'http://127.0.0.1:8000/signals/create/' 

# response = requests.post(url, json = array_csv('monitor.csv'))

# if response.status_code == 200:
#     print(f"Data sent successfully. Response: {response.json()}")
# else:
#     print(f"Failed to send data. Status code: {response.status_code}, Response: {response.text}")


class CsvHandler(FileSystemEventHandler):

    def file_changed(self, event):
        if event.is_directory:
            return
        elif event.event_type == 'modified' and event.src_path.endswith('.csv'):
            print(f"Detected change in {event.src_path}")
            process_csv(event.src_path)

# filename:: str (path)
# Initializating the watchdog observer
def setup_observer(filename):
    observer = Observer()
    event_handler = CsvHandler()
    observer.schedule(event_handler, path=filename, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

setup_observer(path)