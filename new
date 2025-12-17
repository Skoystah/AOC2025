#!/usr/bin/env bash

if ! [[ -n $1 ]] then
    echo "Missing argument for day"
    exit
fi

echo "Creating folder for day ${1} ...";
cp -r dayx day${1} && cd day${1} 

for file in *.js; do 
    mv $file $(echo $file | sed s/x/"$1"/);
done

