#!/bin/sh
source .env
echo stitch-cli import --path ./stitch_app --strategy merge --app-id ${STITCH_APPID}
stitch-cli import --path ./stitch_app --strategy merge --app-id ${STITCH_APPID}
