import subprocess 
import time 
import multiprocessing

fifo_pipe = 'signalpipe'
script_path = './scan_manager.sh'
count = 0
file = open('monitor.txt', 'w')
array_stations = []
parsed_stations = []

def run_script():
    subprocess.call(['sh', script_path])


def get_scannings():
    print("Waiting initialization ...")
    time.sleep(17)
    print("Listening pipe")
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
        i=-1
        bssid = ""
        station = ""
        pwr = ""
        while i<(len(line)-1) :

            i+=1
            # if (str(line)[i] != " "):
            #     print(str(line)[i])
            if (line[i] == "(" ):
                bssid = "(not associated)"
                i += 15

            if (line[i] == ":" and bssid == ""):
                temp = line[i-2: i+15]
                if (not (" " in temp)):
                    bssid = temp
                    i += 14
                
            if (line[i] == ":" and station == "" and bssid != ""):
                temp = line[i-2: i+15]
                if ( not (" " in temp)):
                    station = temp
                    i += 14

            if (line[i] == "-" and (pwr == "")):
                if not (" " in line[i+1] ):
                    pwr = line[i: i+3]
                    i += 2
                    
            if (station != "" and pwr != "" and bssid != ""):
                parsed_stations.append({'bssid': bssid, 'station': station, 'pwr':pwr})
                bssid = ""
                station = ""
                pwr = ""
    print (parsed_stations)
            
            
            