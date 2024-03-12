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
        i=-1
        bssid = ""
        station = ""
        pwr = ""
        while i<(len(line)-1) :
            bssid = ""
            station = ""
            pwr = ""
            i+=1
            # if (str(line)[i] != " "):
            #     print(str(line)[i])
            if (line[i] == "(" ):
                bssid = "(not associated)"
                i += 15
                break
            if (line[i] == ":"):
                temp = line[i-2: i+15]
                if (bssid == "" and not (" " in temp)):
                    bssid = temp
                    i += 14
                    
                if (bssid != ""):
                    station = temp
                    i += 14
                    
            if (line[i] == "-" and (pwr == "")):
                if not (" " in line[i+1] ):
                    pwr = line[i: i+3]
                    print(pwr)
                    i += 2
                    
            if (station != "" and pwr != "" and bssid != ""):
                parsed_stations.append({'bssid': bssid, 'station': station, 'pwr':pwr})
                # bssid = ""
                # station = ""
                # pwr = ""
        print (parsed_stations)