#!/usr/bin/env python
import json

FILENAME = "./package.json"


def increment_minor_version(version):
    version_list = [int(x) for x in version.split(".")]
    version_list[-1] += 1
    version_list = [str(x) for x in version_list]
    return ".".join(version_list)


def main():
    with open(FILENAME, "r") as f:
        data = json.loads(f.read())
    version = data["version"]
    data["version"] = increment_minor_version(version)
    with open(FILENAME, "w") as f:
        f.write(json.dumps(data, indent=2))


if __name__ == "__main__":
    main()
