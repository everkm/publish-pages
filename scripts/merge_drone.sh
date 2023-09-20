#!/usr/bin/env bash


FIELS=$(find . \( -path "*/target*" -o -path "*/src*" \) -prune -o -type f  -name "*.drone.yaml" -print)
IFS=$'\n'
sorted=($(sort <<<"${FIELS[*]}"))
unset IFS

echo "" >.drone.yml
FIRST=1
for f in ${sorted[@]}; do
    if [ "${FIRST}" == "1" ]; then
        FIRST=0
    else
        echo -e "\n\n---" >> .drone.yml
    fi
    echo merge $f
    cat $f >> .drone.yml
done
echo merge done