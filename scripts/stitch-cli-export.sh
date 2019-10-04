#!/bin/sh
source .env
echo Logging into Stitch
stitch-cli --version
stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
echo Exporting from Stitch 
stitch-cli export --app-id=$STITCH_APPID --output=./stitch_app --as-template --include-hosting
echo Logging out
#stitch-cli logout
echo export complete
