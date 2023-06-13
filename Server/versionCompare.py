import re

def compareVersions(version, start, end):
    less = False
    more = False
    print(version, start, end)
    version = splitVersion(version)
    if (start == "any"):
        more = True
    else:
        start = splitVersion(start)
    if (end == "any"):
        less = True
    else:
        end = splitVersion(end)
    if (version == []):
        return False
    print(version, start, end)
    for i in range(len(version)):
        if not more and ((i == len(version)-1 and len(version) < len(start) and version[i] == start[i]) or int(start[i]) > int(version[i])):
            return False
        if not less and ((i == len(end)-1 and len(end) < len(version) and version[i] == end[i]) or int(end[i]) < int(version[i])):
            return False
        if not more and (int(version[i]) > int(start[i]) or (version[i] == start[i] and len(version) > len(start) and i == len(start)-1)):
            more = True
        if not less and (int(version[i]) < int(end[i]) or (version[i] == end[i] and len(version) < len(end) and i == len(version)-1)):
            less = True
        if (more and less):
            return True
    return True

def splitVersion(version):
    res = []
    tempres = ""
    for i in version:
        if (i.isdigit()):
            tempres += i
        elif tempres != "":
            res.append(tempres)
            tempres = ""
    if tempres != "":
        res.append(tempres)
    return res

def test(version_in_db: str, start: str = "", end: str = "") -> bool:
    # Split the version in the database, start, and end into lists of numbers
    split_version_in_db = re.findall(r"[0-9]+", version_in_db)
    split_start = re.findall(r"[0-9]+", start)
    split_end = re.findall(r"[0-9]+", end)

    # Loop through the version in the database
    for i in range(len(split_version_in_db)):
        try:
            # If the version in the database is less than the start version, return false
            if (split_version_in_db[i] < split_start[i]):
                return False
            # If the version in the database is greater than the end version, return false
            elif (split_version_in_db[i] > split_end[i]):
                return False
        except IndexError:
            continue
    else:
        try:
            if (split_start[len(split_version_in_db)] > "0"):
                return False
        except IndexError:
            return True