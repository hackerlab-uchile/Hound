import subprocess 

fifo_pipe = 'signalpipe'
script_path = './scan_manager.sh'
count = 0
file = open('monitor.txt', 'w')


def run_script():
    subprocess.call(['sh', script_path])

def get_scannings():
    array_stations = []
    with open(fifo_pipe, 'r') as signals:
        bssid = ""
        station = ""
        pwr = ""
        i = 0
        while True: 
            line = signals.readline()
            if not line:
                break
            while (i < len(str(line))) :
                if (str(line)[i] == "(" ):
                    bssid = "(not associated)"
                    i += 15
                print(str(line))
                if (str(line)[i]== ":"):
                    if (bssid != ""):
                        print(str(line)[i-2: i+14])
                        station = str(line)[i-2: i+14]
                    else:
                        bssid = str(line)[i-2: i+14]
                        i += 14
                if (str(line.strip())[i]== "-"):
                    if (station != "" and pwr == ""):
                        pwr = str(line.strip())[i: i+2]
                        break
                if (station != "" and pwr != "" and bssid != ""):
                    array_stations.append({'bssid': bssid, 'station': station, 'pwr':pwr})
                    bssid = ""
                    station = ""
                    pwr = ""
                    i = 0
                    break
                i+=1
    file.close()

def parse_scannings():
    with open(fifo_pipe, 'r') as signals:
        while True: 
            line = signals.readline()
            if not line:
                break
            if (line.strip()[10] == " " and line.strip()[11] == "("):
                print(f"parsed data: {line.strip()}")
                
