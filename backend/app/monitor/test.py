import csv
import time

csv_array = []
csv_headers = []
csv_body = []
starttime = time.time()
last_time_seen = ''

#prints the rows on a csv
def read_csv(filename):
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            print(row)


# appends the contents of the csv to an array set on execution mem
def array_csv1(filename):
    with open(filename, 'r') as file:
        reader = csv.DictReader(file, delimiter=',')
        for row in reader:
            csv_body.append(row)

#sets two arrays with the contents of the csv
def array_csv(filename):
    fieldnames_access_points = ['BSSID', 'First time seen', 'Last time seen', 'channel', 'Speed', 'Privacy', 'Cipher', 'Authentication', 'Power', '# beacons', '# IV', 'LAN IP', 'ID-length', 'ESSID', 'Key']
    fieldnames_stations = ['Station MAC', 'First time seen', 'Last time seen', 'Power', '# packets', 'BSSID', 'Probed ESSIDs']
    with open(filename, 'r',  newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            #the length of the columns of access points and stations has an error of +-1 
            if (len(row)>13):
                formatted_row = dict(zip(fieldnames_access_points, row))
                csv_headers.append(formatted_row)
            elif (len(row)>5):
                formatted_row = dict(zip(fieldnames_stations, row))
                last_time_seen = formatted_row['Last time seen']
                csv_body.append(formatted_row)
    print(csv_headers)      
    print(csv_body)
    print(last_time_seen)


# writes the contents on  the csv
def modify_csv(array, filename, iterations):
    with open(filename, 'w', newline='') as file:
        fieldnames_access_points = ['BSSID', 'First time seen', 'Last time seen', 'channel', 'Speed', 'Privacy', 'Cipher', 'Authentication', 'Power', '# beacons', '# IV', 'LAN IP', 'ID-length', 'ESSID', 'Key']
        fieldnames_stations = ['Station MAC', 'First time seen', 'Last time seen', 'Power', '# packets', 'BSSID', 'Probed ESSIDs']
        writer_stations = csv.DictWriter(file, fieldnames = fieldnames_stations)
        for i in range (iterations):
            for row in array:
                if len(row) == 0:
                    continue
                writer_stations.writerow(row)
                print(row)
                time.sleep(1.0 - ((time.time() - starttime) % 1.0))

array_csv('monitor.csv')

def get_new_rows():
    new_headers = []
    new_body = []
    with open(filename, 'r',  newline='') as file:
        fieldnames_access_points = ['BSSID', 'First time seen', 'Last time seen', 'channel', 'Speed', 'Privacy', 'Cipher', 'Authentication', 'Power', '# beacons', '# IV', 'LAN IP', 'ID-length', 'ESSID', 'Key']
        fieldnames_stations = ['Station MAC', 'First time seen', 'Last time seen', 'Power', '# packets', 'BSSID', 'Probed ESSIDs']
        reader = csv.reader(file)
        for row in reader[::-1]:
            #the length of the columns of access points and stations has an error of +-1 
            if (len(row)>13):
                formatted_row = dict(zip(fieldnames_access_points, row))
                if (last_time_seen< formatted_row['Last time seen']):
                    new_headers.append(formatted_row)
            elif (len(row)>5):
                formatted_row = dict(zip(fieldnames_stations, row))
                if (last_time_seen< formatted_row['Last time seen']):
                    new_body.append(formatted_row)


# modify_csv(csv_body,'monitor.csv', 3)
