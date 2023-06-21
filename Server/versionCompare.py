import re
import sys
from itertools import zip_longest

# Compares the version of a package to a version range and returns true if the version is in the range
def compareVersions(version, start, end):
    print(version, start, end)
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

# Splits a version string into a list of numbers
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
