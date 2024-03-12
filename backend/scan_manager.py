import subprocess 

fifo_pipe = 'signalpipe'
script_path = './scan_manager.sh'
count = 0
file = open('monitor.txt', 'w')
array_stations = []
parsed_stations = []
def run_script():
    subprocess.call(['sh', script_path])

def get_scannings():
    with open(fifo_pipe, 'r') as signals:
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
        bssid = ""
        station = ""
        pwr = ""
        while i<len(line)-1 :
            # if (str(line)[i] != " "):
            #     print(str(line)[i])
            if (line[i] == "(" ):
                bssid = "(not associated)"
                i += 15
                break
            if (line[i]== ":" and i!=0):
                if (bssid != ""):
                    print(line[i-2: i+14])
                    station = line[i-2: i+14]
                else:
                    bssid = line[i-2: i+14]
                i += 14
                break
            if (line[i]== "-"):
                if (station != "" and pwr == ""):
                    pwr = line[i: i+2]
                    i += 2
                    break
            if (station != "" and pwr != "" and bssid != ""):
                parsed_stations.append({'bssid': bssid, 'station': station, 'pwr':pwr})
            i+=1
            
                    
