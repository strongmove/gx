#!/usr/bin/env python
from pathlib import Path
import re


def replace(strns):
    for index, strn in enumerate(strns):
        match = re.match('import (.*) from "@mui/icons-material/(.*)";', strn)
        if match:
            name = match[2]
            new = f'import {{ Md{name} as {name}Icon}} from "react-icons/md";\n'
            strns[index] = new
    return strns


def main():
    files = list(Path(__file__).parent.glob("*.js"))
    for file in files:
        with open(file, "r") as f:
            strn = f.readlines()
        with open(file, "w") as f:
            strn = replace(strn)
            f.writelines(strn)


if __name__ == "__main__":
    import doctest

    doctest.testmod()
    main()
