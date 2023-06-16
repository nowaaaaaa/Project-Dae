import re
import sys
from itertools import zip_longest

def compareVersions(version, start, end):
    start = "any" if start == "" else start
    end = "any" if end == "" else end
    less = False
    more = False
    version = splitVersion(version)
    if (version == []):
        return True
    if (start == "any"):
        more = True
    else:
        start = splitVersion(start)
        if (start == []):
            return False
    if (end == "any"):
        less = True
    else:
        end = splitVersion(end)
        if (end == []):
            return False
    if (version == []):
        return False
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

def test2(version: str, begin_range: str, end_range: str) -> bool:
    start, end = "any" if start == "" else start, "any" if end == "" else end
    if version == "":
        return False
    elif begin_range == end_range == "any":
        return True

    version_numbers = list(map(int, re.findall(r"[0-9]+", version)))
    begin_range_numbers = list(map(int, re.findall(r"[0-9]+", begin_range))) if begin_range != "any" else [float("-inf")]
    end_range_numbers = list(map(int, re.findall(r"[0-9]+", end_range))) if end_range != "any" else [float("inf")]

    b = e = False
    for v in zip_longest(version_numbers, begin_range_numbers, end_range_numbers, fillvalue=0):
        if not b:
            if v[0] < v[1]:
                return False
            elif v[0] > v[1]:
                b = True
        if not e:
            if v[0] > v[2]:
                return False
            elif v[0] < v[2]:
                e = True
    return True