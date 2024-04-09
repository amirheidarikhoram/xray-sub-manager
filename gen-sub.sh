#!/bin/bash

configuration="$1"
remark="$2"
id="$3"

filename="${remark}_${id}"

echo "$configuration" > "subs/$filename"

echo "Configuration saved to $filename"
