import subprocess 

fifo_pipe = 'signalpipe'
script_path = './scan_manager.sh'
count = 0
file = open('monitor.txt', 'w')
array_stations = []

def run_script():
    subprocess.call(['sh', script_path])

def get_scannings():
    with open(fifo_pipe, 'r') as signals:
        bssid = ""
        station = ""
        pwr = ""
        i = 0
        while True: 
            line = signals.readline()
            if not line:
                break
            while (i < len(str(line.strip()))) :
                print(str(line.strip())[i])
                if (str(line.strip())[i] == "(" ):
                    bssid = "(not associated)"
                    i += 15
                    break
                if (str(line.strip())[i]== ":"):
                    if (bssid != ""):
                        station = str(line.strip())[i-2: i+14]
                    else:
                        bssid = str(line.strip())[i-2: i+14]
                    i += 14
                    break
                if (str(line.strip())[i]== "-"):
                    if (station != "" and pwr == ""):
                        pwr = str(line.strip())[i: i+2]
                        break
                if (station != "" and pwr != "" and bssid != ""):
                    array_stations.append({'bssid': bssid, 'station': station, 'pwr':pwr})
                    bssid = ""
                    station = ""
                    pwr = ""
                i+=1
            print(array_stations)
    file.close()

def parse_scannings():
    with open(fifo_pipe, 'r') as signals:
        while True: 
            line = signals.readline()
            if not line:
                break
            if (line.strip()[10] == " " and line.strip()[11] == "("):
                print(f"parsed data: {line.strip()}")
                
