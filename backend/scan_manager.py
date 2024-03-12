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
        while True: 
            line = signals.readline()
            if not line:
                break
            array_stations.append(str(line))
    parse_scannings()

def parse_scannings():
    for j in range (0,len(array_stations)):
        line = array_stations[j]
        i=0
        while i<len(line) :
            # if (str(line)[i] != " "):
            #     print(str(line)[i])
            if (str(line)[i] == "(" ):
                bssid = "(not associated)"
                i += 15
            if (str(line)[i]== ":" and i!=0):
                if (bssid != ""):
                    print(str(line[i-2: i+14]))
                    station = str(line[i-2: i+14])
                else:
                    bssid = str(line[i-2: i+14])
                    i += 14
            if (str(line[i])== "-"):
                if (station != "" and pwr == ""):
                    pwr = str(line[i: i+2])
                    break
            if (station != "" and pwr != "" and bssid != ""):
                array_stations.append({'bssid': bssid, 'station': station, 'pwr':pwr})
                bssid = ""
                station = ""
                pwr = ""
                i = 0
                break
            i+=1
                    
