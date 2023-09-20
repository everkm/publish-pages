#!/usr/bin/env python3
# coding=utf-8

import requests
import os, sys
import json

# from jsonpath_ng import jsonpath, parse

DRONE_REPO_LINK = os.getenv("DRONE_REPO_LINK")
DRONE_REPO = os.getenv("DRONE_REPO")
DRONE_TAG = os.getenv("DRONE_TAG")
GIT_AK = os.getenv("GIT_AK")

if not (DRONE_REPO_LINK and DRONE_REPO and DRONE_TAG and GIT_AK):
    print("need env var")
    sys.exit(1)

DOWNLOAD_API_PREFIX = DRONE_REPO_LINK.replace(DRONE_REPO, "api/v1/repos/") + DRONE_REPO
print("download api", DOWNLOAD_API_PREFIX)


def attachment_items():
    url = "%s/releases/tags/%s?access_token=%s" % (
        DOWNLOAD_API_PREFIX,
        DRONE_TAG,
        GIT_AK,
    )
    resp = requests.get(url)
    print("request", url, resp.text)
    
    resp = resp.json()

    ret = [
        item for item in resp["assets"] if item["name"].startswith("Daobox")
    ]
    print(json.dumps(ret, indent=4))

    return (resp["id"], ret)


def action_download():
    (_, ret) = attachment_items()

    for item in ret:
        print("downloading", item["name"])
        code = os.system(
            'curl -s -o "%s" "%s?access_token=%s"'
            % (item["name"], item["browser_download_url"], GIT_AK)
        )
        if code != 0:
            raise Exception("download file failed: ", item["name"])

    # i = 0
    # for item in resp["assets"]:
    #     if item["name"].startswith("DaoboxNote-Desktop"):
    #         print(i, json.dumps(item, indent=4))
    #         i += 1

    # ret = parse('$.assets').find(resp.json())
    # i = 0
    # for match in ret:
    #     print(++i, json.dumps(match.value, indent=4))

    """
        - export DOWNLOAD_API_PREFIX=$(echo $$DRONE_REPO_LINK | sed "s#$$DRONE_REPO#api/v1/repos/$$DRONE_REPO#g")
        - curl -s "$${DOWNLOAD_API_PREFIX}/releases/tags/${DRONE_TAG}?access_token=$${GIT_AK}" | jq -e '.assets[]  | select( .name | contains("DaoboxNote-Desktop-"))' > a.json
        - cat a.json
        - export PKG_NAME="$(cat a.json | jq -r '.name')"
        - export DOWNLOAD_URL="$(cat a.json | jq -r '.browser_download_url')"
        - curl -s -o "$${PKG_NAME}" "$${DOWNLOAD_URL}?access_token=$${GIT_AK}" 
    """

    print("done")


def action_remove_by_name():
    if len(sys.argv) < 3:
        print("need attachment name")
        sys.exit(1)

    name = sys.argv[2]

    (rid, items) = attachment_items()
    need_remove_items = [item for item in items if item["name"] == name]
    # print("remove items", need_remove_items)
    for item in need_remove_items:
        url = "%s/releases/%s/assets/%s?access_token=%s" % (
            DOWNLOAD_API_PREFIX,
            rid,
            item["id"],
            GIT_AK,
        )
        print("deleteing for id ", item["id"])
        resp = requests.delete(url)
        if resp.status_code != 204:
            raise Exception("remove attachment by name failed: ", item["id"])
    print("done")


# print(sys.argv)

if len(sys.argv) > 1:
    fn = globals()["action_" + sys.argv[1]]
    if fn:
        fn()
